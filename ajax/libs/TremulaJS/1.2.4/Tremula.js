(function () {
/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define('Layouts',[],function(){

	
	function basicGridLayout(b,options){
		var layoutId = 'basicGridLayout';
		var grid = this;

		options=(!options)?{}:options;
		var axisCount = options.axes||options.staticAxisCount;

		//make sure we have at least one row (zero based)
		if(!axisCount)axisCount=0;
		
		//tack an array onto the parent model to cache multiple row lenghts & last object on each axis
		if(!grid.layout_cache) grid.layout_cache = {
			lastLayoutOptions   : options,
			lastLayoutId            : layoutId,
			axesLengthArr       : new Array(axisCount),
			lastAxesObjArr      :  new Array(axisCount)
		}

		//cache our app values
		var 
			i = b.index,
			c = grid.itemConstraint,
			//staticDim = b.dims[that.si_],
			m = [grid.itemMargins[0]*2,grid.itemMargins[1]*2],
			axesLengthArr = grid.layout_cache.axesLengthArr,
			lastAxesObjArr = grid.layout_cache.lastAxesObjArr,
			layoutType = b.layoutType;
		
		var targetAxis = (layoutType=='tremulaBlockItem')?getLongestAxis():getShortestAxis();//requires that.axesLength
		
		//tell our box what axis its on
		b.staticAxis = targetAxis;
		// b.staticAxis = (b.layoutType=='tremulaBlockItem')?0:targetAxis;

		//SNAKE PATTERN: subsequent items follow previous items
		//NOTE: THE FIRST ITEM'S TAIL POSITION VALUE IS SET TO A POSITIVE OFFSET. 
		//       SUBSEQUENT ITEMS ARE POSITIONED AT A NEGATIVE OFFSET.
		//set head and tail positional values
		if(!lastAxesObjArr[targetAxis]){//this is the first item in the list (it has no previous object reference)
			//set the head point of the first object to ZERO scroll origin
			b.headPointPos[grid.si] = 0;
		
		}else{
			//this item is somewhere in the list
			b.prevObj = lastAxesObjArr[targetAxis];//the previous object is this object's preceeding sibling on the same axis. 
			b.prevObj.nextObj = b; //this object is the previous object's next object.  Like that definition? thought you would.

			//cache the tail point value of the preceeding object for use in setting the scrollAxis point of this object.
			//if this is a block item then use the last item of the longest axis
			var ltpp = b.prevObj.tailPointPos;
			// var ltpp = (b.layoutType=='tremulaBlockItem')? UPDATETHIS :b.prevObj.tailPointPos;

			//start point of scrollAxis edge
			b.headPointPos[grid.si] = ltpp[grid.si];//set the head point of the first object to the end point of the previous object

		}//end IF
		
		//cache the tail staticAxis ofset point for this object.
		var offset = (layoutType=='tremulaBlockItem') ? 0 : c*targetAxis + m[grid.si_]*targetAxis;
		//start point of staticAxis edge
		b.headPointPos[grid.si_] = offset;


		b.tailPointPos = [ //the tail point values are equal to the start value plus the object dims plus margin
			b.headPointPos[0]+b.w+m[0],
			b.headPointPos[1]+b.h+m[1]
		];
		
		b.outerDims =[
			b.tailPointPos[0]-b.headPointPos[0],
			b.tailPointPos[1]-b.headPointPos[1]
		]
		
		//this item will be the previous item for the next item on the same axis.
		lastAxesObjArr[targetAxis] = b;
		
		axesLengthArr[targetAxis] = (axesLengthArr[targetAxis]||0) + b.dims[grid.si];
		
		
		function getShortestAxis(){
			var shorty = 0;
			if (axisCount > 0){
				for(var i = 1; i <= axisCount; i++){
					if(!axesLengthArr[shorty]) return shorty;
					if(!axesLengthArr[i]) return i;
					shorty = (axesLengthArr[i] < axesLengthArr[shorty])? i : shorty;
				}
			}
			return shorty;
		}//getShortestAxis
		
		function getLongestAxis(){
			var longestAxis = 0;
			if (axisCount > 0){
				for(var i = 1; i <= axisCount; i++){
					longestAxis = (axesLengthArr[i] > axesLengthArr[longestAxis])? i : longestAxis;
				}
			}
			return longestAxis;
		}//getLongestAxis
		
	}//basicGridLayout

	
	
	
	
	
	
	function stackLayout(b,options){
		var grid = this;
		
		options=(!options)?{}:options;
		var axisCount = options.axisCount;
		
		//cache our index
		var
			i = b.index;//,
			//m = [grid.itemMargins[0]*2,grid.itemMargins[1]*2];
		
		//SNAKE PATTERN: subsequent items follow previous items
		//NOTE: THE FIRST ITEM'S TAIL POSITION VALUE IS SET TO A POSITIVE OFFSET == SUBSEQUENT ITEMS ARE POSITIONED AT A NEGATIVE OFFSET.
		//set head and tail positional values
		if(i==0){//this is the first item in the list (it has no previous object reference)
			//set the head point of the first object to ZERO scroll origin
			b.headPointPos = [0,0];
		
		}else{
		
			b.prevObj = grid.boxes[i-1];//the previous object is this object's preceeding sibling. Enough said.
			b.prevObj.nextObj = b; //this object is the previous object's next object.  Like grid definition? thought you would.

			//cache the tail point value of the preceeding object for use in setting the scrollAxis point of this object.
			var l = b.prevObj.tailPointPos;
			//start point of scrollAxis edge
			b.headPointPos[grid.si] = l[grid.si];//set the head point of the first object to the end point of the previous object

			//cache the tail point value of the preceeding object for use in setting the staticAxis point of this object.
			var offset = l[grid.si];//0;
			//start point of staticAxis edge
			b.headPointPos[grid.si_] = offset;//set the head point of the first object to the end point of the previous object
			
		}//end IF

		b.tailPointPos = [ //the tail point values are equal to the start value plus the object dims plus margin
			20+b.headPointPos[0],//+b.w+that.itemMargins[0]*2,
			b.headPointPos[1]//+b.h+that.itemMargins[1]*2
		];
	}//stackLayout()



	return{
		basicGridLayout:basicGridLayout,
		stackLayout:stackLayout
	}

});










define('Easings',[],function(){

	//percentComplete(0.0 to 1.0),elapsedTime,startValue,endValue,totalDuration
	function linearOut(x,t,b,c,d){
		return (c * (t / d) + b);
	}
	
	//percentComplete(0.0 to 1.0),elapsedTime,startValue,endValue,totalDuration
	function easeOutSine(x,t,b,c,d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;             
	}
	
	function easeInOutQuad(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};              

	function easeOutQuart(x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	}

	
	function easeOutCubic(x, t, b, c, d) {
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};
	
	function easeInOutCubic(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t + 2) + b;
	};
	
	function easeInOutExpo(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
		t--;
		return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
	};
	
	function easeInOutCirc(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		t -= 2;
		return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
	};

	function easeOutElastic (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	}

	// accelerating from zero velocity
	function easeInQuint_t(t) { return t*t*t*t*t };
	// decelerating to zero velocity
	function easeOutQuint_t(t) { return 1+(--t)*t*t*t*t };


	return{
		linearOut:linearOut,
		easeOutSine:easeOutSine,
		easeInOutQuad:easeInOutQuad,
		easeOutQuart:easeOutQuart,
		easeOutCubic:easeOutCubic,
		easeInOutCubic:easeInOutCubic,
		easeOutElastic:easeOutElastic,
		easeInQuint_t:easeInQuint_t,
		easeOutQuint_t:easeOutQuint_t
	}



});










define('DataAdapters',[
//	'jquery'
// 	,'text!../../../../res/icon_header_saved.svg'
// 	,'text!../../../../res/icon_header_cart.svg'
],function(
//	$
// 	,heart_svg
// 	,cart_svg
){
	
	function TremulaItem(data){
		this.data = data;
		this.imgUrl = data.imgUrl;//optional
		this.w = this.width = data.w;
		this.h = this.height = data.h;

		//meta options
		this.isLastContentBlock = data.isLastContentBlock||false;
		this.layoutType = this.data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling = this.data.noScaling||false;
		this.auxClassList = data.auxClassList||'';
		this.template = this.data.template||'';

	}


//min props required for custom template content: template.

	function JudyItem(data,env){
		this.data = data;

		this.isLastContentBlock = data.isLastContentBlock;
		this.layoutType = this.data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling = this.data.noScaling||false;

		this.isFavorite = data.isFavorite;

		this.auxClassList = data.auxClassList||'';

		var imgStatixAxisPx = env.options.itemConstraint;//this is the static axis constraint of a stream image -- in px.
		
		if(data.UrlInfo){
			var srcStr		= 'http://imgc.artprintimages.com/images/P-{{w}}-{{h}}-85/' + data.UrlInfo.ImageUrl.split('/MED/')[1];
			
			if(env.sx)
				this.src			= srcStr.replace(/{{w}}/,'1000').replace(/{{h}}/,imgStatixAxisPx);
			else
				this.src			= srcStr.replace(/{{h}}/,'1000').replace(/{{w}}/,imgStatixAxisPx);


			this.w = this.width = data.ImageDimensions[2].PixelWidth;
			this.h = this.height = data.ImageDimensions[2].PixelHeight;

			this.imgUrl = this.src;
			this.data.JudyLastNativeAspectImgURL = this.imgUrl;
			this.auxClassList = "judyRS " + this.auxClassList;//stamp each resultSet item with judyResultSet so it is easier to select by casper.js during testing
			
		}else{
			this.w = this.width = (this.data.w||100);
			this.h = this.height = (this.data.h||100);
			this.imgUrl = '';
		}

		this.artistName = '';
		this.artistUrl = '';
		this.itemTitle = '';
		this.itemPrice = '';

		var first_='',last_='';
		if(data.Artist) first_ = data.Artist.FirstName||'';
		if(data.Artist) last_	=	data.Artist.LastName||'';

		if(data.Artist) 		this.artistName = (first_ + " " + last_).replace(/  /g,' ').trim()||'';
		if(data.Artist) 		this.artistUrl = (data.Artist.ArtistUrl||'').replace(/gallery/g,'discover')||'';
		if(data.Title) 			this.itemTitle = data.Title||'';
		if(data.ItemPrice) 	this.itemPrice = data.ItemPrice.Price;
		this.artistNameTitle = this.artistName+((this.artistName&&this.itemTitle)?', ':'')+this.itemTitle;

		this.template = this.data.template||('<img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/> <div class="boxLabel">{{artistNameTitle}}</div>')
			.replace(/{{artistNameTitle}}/g,this.artistNameTitle)
			//.replace(/{{artistName}}/g,this.artistName)
			//.replace(/{{artistUrl}}/g,this.artistUrl)
			.replace(/{{itemTitle}}/g,this.itemTitle)
			//.replace(/{{itemPrice}}/g,this.itemPrice);

		//-----------calculate stream sizeClass-----------
		var 
			staticAxisDim       = env.options.itemConstraint,                                  //cache the constraint value (for the static axis)
			constraintRatio     = staticAxisDim / this[env.saDim_], //how much we will enlarge/reduce the scroll axis to scale 1:1 with our staticAxis constraint
			scrollAxisDim       = this[env.saDim]*constraintRatio,  //calculate the scroll axis value
			scaledDimentionsArr	 = [scrollAxisDim,staticAxisDim];//save as relative matrix for setDimentions(w,h)


		var hash = env.options.maxWidthClassMap;
		if(hash)
		for(key in hash){
			if(scaledDimentionsArr[0]<hash[key]){
				this.auxClassList = this.auxClassList + " " + key;
				break;
			}
		}
		//console.log(this)
	}

//min props required for custom template content: template.
	


	//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=sky%2C+night%2C+day&format=json&page=2
	function flickrSearch(data,env){
		this.data = data;


		//meta options
		this.isLastContentBlock = data.isLastContentBlock||false;
		this.layoutType = this.data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling = this.data.noScaling||false;
		this.isFavorite = data.isFavorite||false;
		this.auxClassList = data.auxClassList||'';
		

		//this is the static axis constraint of a stream image -- in px.
		var imgStatixAxisPx = env.options.itemConstraint;
		

		//if this data item has an expected URL parameter then it is an image -- otherwise it is probably an arbitrary html layout
		if(data.url_z){
			this.src = data.url_z
			this.w = this.width = data.width_z;
			this.h = this.height = data.height_z;
			this.imgUrl = this.src;
			this.auxClassList = "flickrRS " + this.auxClassList;//stamp each resultSet item with judyResultSet so it is easier to select by casper.js during testing
		}else{
			this.w = this.width = (this.data.w||100);
			this.h = this.height = (this.data.h||100);
			this.imgUrl = '';
		}

		// this.artistName = '';
		// this.artistUrl = '';
		this.itemTitle = data.title||'';
		// this.itemPrice = '';

		this.template = this.data.template||('<img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/> <div class="boxLabel">{{itemTitle}}</div>')
			.replace(/{{itemTitle}}/g,'')//this.itemTitle
			//.replace(/{{artistNameTitle}}/g,this.artistNameTitle)
			//.replace(/{{artistName}}/g,this.artistName)
			//.replace(/{{artistUrl}}/g,this.artistUrl)
			//.replace(/{{itemPrice}}/g,this.itemPrice);

		//-----------calculate stream sizeClass-----------
		// var 
		// 	staticAxisDim       = env.options.itemConstraint,				//cache the constraint value (for the static axis)
		// 	constraintRatio     = staticAxisDim / this[env.saDim_], //how much we will enlarge/reduce the scroll axis to scale 1:1 with our staticAxis constraint
		// 	scrollAxisDim       = this[env.saDim]*constraintRatio,  //calculate the scroll axis value
		// 	scaledDimentionsArr	 = [scrollAxisDim,staticAxisDim];		//save as relative matrix for setDimentions(w,h)


		// var hash = env.options.maxWidthClassMap;
		// if(hash)
		// for(key in hash){
		// 	if(scaledDimentionsArr[0]<hash[key]){
		// 		this.auxClassList = this.auxClassList + " " + key;
		// 		break;
		// 	}
		// }
	}



	function JudyItem_SQ(data){
		this.imgUrl_SM = data.UrlInfo.ImageUrl;
		this.imgUrl_LG = data.UrlInfo.XLargeUrl;
		this.imgUrl_ZOOM = data.UrlInfo.ZoomUrlWithoutWatermark;
		this.imgUrl_SQ = data.UrlInfo.CroppedSquareImageUrl;
		
		this.data = data;
		this.w = this.width = 100;//data.ImageDimensions[2].PixelWidth;
		this.h = this.height = 100;//data.ImageDimensions[2].PixelHeight;
		this.imgUrl = this.imgUrl_SQ;
		this.data.JudyLastNativeAspectImgURL = null;
	}





	return{
		TremulaItem:TremulaItem
		,flickrSearch:flickrSearch
		,JudyItem:JudyItem
		,JudyItem_SQ:JudyItem_SQ
	}



});











define('Projections',[],function(){


	var exports = {};

	//===== bezier curve definitions ========

	var waterFallCurve = [
		{x:0,y:0},
		{x:.1,y:.5},
		{x:0,y:.01},
		{x:1,y:0}
	];


	var sunriseCurvePhone = [
		{x:0,y:.57},
		{x:.33,y:.50},
		{x:.66,y:.50},
		{x:1,y:.57}
	];


	var sunriseCurve = [
		{x:0,y:.65},
		{x:.33,y:.50},
		{x:.66,y:.50},
		{x:1,y:.65}
	];

	var mountainCurve = [
		{x:0,y:.90},
		{x:.33,y:.40},
		{x:.66,y:.40},
		{x:1,y:.90}
	];

	var softKnee = [
		{x:0,y:.5},
		{x:.45,y:.5},
		{x:.55,y:.5},
		{x:1,y:.5}
	];


	var enterTheDragonPath = [
		{x:-.1,y:.5},
		{x:.6,y:.5},
		{x:.4,y:.5},
		{x:1.1,y:.5}
	];






	var streamHorizontalPath = [
		{x:0,y:.5},
		{x:.33,y:.5},
		{x:.66,y:.5},
		{x:1,y:.5}
	];



	var pinterestPath = [
		{x:.5,y:0},
		{x:.5,y:.33},
		{x:.5,y:.66},
		{x:.5,y:1}
	];


	//====== curve helper =======

	function factorCurveBy(cubic,xy){
		var result = [
			{x:cubic[3].x*xy[0],y:cubic[3].y*xy[1]},
			{x:cubic[2].x*xy[0],y:cubic[2].y*xy[1]},
			{x:cubic[1].x*xy[0],y:cubic[1].y*xy[1]},
			{x:cubic[0].x*xy[0],y:cubic[0].y*xy[1]}
		]
		return result;
	}
	jsBezier.factorCurveBy = factorCurveBy;//add this to jsBezier namespace.


	//===== bezier projections ========

	function turntable(x,y){

		var curve = softKnee;


		//var xoffset = box.width / 2;
		//var yoffset = box.height / 2;
		var
		grid0 = this.parent.gridDims[0],
		grid1 = this.parent.gridDims[1],
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];
			
		var cubicBezier = factorCurveBy(curve,xyFactor);
			
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;
		// var yo = (grid1-this.outerDims[1]*.5)-p.y;
		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		var zo = Math.min(-400,((1-tri)*-1000));		
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, '+ zo +'px)'
			+' rotateY('+((tRamp*180)-90)+'deg)';
		
		this.e.style.opacity = Math.min(1,((tri*2)-.5));
		
		this.pPos = [x,y];
	}//turntable()
	exports.turntable = turntable;







	function enterTheDragon(x,y){

		var curve = enterTheDragonPath;


		//var xoffset = box.width / 2;
		//var yoffset = box.height / 2;
		var
		grid0 = this.parent.gridDims[0],
		grid1 = this.parent.gridDims[1],
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];
			
		var cubicBezier = factorCurveBy(curve,xyFactor);
			
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;
		// var yo = (grid1-this.outerDims[1]*.5)-p.y;
		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		var zo = Math.max(-800,((tri)*-1000));
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, '+ zo +'px)'
			+' rotateY('+((hRamp*180)-90)+'deg)'
			// +' scale('+(tri*2)+')';
			//+' scale('+Math.min(1,(tri*120)/12)+')';
		
		this.e.style.opacity = Math.min(1,((tri*2)-.5));
		
		this.pPos = [x,y];
	}//enterTheDragon()
	exports.enterTheDragon = enterTheDragon;







	function sunrise(x,y){

		var curve = sunriseCurve;

		var 
			grid0 = this.parent.gridDims[0],
			grid1 = this.parent.gridDims[1],
			tRamp = this.waves.tailRamp,
			hRamp = this.waves.headRamp,
			tri = this.waves.triangle,
			r,
			xo,//xo=x,//-xoffset, 
			yo;//yo=y;//-yoffset;

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;
		var yo = y+this.itemMargins[1]+(grid1-this.outerDims[1]*.5)-p.y;
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, 0)'//
		+' rotateZ('+g*60+'deg)';
		
		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//sunrise()
	exports.sunrise = sunrise;





	function mountain(x,y){


		var
			minViewPortSa = 1000,
			grid0 = this.parent.gridDims[0],
			grid1 = this.parent.gridDims[1],
			// viewOffset = grid0+10,//(grid0>minViewPortSa)?0:(minViewPortSa-grid0)*.5,
			axisLength = this.parent.currentGridContentDims,
			tRamp = this.waves.tailRamp,
			hRamp = this.waves.headRamp,
			tri = this.waves.triangle,
			r,
			xo,//xo=x,//-xoffset, 
			yo;//yo=y;//-yoffset;

		//compensation vvvvv
		//grid0 = Math.max(minViewPortSa,grid0);
		// grid0=grid0+viewOffset

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		var curve = (grid0<minViewPortSa)?(grid0<641)?sunriseCurvePhone:sunriseCurve:mountainCurve;
		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;

		//compensation vvvvv
		// xo = xo -viewOffset;

		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, 0)'//
		+' rotateZ('+g*-60+'deg)';
		
		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//mountain()
	exports.mountain = mountain;






	// var bezierShapePath = [
	// 	{x:0,y:.5},
	// 	{x:.10,y:.5},
	// 	{x:.10,y:.5},
	// 	{x:1,y:.5}
	// ];
	
	var bezierQuadEasePath = [
		{x:0,y:0},
		{x:0,y:.5},
		{x:.5,y:1},
		{x:1,y:1}
	];



	function bezierQuad(x,y){

		var curve = bezierQuadEasePath;

		var 
		grid0 = this.parent.gridDims[0],
		grid1 = this.parent.gridDims[1],
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;


		// console.log(axisLength)

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, tRamp);

		//var xo = (grid0-this.outerDims[0]*.5)-p.x;
		var xo = grid0 - p.x - (this.dims[0]*.5);

		//axisLength[1] = the total cross axis height when in horizontal mode
		//((axisLength[1]-this.dims[1])*.5) is not needed when using only one cross axis (i.e. staticAxisCount = 0)
		var yo = p.y - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - y - this.itemMargins[1]);


		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//bezierQuad()
	exports.bezierQuad = bezierQuad;




	var bezierShapePath = [
		{x:0,y:0},
		{x:0,y:1},
		{x:1,y:1},
		{x:1,y:0}
	];



	function bezierShape(x,y){

		var curve = bezierShapePath;

		var 
		grid0 = this.parent.gridDims[0],
		grid1 = this.parent.gridDims[1],
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;


		// console.log(axisLength)

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, tRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, tRamp);

		//var xo = (grid0-this.outerDims[0]*.5)-p.x;
		var xo = p.x - (this.dims[0]*.5);

		//axisLength[1] = the total cross axis height when in horizontal mode
		//((axisLength[1]-this.dims[1])*.5) is not needed when using only one cross axis (i.e. staticAxisCount = 0)
		var yo = grid1 - p.y - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - y - this.itemMargins[1]);


		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//bezierShape()
	exports.bezierShape = bezierShape;






	function streamHorizontal(x,y){

		var curve = streamHorizontalPath;

		var 
		gridDims = this.parent.gridDims,
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;


		// console.log(axisLength)

		var xyFactor = [
			gridDims[0], //Math.max(0,gridDims[0]),
			gridDims[1] //Math.max(0,gridDims[1])
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (gridDims[0]-this.outerDims[0]*.5)-p.x;
		// var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		var yo = p.y-(this.dims[1]*.5)*(this.parent.staticAxisCount+1)+y - this.parent.itemMargins[1]*this.parent.staticAxisCount //- ((axisLength[0]-this.dims[0])*.5) +  count*(this.itemMargins[0]*.5) - this.itemMargins[0]*.5;

		// var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-(this.dims[1]+this.itemMargins[1]*(this.staticAxisCount+1)))*.5);// - this.itemMargins[1];
		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//streamHorizontal()
	exports.streamHorizontal = streamHorizontal;






	function pinterest(x,y){

		var curve = pinterestPath;

		var 
		count = this.parent.staticAxisCount+1,
		gridDims = this.parent.gridDims,
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;


		// console.log(axisLength)

		var xyFactor = [
			gridDims[0], //Math.max(0,gridDims[0]),
			gridDims[1] //Math.max(0,gridDims[1])
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = p.x-(this.dims[0]*.5)*count +x - this.parent.itemMargins[0]*this.parent.staticAxisCount //- ((axisLength[0]-this.dims[0])*.5) +  count*(this.itemMargins[0]*.5) - this.itemMargins[0]*.5;
		var yo = (gridDims[1]-this.outerDims[1]*.5)-p.y;
		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//pinterest()
	exports.pinterest = pinterest;







	// ========= 1:1 projection ========
			
	function xyPlain(x,y) {
	
		var 
			w = this.waves,
			tRamp = w.tailRamp,
			hRamp = w.headRamp,
			tri = w.triangle,
			xo,
			yo;
			
		xo=x;
		yo=y;
		zo=0;
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';

		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)';

		this.e.style.opacity = 1;//tri;
		this.pPos = [x,y];

	} //xyPlain(x,y)
		
	exports.xyPlain = xyPlain;








	//=========== linear projections ===============

	function xyBumpTaper(x,y) {
	
		var 
		w = this.waves,
		tRamp = w.tailRamp,
		hRamp = w.headRamp,
		tri = w.triangle,
		xo,
		yo;
		
		xo=x;
		yo=y;
		
		//this.e.style.webkitTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform =  
		'translate3d(' + xo + 'px,' + yo +'px, 0) '
			//+'rotateZ('+g*15+'deg)'
			+'scale('+(tri*1+.4)+')';
			
		//this.e.style.opacity = '';//clear opacity setting (if set by other mapping FN);
		this.e.style.opacity = tri;
		this.pPos = [x,y];
			
	} //xyPlain(x,y)				
	exports.xyBumpTaper = xyBumpTaper;

	return exports;


});



define('Animator',[],function(){

                var Animator = function(options) {
                    if(!options)options={};
                    
                    var parent = options.parent;
                    
                    this.resetAnimation = function() {
                        this.easingCurve = options.easingCurve
                        this.easeToDuration = options.easeTime||500;//ms
                        this.isEasing = false;
                        this.activeDuration = 0;
                        this.easingProgress = this.activeDuration;
                        this.easeFactor = 0;
                        this.easingStartTime = 0;
                        this.easeToStart = 0;
                        this.easeToDiff = 0;
                        options.parent.isEasing = false;
                    }//resetAnimation
                    
                    
                    this.animateFrTo = function(from,to,ms,eFn) {
                    
                        ms = (ms==undefined)?this.easeToDuration:ms;
                        //ms = (parent.getLayoutIsXing())?parent.getLayoutXingMs():ms;
                        if(eFn)
                            this.easingCurve = eFn;
                        
                        var mTime = ms;// * f;
                        var d = from-to;

                        this.easeToDiff = -1*(d);//distance between start & end
                            
                        this.isEasing = true;
                        this.activeDuration=mTime;
                        this.easingStartTime = new Date();
                        this.easingProgress=0;
                        options.parent.isEasing = true;
                    }//animateFrTo
                    
                    
                    this.getNextFrameDiff = function(){
                        //if we are not done easing then we are still easing
                        var isProgressing = this.easingProgress < this.activeDuration;
                                                
                        if(isProgressing){
                            //increment easing progress by the amount of time that has passed
                            this.easingProgress = new Date() - this.easingStartTime;                    
                            this.easeFactor = this.easingCurve(null,this.easingProgress,0,1,this.activeDuration);//if g_easingProgress == g_activeDuration then there will be no easing effect (i.e. x will be set to x * 1)
                        }else{
                            this.resetAnimation();//reset easing
                        }
                        
                        var m = this.easeToDiff*(1-this.easeFactor);                        
                        
                        return m;
                        
                    }//nextFrame
                    
                    this.resetAnimation();
                    
                    return {
                        isEasing : function(){return this.isEasing},
                        resetAnimation: this.resetAnimation,
                        animateFrTo: this.animateFrTo,
                        getNextFrameDiff: this.getNextFrameDiff
                    }
                    
                    
                }//Animator	



	return Animator

});










define('Box',[
	'Easings'
	,'Animator'
],function(
	easings
	,Animator
){
    //var Draggable = draggable.Draggable;
    

	var Box = function (grid) {
		
		this.parent = grid;
		var that = this;
		
		this.ezEnabled = function(){return this.parent.itemEasing;}
		this.ezOptions = this.parent.options.itemEasingParams;
		this.doPreloading = this.parent.options.itemPreloading;
		this.getlayoutXansEasing = function(){return this.parent.layoutXansEasing;}
		this.getLayoutIsXing = function(){return this.parent.layoutIsXing;}
		this.getLayoutXingMs = function(){return this.parent.layoutXansMs;}
		this.springLimit = this.parent.springLimit;
		this.itemMargins = this.parent.itemMargins;
		//this.staticAxisCount = this.parent.staticAxisCount;
		//this.setSurfaceMap(this.parent.options.surfaceMap);
		//this.surfaceMap = this.parent.surfaceMap;

		this.index=null;//will be set by Grid.js

		this.x = this.y = 0;//init these -- incase needed prior to first stashPosition() 
		this.dims = [0,0];
		this.outerDims = [0,0];
		
		this.staticAxis = 0;
		this.headPointPos = [0,0];
		this.tailPointPos = [0,0];
		this.pPos = [0,0];//paint position
		this.prevObj = null;
		this.nextObj = null;
		
		this.targetPaintPos = [0,0];
		this.currentPaintPos = [0,0];
		this.targetXY   = [0,0];
		this.currentXY  = [0,0];
		this.sizeRatio = 0;
		this.displayClass   = '';
		
		this.isOnScreen = false;
		this.isLoaded = false;
		this.hasEntered = false;

		//this.contentObj = {};//init to {}
		this.ani_si = new Animator({easingCurve:easings.easeOutCubic,parent:this});
		this.ani_si_= new Animator({easingCurve:easings.easeOutCubic,parent:this});                 
		

		this.element = this.e = document.createElement('div');
		// this.element = this.e;
		this.$e = $(this.e);
		// this.element.classList.add("Box");
		this.element.classList.add("gridBox");
		this.e.style.display='none';

	  // if(this.Draggable)
	  //   this.draggable = new this.Draggable(this);//see:onDragConfigure() for options
                    

	
		this.model = {};
		
		this.setModel = function(obj) {

			//set data model reference
			this.model = obj;
			//this.model = JSON.parse(JSON.stringify(obj));//lifting ground is necessary to avoid pollution from getNextJudyItem & getPrevJudyItem when used in other modules
			
			// to support next and previous on ItemView Data
			
			this.model.data.getNextJudyItem = function(){
				var o = grid.getBoxFromIndex(that.index+1);
				if(o&&o.model)o=o.model.data;
				return o;
			}

			this.model.data.getPrevJudyItem = function(){
				var o = grid.getBoxFromIndex(that.index-1);
				if(o&&o.model)o=o.model.data;
				return o;
			}



			//set local display properties with defaults for missing nodes 
			this.layoutType = obj.layoutType || 'tremulaInLine';
			this.noScaling = obj.noScaling || false;

			//set DOM template and references ==> currently no support for template change -- because dom references seem to break...
			if(this.e.innerHTML.trim()==''){
				if(this.model.template){
					this.e.innerHTML = this.model.template;
				}else{
					this.e.innerHTML = '<div class="boxLabel">X</div><img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/>';
				}
				this.$moneyShot = $('.moneyShot',this.$e);
				this.$c = $('.boxLabel',this.e);
			}

			//add a hook for resolving data via $e
			this.$e.data('model',this);

			//set local DOM classes 
			if(obj.auxClassList)this.$e.addClass(obj.auxClassList);
			if(obj.isLastContentBlock)this.$e.addClass('isLastContentBlock');
			if(obj.isFavorite){this.$e.addClass('isFavorite');}else{this.$e.removeClass('isFavorite');}

		}

		//grid.e.appendChild(this.e); 


	};// Box
	



                
	Box.prototype.updateContent = function(){
		if(this.$c.length){
			//push mapped index value into DOM
			this.$c.html( 
				this.index
				//+ "<br/>" + Math.round(this.currentXY[0])+':'+Math.round(this.targetXY[0])
				//+ "<br/>" + Math.round(this.x)+':'+Math.round(this.y)
				//+ "<br/>diff: " + Math.round(b.easeToDiff)
				//+ "<br/>" + Math.round(this.sizeRatio*1000)/1000
				//+ "<br/>" + this.isOnSaEvt
				//+ "<br/>" + this.saEvtDistPercent
				+ "<br/>" + this.waves.headRamp.toFixed(3)

				//+ "<br/>" + this.displayClass 
				
			);
			//this.$dbug.append("====>");
		}
	}//end updateContent()
	
	Box.prototype.setDimensions = function( w, h ) {
		this.e.style.width = w + 'px';
		this.e.style.height = h + 'px';
		this.dims[0] = this.width = this.w = w;
		this.dims[1] = this.height = this.h = h;
		this.sizeRatio = h/w;
		this.displayClass = this.getDisplayClass(this.sizeRatio);
		// this.$moneyShot.css({'width':this.w,'height':this.h})
	}
	
	Box.prototype.getDisplayClass = function(ratio){
		if(ratio > 1.1){
			return 'portrait';
		}else if(ratio < .9){
			return 'landscape';
		}else{
			return 'square';
		}
	}
	
	Box.prototype.paintToSurfaceMap = function(x,y){
		this.parent.surfaceMap.call(this,x,y);
	};
	
	Box.prototype.remove = function() {
		this.parent.e.removeChild( this.e );
	}

	Box.prototype.doOnScreen = function(torf) {
		if(torf!=undefined && this.isOnScreen !== torf){
			this.isOnScreen=torf;
			if(torf && !this.isLoaded)this.$moneyShot.attr('src',this.model.imgUrl);
			var c = this.e.classList, d = this.e.style.display;
			if(torf){
				if(!this.hasEntered){
					this.hasEntered = true;//this flag should only flips once per e lifetime when e is first placed onscreen
					setTimeout(function(){c.add('hasEntered')},10)
				}
				this.e.style.display = 'block';
				setTimeout(function(){c.add('onScreen')},10)
			}else{
				this.e.style.display = 'none';
				c.remove('onScreen')
			};
			this.isLoaded = true;//one could argue it might be better to call this after the DOM e load event. it's name implies that the content is loaded -- but in actuality this flag only signifies that we have made a load request.  This is not a huge deal currently since we are only using this parameter to prevent a second load call, however, other uses may not work as expected.
		}
		return this.isOnScreen;
	}
	
	Box.prototype.setWaveforms = function(o) {
		this.waves = o;
	}
	
	
	Box.prototype.getSaEvtStats = function(){
		var 
			si=this.parent.si, 
			pPos = this.pPos[si],
			ctr = pPos + this.outerDims[si]*.5,
			saEvtPos = this.parent.saEventPos,
			d = ctr - saEvtPos;
		
		return {
			d:d,
			dPercent:d/this.parent.gridDims[si],
			isOnEvtPos:(saEvtPos >= pPos && saEvtPos <= pPos + this.outerDims[si])?true:false
		}
	}
	
	
	
	/**
	* tremula is based on layouts that are [horizontally|vertically] offset by a master scroll value
	* as the master scroll value changes, each box item is assigned an updated position
	* each box updates its own x&y position through setAbsPos()
	* if item easing is enabled position updating happens over time
	*
	* @method setAbsPos
	* @param x - x value in absolute space
	* @param y - y value in absolute space
	* 
	*/
	
	
	Box.prototype.setAbsPos = function( x, y ) {
		
		
		//if this is the last selected item then disable easing
		if(!this.ezEnabled() && !this.getLayoutIsXing()){

			this.currentXY[0] = x;//+5;//this creates a little jump ideally to make you feel like you just put something down.  Kinda jumpy tho.  Would be good to tune this a little.
			this.x = x;
			this.currentXY[1] = y;
			this.y = y;
			
			return
		}
		
		
		var isOnSaEvt = this.isOnSaEvt;

		var stats = this.getSaEvtStats();
		this.isOnSaEvt = stats.isOnEvtPos;
		this.saEvtDistance = stats.d;
		this.saEvtDistPercent = stats.dPercent;					
		
		var touchRatio = stats.dPercent;
		var trThresh = Math.abs(touchRatio) < .09;
		
		//1-easeOutQuint_t(this.parent.easingPercent);
		var
			synchThresh = 5 * (1-this.parent.easingPercent), //in px. if delta > synchThresh then isSynchThreshTrig = 1 (else zero)
			si = this.parent.si, //active scroll index cache
			si_ = this.parent.si_, //active scroll index inverted cache
			axisArg = (si)?y:x,//si axis value
			axisArg_ = (si_)?y:x,//si_ axis value
									
			isSynchThreshTrig = (
				axisArg > this.targetXY[si] + synchThresh 
				|| axisArg < this.targetXY[si] - synchThresh
				|| trThresh
			)?1:0,
			
			isSynchThreshTrig_ = (
				axisArg_ > this.targetXY[si_] + synchThresh 
				|| axisArg_ < this.targetXY[si_] - synchThresh
				|| trThresh
			)?1:0;
			

		//=====EASING====
		
		
		
		//if there is a new target value on si or si_ then reset easing to new location
		if(
			(axisArg!=this.targetXY[si] && isSynchThreshTrig)
			|| (axisArg_!=this.targetXY[si_] && isSynchThreshTrig_)
		){
			//go ahead and update the new x&y target
			this.targetXY = [x,y];

			//set ease type and time
			var easeCurve, easeTime;
			
			if(this.getLayoutIsXing()){
				//if we are in a (potentially big) grid layout state change
				easeCurve = this.getlayoutXansEasing();
				easeTime = this.getLayoutXingMs();
			}else if(this.parent.isTouching){
				//or one of the boxes is being directly manipulated
				easeCurve = this.ezOptions.touchCurve
				easeTime = this.ezOptions.easeTime;
			}else{
				//or we are in a normal state traveling to our target position
				easeCurve = this.ezOptions.swipeCurve;
				easeTime = this.ezOptions.easeTime;
			}
			
			
			//initalize if we do not have credible runtime values
			if(this.currentXY[0]==0 && this.currentXY[1]==0){
				this.currentXY[0]=x;
				this.currentXY[1]=y;
			}
			
			
			//set or reset the animation program for each axis
			this.ani_si.animateFrTo(
				this.currentXY[si],
				this.targetXY[si],
				easeTime,
				easeCurve
			);
			this.ani_si_.animateFrTo(
				this.currentXY[si_],
				this.targetXY[si_],
				easeTime,
				easeCurve
			);
			
			
		}//end if
		

		// m is the current pixel-distance between the current x|y value and the target value
		var m = this.ani_si.getNextFrameDiff();
		//if(this.isEasingTo){
		if(Math.abs(m)>.001){
			this.currentXY[si]=this.targetXY[si] - m;
		}else{
			this.currentXY[si]=this.targetXY[si];
		}

		var m_ = this.ani_si_.getNextFrameDiff();
		if(Math.abs(m_)>.001){
			this.currentXY[si_]=this.targetXY[si_] - m;
		}else{
			this.currentXY[si_]=this.targetXY[si_];
		}


		//====SPRING LIMITS=====
		var _x = Math.min(Math.abs(touchRatio),1);
		
		var maxMove = this.springLimit;
		
		var maxSi = this.targetXY[si] + (maxMove * _x);
		var minSi = this.targetXY[si] - (maxMove * _x);
		
		var maxSi_ = this.targetXY[si_] + (maxMove * _x);
		var minSi_ = this.targetXY[si_] - (maxMove * _x);

		
		if(this.currentXY[si] > maxSi){
			this.currentXY[si] = maxSi;
		}
		
		if(this.currentXY[si] < minSi){
			this.currentXY[si] = minSi;
		}


		
		if(this.currentXY[si_] > maxSi_){
			this.currentXY[si_] = maxSi_;
		}
		
		if(this.currentXY[si_] < minSi_){
			this.currentXY[si_] = minSi_;
		}
		

		this.x = this.currentXY[0];
		this.y = this.currentXY[1];

	};//setAbsPos()

	
	return Box

});










define('Grid',[
	'Easings'
	,'Box'
	,'Layouts'
],function(
	easings
	,Box
	,layouts
){


	var Grid = function($target,options,parent){
		this.physicsLoopRAF = null;

		this.options = options;
		this.$e = $target;
		this.e  = $target[0];
		this.parent = parent;
		this.parentParentE = $target.parent();//this.parent.parent.$e[0];



		this.statsCache = {};//workspace node for instance-level data.

		this.onChangePub = options.onChangePub;
		
		this.surfaceMap = function(){};
		this.setSurfaceMap = function(fn){
			this.surfaceMap = fn;
		}
		this.setSurfaceMap(options.surfaceMap);
		
		this.boxCount 				= 0;	//count of data elements
		this.boxes      			= [];	//array of data elements

		this.steppedScrolling = false;
		this.easeToCompensation = 0;

		this.springLimit 			= options.itemEasingParams.springLimit; //depth of item level movement when itemEasing is enabled

		this.boxAxisLengths 		= [0,0]; //The total H&W axis lengths after evaluating data (including item margin -- but does not include axis margin)
		this.currentGridContentDims		= [0,0]; //NOTE:  boxAxisLengths is used as an aggregator during layout and will not always reflect the correct state -- use this value instead for inter-module publishing
		this.contentDims		= [0,0]; //NOTE:  should actually be the dims of the content
		
		//this.boxAxisLessScrollMargin	= [0,0]; //The total H&W axis lengths after evaluating data (including item margin -- but does not include axis margin)
		
		this.trailingEdgeScrollPos 	= null; //this is the scroll value in which the last data element is displayed with it's tail edge at the very end of the visible scroll axis
		//used to keep code readable -- used in axisOffset.x & axisOffset.y
		this.scrollAxisOffset 		= options.scrollAxisOffset; //default value (may be modified by this.setScrollAxis())
		this.staticAxisOffset 		= options.staticAxisOffset; //default value (may be modified by this.setScrollAxis())

		
		this.axisOffset 			= [];   
		this.gridDims 				= [];
		
		this.scrollPos 				= 0;
		this.absScrollPos 			= 0;
		

		var lastD 					= 0;
		// var lastD_ 					= 0;
		
		this.setScrollPos = function(v,isDelta) {
			this.scrollPos = (isDelta)?this.scrollPos+v:v ;
		}
		
		this.getAbsToScrollPos = function(v) {
			return v-this.firstItemPos;
		}

		this.setAbsScrollPos = function(v,isDelta) {
			return this.scrollPos = (isDelta)?this.scrollPos+v:this.firstItemPos+v ;
		}
		
		this.moveToAbsScrollPos = function(v,isDelta) {
			this.scrollPos = (isDelta)?this.scrollPos+v:this.firstItemPos+v ;
			this.startPhysicsLoop()
		}
		
		this.getScrollViewDim = function(){
			return this.gridDims[this.si];
		}
		this.getScrollDimCenter = function(){
			return this.gridDims[this.si]/2;
		}
		this.getScrollPos = function(){
			return this.scrollPos;
		}
		this.saEventPos = null;
		this.saEventPosProgress = 0;
		
		this.easingPercent = 100;
		this.isEasing=false;
		this.isEasingTo=false;
		this.marginScrollWarp = false;
		
		this.easeToThresh = 2;//px
		
		this.easingProgress     = 0;//time now - easingStartTime
		this.easingStartTime    = 0;//time when easing started
		
		this.schwingBackDuration = 500;
		this.schwingEasingFn = easings.easeOutCubic;
		this.easingDuration     = 1800;//in ms
		this.easeToDuration     = 300;//in ms
		//this.bounceBackDuration = 200;//ms
		this.activeDuration = this.easingDuration;
		
		this.easeToStart            = 0;
		this.easeToEnd              = 0;
		this.easeToDiff             = 0;
		
		this.dMomentum              = 100;
		this.momentum               = 0;
		this.momentumLimit      		= 150;
		
		
		this.mouseWheelReleaseTime = 100;//ms
		
		this.isLooping = (options.isLooping||false);
		
		this.isTouching = false;
		
		this.hasData = false;

		this.isInTailMargin = false;
		this.isInHeadMargin = false;
		this.hasShortGridDimsSi = false;//visual content does not fill scroll axis gridDim
		this.hasMediumGridDimsSi = false;//visual content extends beyond scroll axis gridDim but does not fill scroll axis gridDim plus scroll margin

		this.scrollDirection = 0;

		this.itemMargins = options.itemMargins;
		this.itemConstraint     = options.itemConstraint;//staticAxis value
		this.staticAxisCount = options.staticAxisCount;//
		
		this.scrollMarginDefault = -2000;
		//this.scrollMarginFactor = 10;//this multiplies the size of the first element used in scroll margin
		this.scrollMargin =[0,0];//should be based on size of first & last element
		this.firstItemPos = 0;//this is probably always tied the the active scroll margin and is equal to the width of the first item

		this.frameCtr = 0;
		this.frameRateLog = [];
		this.frameRate = 0;
		this.lastFrameTime = new Date;
		this.trackFrameRate = function(){
			var sum,now = new Date;
			this.frameRateLog.push(now-this.lastFrameTime);
			
			if(this.frameRateLog.length>100)
				this.frameRateLog.shift();
				
			sum = this.frameRateLog.reduce(function(memo,val){return memo + val})
			this.frameRate = 1000/(sum/100);
			this.lastFrameTime = now;
		}
		
		
		this.lastSPL = 0;//track when the last call to startPhysicsLoop
		this.splReleaseTime = 500;//ms
		
		this.fastScrollThresh = 20;
		//this.isFastScroll = false;
		
		
		this.itemEasing=options.itemEasing;
		this.setItemEasing = function(torf){
			this.itemEasing = (torf)?true:false;
		}
		
		// this.lastOffscreen = null;
		// this.setLastOffScreen = function(o){
		// 	if(o){
		// 		return this.lastOffscreen = o;
		// 	}
		// }
		
		this.isChildEasing = false;

		this.lastSelected = null;
		

		this.getBoxFromIndex = function(i){
			return this.boxes[i];
		}

		this.getLastBoxFromIndex = function(){
			return this.boxes[this.boxes.length-1];
		}
		
		//initalizes / resets the grid per scrollAxis 
		this.setScrollAxis = function(axis){
			
			if(!axis)axis=this.sa;//if we are just refreshing window size then maintin scrollAxis state
		
			this.sa = (axis=='y')?'y':'x';//scrollAxis ['x'|'y']
			this.SA = this.sa.toUpperCase()
			this.sx = (this.sa=='x'); //scrolls X;  true if scrollAxis is X
			this.si = (this.sx)?0:1; //scroll axis index value data_xy_matrix[0|1]
			this.si_ = (!this.sx)?0:1; //scroll axis index value data_xy_matrix[0|1]
			this.saDim = (this.sx)?'width':'height',//scroll axis dimention property
			this.saDim_ = (!this.sx)?'width':'height',//scroll axis dimention property
			
			this.gridDims[0] = this.$e.width();
			this.gridDims[1] = this.$e.height();
			
			this.axisOffset[0] = (this.sx)?this.scrollAxisOffset:this.staticAxisOffset;
			this.axisOffset[1] = (!this.sx)?this.scrollAxisOffset:this.staticAxisOffset;
			if(this.scrollPos==undefined) this.scrollPos = 0;//this.gridDims[this.si];
			this.lastScrollPos  = 0;
			this.lastScrollDiff = 0;
			
			//bounce margin is the distance you can drag the item list beyond the head or tail of the item list.
			this.bounceMarginDefault = 50;
			this.bounceMargin = this.bounceMarginDefault;//this.gridDims[this.si]*.5;
			
			if(this.trailingEdgeScrollPos)
				this.trailingEdgeScrollPos=this.getTrailingEdgeScrollPos();
			
		}
		
		this.lastUserEvent = {time:new Date,evt:'init'};
		this.tagLastUserEvent = function(evt){
			this.lastUserEvent = {time:new Date,evt:evt};
		}
		
		//this primes easing config
		this.resetEasing();
		//initalize scroll axis params
		this.setScrollAxis(options.scrollAxis);
		

	}//END grid object
	
	Grid.prototype.updateConfig = function(config,torf){
		if(config.hasOwnProperty('axes'))config.staticAxisCount=config.axes;//need to map this...
		if(config.hasOwnProperty('surfaceMap'))this.setSurfaceMap(config.surfaceMap);

		$.extend(this,config);
		this.resetAllItemConstraints();
		if(torf)this.setLayout(null,config);
	}


	Grid.prototype.toggleScrollAxis = function(axis){
		this.jumpToScrollProgress(0);
		
		if(!axis){
			axis =(this.sa=='x')?'y':'x';
		}
		this.setScrollAxis(axis);
		this.resetAllItemConstraints();
		
		
	// 	var that=this;
	// 	setTimeout(function(){
	// 			that.setLayout(layouts.basicGridLayout,{axes:that.staticAxisCount});
	// //      that.doTransition(basicGridLayout,{axes:2},0,easeOutElastic);
	// 	}, 100)
		
		this.setLayout(layouts.basicGridLayout,{axes:this.staticAxisCount});

		//this.handleGesture({type:'touch'});
		
		//this.oneShotPaint();
	}
	
	Grid.prototype.toggleIsLooping = function(torf){
		if (typeof torf === "undefined") {
			torf = !this.isLooping;
		}
		this.isLooping = torf;
	}

	//evt can be the event object or an integer value (representing the scroll axis event position)
	// this thing sets saEventPos & saEventPosProgress
	
	Grid.prototype.setLastTouchOrigin = function(evt){
		
		//run only if we're doing item-level tremula action
		if(!this.itemEasing)return;
		
		//if we're in the margins don't change anything
		if(this.marginScrollWarp)return;
		
		//if this doensnt have the data we need then no deal.
		if(!evt) return;
		
		//get the scroll axis event position
		var sa = (isNaN(evt))?this.getPageSA_evt(evt):evt;
		
		//relative screen position translated to absolute position
		//var absSa = this.absScrollPos + sa;
		//this.$dbug.append('ABS:'+absSa+'<br>')
		
		var saEventPosProgress = sa/this.gridDims[this.si];
		//update the global value -- this may be moved to a different handler -- here for now.
		this.saEventPos = sa;//  /this.gridDims[this.si];
		this.saEventPosProgress = saEventPosProgress;
		
		
		//ok we're good
		return {saEventPos:sa,saEventPosProgress:saEventPosProgress};
		
	}//END this.setLastTouchOrigin()




	Grid.prototype.getScrollFrame = function(){
		//increment frame counter
		this.frameCtr++;
		
		//flag if we are in an Easing state
		this.isEasing = this.easingProgress < this.activeDuration;
		
		//easeFactor is our cached easing factor -- default is ZERO (no effect)
		var easeFactor = 0;
		
		
		if(this.isEasing){
			//increment easing progress by the amount of time that has passed
			this.easingProgress = new Date() - this.easingStartTime;                    
			easeFactor = easingFn(null,this.easingProgress,0,1,this.activeDuration);//if g_easingProgress == g_activeDuration then there will be no easing effect (i.e. x will be set to x * 1)
			this.easingPercent = Math.min(1,this.easingProgress/this.activeDuration);
		}else{
			//were done so stop calculating
			this.resetEasing();//easingProgress overrides any easeTo requests (if still in progress)
			
			var now = new Date;
			
			//u.log(now - this.lastSPL+' <--> '+this.splReleaseTime)
			
			if(!this.isChildEasing && (now - this.lastSPL) > this.splReleaseTime){
				this.stopPhysicsLoop();
			}
		}
		
		
		
		
		//======we are either in an easeTo transition or we are just having momentum====
		if(this.isEasingTo){
			var m = this.easeToDiff*(1-easeFactor);
			this.setScrollPos(this.easeToEnd - m);
		}else{
			var m = this.momentum*(1-easeFactor);
			if(m!=0)
				this.setScrollPos(this.scrollPos + m);
		}
		
		
		
		
		
		//======margin cases======
		this.isInTailMargin = false;
		this.isInHeadMargin = false;
		
		var D = this.lastScrollPos - this.scrollPos;
		this.lastScrollDiff = D;

		
		//this.isFastScroll = (this.lastScrollDiff>-this.fastScrollThresh && this.lastScrollDiff < this.fastScrollThresh)?false:true;//low speed



		//=====HEAD MARGIN=====
		//if we have scrolled to a position into the leading margin
		if (
			
			(!this.isLooping && this.scrollPos>this.firstItemPos)
			||
			(this.hasShortGridDimsSi && this.absScrollPos>2 && !this.steppedScrolling)

		){
			this.isInHeadMargin = true;



			//if we are moving deeper into the margin
			if(D < 0){
				
				this.setLastTouchOrigin(0);
				
				this.marginScrollWarp = true;//add tension if we are moving deeper
				
				//shorten the ease time if we are in the middle of a big throw
				if(this.isEasing && this.activeDuration - this.easingProgress > this.easeToDuration){
					this.activeDuration = this.easeToDuration;
				}
				
			}else if(D > 0){
				this.marginScrollWarp = false;//remove tension if we are moving out of the margin
			}

			
			//hit head on the wall point
			if(this.scrollPos>this.bounceMargin+this.firstItemPos){
				this.setScrollPos(this.bounceMargin+this.firstItemPos);
				this.resetEasing();
				//this.marginScrollWarp = false;
			}
			
			//schwing back
			if(!this.isTouching && !this.isEasing){
				this.easeTo(
					this.firstItemPos-1,
					this.schwingBackDuration,//this.easeToDuration
					this.schwingEasingFn
				);//offset 1px because easing has rounding errors
			}
		}//end leading-margin handling
		
		
		
		
		//=====TAIL MARGIN=====
		//if we have scrolled to a position into the trailing margin
		if (!this.isLooping && this.scrollPos<this.trailingEdgeScrollPos ){
			this.isInTailMargin = true;
			
			//if we are moving deeper into trailing margin
			if(D > 0){
				
				this.setLastTouchOrigin(this.gridDims[this.si]);
				this.marginScrollWarp = true;//this.isTouching;

				//shorten the ease time if we are in the middle of a big throw
				if(this.activeDuration - this.easingProgress > this.easeToDuration){
					this.activeDuration = this.easeToDuration;
				}
			}else if(D < 0){
				this.marginScrollWarp = false;//remove tension if we are moving out of the margin
			}

			//hit tail on the wall point
			if(this.scrollPos<this.trailingEdgeScrollPos-this.bounceMargin){
				this.setScrollPos(this.trailingEdgeScrollPos-this.bounceMargin);
				this.resetEasing();
			}
			
			//schwing back
			if(!this.isTouching && !this.isEasing){
				this.easeTo(
					this.trailingEdgeScrollPos+1,
					this.schwingBackDuration,//this.easeToDuration
					this.schwingEasingFn
				);//offset 1px because easing has rounding errors
			}
			
		}//end trailing margin handling
		
		
		
		//make sure to release tension if we are not in the margin
		if(!this.isInHeadMargin && !this.isInTailMargin)
			this.marginScrollWarp = false;


		
		//warp head or tail margin space if touchMoveTension is active OR if we have less content than we have scroll dim
		if( (this.hasShortGridDimsSi || this.marginScrollWarp ) && !this.isEasing ){
			var ns;//this is our normalized scroll value

			if(this.hasShortGridDimsSi && this.absScrollPos>0){
				ns = this.absScrollPos;
			}else if(this.scrollPos>0){
				ns = this.scrollPos-this.firstItemPos;//normalized scroll
			}else{
				ns = -(this.scrollPos-this.trailingEdgeScrollPos);//normalized scroll
			}

			//NOTE: this overrides ns (normalized scroll value) so make sure to run this AFTER this.hasShortGridDimsSi test case.
			if(this.hasMediumGridDimsSi){			
				if(this.absScrollPos<0){
					ns = this.scrollPos-this.firstItemPos;//normalized scroll
				}else{
					// ns = -(this.scrollPos-this.trailingEdgeScrollPos);//normalized scroll <--- this was causing bug #10 "stream jumps when tail dragging at or near absolute 0 scrollPos"
				}
			}				


			var r = Math.min(1,ns/this.bounceMargin);//percent of bounce margin traveled
			var ez = Math.min(1,easings.easeOutQuart(null,r,0,1,1));
			this.setScrollPos(D*ez,true)
		}
		
		//this.page = -Math.floor(this.scrollPos/this.boxAxisLengths[this.si])-1;//TODO: REMOVE if page number is not needed.

		if(D>0){
			this.scrollDirection=1;
		}else if(D<0){
			this.scrollDirection=-1;
		}else{
			this.scrollDirection=0;
		}
		
		this.lastScrollPos = this.scrollPos;
		
		this.absScrollPos       = -(this.scrollPos - this.firstItemPos);
		this.scrollProgress     = this.absScrollPos/this.absTrailingEdgeScrollPos;
		
		
		this.trackFrameRate();
		
		//LOOP CALLBACK
		if(this.onChangePub)this.onChangePub(this);
		
		return this.scrollPos;//warpedScrollPos;
		
	}// getScrollFrame()
	

	Grid.prototype.startPhysicsLoop = function(){
		this.lastSPL = new Date;//track when the last call to startPhysicsLoop
		if(!this.physicsLoopRAF){
			var that = this;
			this.physicsLoopRAF = requestAnimationFrame( function(){that.assignBoxObjects()} );
		}
	}
	
	Grid.prototype.stopPhysicsLoop = function(){
		if(this.physicsLoopRAF){
			cancelAnimationFrame(this.physicsLoopRAF);
			this.physicsLoopRAF = null;
		}
	}

	Grid.prototype.oneShotPaint = function(ev){
		//this.stopPhysicsLoop();
		if(!ev) return;
		
		//TODO:  INSTEAD OF setLastTouchOrigin() we should use outerDims method to get all boxes at the saEventPos
		this.setLastTouchOrigin(ev);//CHANGE THIS !!!
		
		if(this.isEasing){
			this.resetEasing();
		}
		this.startPhysicsLoop();
	}
	
	Grid.prototype.getPageSA_evt = function(evt){
		//u.log(evt)
		if(!evt || !evt.gesture) return null;
		return evt.gesture.center['page'+this.SA];
	}

	Grid.prototype.getClosestScrollOriginObj = function(){
		var arr = this.boxes, obj;

		if(this.isInHeadMargin){
			obj = this.getBoxFromIndex(0);
		}else if(this.isInTailMargin){
			obj = this.getLastBoxFromIndex();
		}else{		
			obj = arr.reduce(function(a,b){
				return (a.waves.triangle>b.waves.triangle)?a:b;
			});
		}
		return obj;
	}


	Grid.prototype.jumpObjTo = function(p,obj){//object or index of object
		
		this.resetEasing();
		
		if(!obj)obj=0;
		if(!isNaN(obj)){obj = this.getBoxFromIndex(obj);}
		
		// if(p>this.firstItemPos)
		// 	p=this.firstItemPos;

		// if(p<this.trailingEdgeScrollPos)
		// 	p=this.trailingEdgeScrollPos;
		
		var oPoint = obj.headPointPos[this.si]+obj.width*.5;
		
		this.setAbsScrollPos(p-oPoint)
		this.startPhysicsLoop();
	}


	Grid.prototype.easeToThisStepItem = function(o){
		this.easeObjTo(this.easeToCompensation,o)
		this.$e.trigger('stepItemFocus',o);
		return o;
	}
	

	Grid.prototype.easeToClosestStepItem = function(){
		var obj = this.getClosestScrollOriginObj();
		this.easeObjTo(this.easeToCompensation,obj);
		this.$e.trigger('stepItemFocus',obj);
		return obj;
	}
	
	Grid.prototype.easeToNextStepItem = function(){
		var obj = this.getClosestScrollOriginObj();
		var next = this.getBoxFromIndex(obj.index+1 || null);
		this.easeObjTo(this.easeToCompensation,next||obj)
		this.$e.trigger('stepItemFocus',next);
		return next;
	}
	Grid.prototype.easeToPrevStepItem = function(){
		var obj = this.getClosestScrollOriginObj();
		var prev = this.getBoxFromIndex(obj.index-1 || null);
		this.easeObjTo(this.easeToCompensation,prev||obj)
		this.$e.trigger('stepItemFocus',prev);
		return prev;
	}

	//@param p = 0..1
	Grid.prototype.jumpToScrollProgress = function(p){
		if(p>1)p=0.999;
		if(p<0)p=0.001;
		//u.log(this.trailingEdgeScrollPos*p)
		//this.jumpObjTo(-this.absTrailingEdgeScrollPos*p)
		this.setAbsScrollPos(-this.absTrailingEdgeScrollPos*p)
		this.startPhysicsLoop();
	}

	Grid.prototype.easeObjTo = function(p,obj,ms,eFn){//obj: accepts object or index of object; p: is scrollPos
	
	// console.log('easeObjTo',obj.index)
	
		if(!obj)obj=0;
		if(!isNaN(obj)){obj = this.getBoxFromIndex(obj);}
		var oPoint = this.getAbsToScrollPos(obj.headPointPos[this.si]+obj.width*.5);

		this.easeTo(p-oPoint,ms,eFn);
	}

	Grid.prototype.easeTo = function(p,ms,eFn){
		ms = (ms==undefined)?this.easeToDuration:ms;
		
		if(eFn)
			easingFn = eFn;
		
		//var _p = Math.round(p), _sp = Math.round(this.scrollPos);
		
		if(p>this.firstItemPos)
			p=this.firstItemPos;
		
							
		if(p<this.trailingEdgeScrollPos)
			p=this.trailingEdgeScrollPos;
		
		
		//this.$dbug.html(r);
		this.momentum = 0;
		this.easingPercent = 0;

		this.isEasingTo = true;
		this.activeDuration=ms;
		this.easingStartTime = new Date();
		this.easingProgress=0;
		this.easeToStart = this.scrollPos;
		
		this.easeToEnd = p;
		this.easeToDiff = -1*(this.easeToStart-this.easeToEnd);//distance between start & end
		//if(this.easeToDiff<this.easeToThresh && this.easeToDiff>-this.easeToThresh)
		if(this.easeToDiff<2 && this.easeToDiff>-2)
			return false;

		this.startPhysicsLoop();
	}
	
	Grid.prototype.resetEasing = function(){
		//easingFn = easeInOutCubic;
		easingFn = easings.easeOutCubic;

		this.easingProgress = this.activeDuration;
		this.isEasingTo = false;
		this.isEasing = false;
		this.easeToDiff = 0;
		this.momentum = 0;
		
		
		//this.$dbug.html("resetEasing"+new Date().getMilliseconds())
	}


	Grid.prototype.startEasing = function(m,ev){
		if(m) m=Math.pow(m,3) * 20;

		if(this.isInHeadMargin || this.isInTailMargin){
			return;
		}
		if(m!=undefined)this.momentum = Math.min( Math.max(m,-this.momentumLimit), this.momentumLimit);
		this.isEasing = true;
		this.easingStartTime = new Date();
		this.easingProgress=0;
		this.activeDuration=this.easingDuration;
		
		//this.setLastSelected(this.setLastTouchOrigin(ev));
		
		this.startPhysicsLoop();
	}
	


	Grid.prototype.removeAll = function(){
			$.each(this.boxes,function(i,o){o.remove();})
			this.boxes=[];
			this.boxCount = 0;//cached value of this.boxes.length			
	}

/**
 * Add new data items to the view model. 
 * calls setDimentions() on each object
 * calls setLayout() after all items are processed
 *
 * @method initBoxes
 * @param {object} data - the data to add
 * @param {callback} adapter - a method that is called on each data iteration -- returns tremula formatted data object for each item node
 * @param {boolean} append - passing a true value will append new data to existing data set
 */
 
	Grid.prototype.initBoxes = function(data,adapter,flag){
		try{data.length}catch(e){return console&&console.log('initBoxes(): No data found.');};

		if(!adapter)adapter=this.options.adapter;

		//if we are not appending new items to our box list
		//call remove on each item then clear our model array & set boxCount cache to zero
		if(!flag){
			$.each(this.boxes,function(i,o){o.remove();})
			this.boxes=[];
			this.boxCount = 0;//cached value of this.boxes.length

			//if(LCB)data.splice(0,0,LCB);
		}

		//if there *is* content block content and it is not already in our boxes array then insert it into our data array
		var LCB = this.options.lastContentBlock;
		var hasLcbInBoxesArray = this.boxes.filter(function(x){return x.model.isLastContentBlock}).length>0;
		if(LCB && !hasLcbInBoxesArray){
			data.splice(0,0,LCB);
		}
		

		if(!data){
			//you could put something here to update the DOM -- otherwise it will appear as if nothing happened until a DOM event triggers a repaint.
			return;
		};
		
		
		var ptr = this.boxCount;//if we are appending data then ptr = the current starting point of the boxes array
		var c = this.boxCount += data.length;//update our data count end point & cache the value to c for the for loop
		
		//loop through data and create new objects
		for(var i = ptr; i < c; i++){
			var b = new Box(this);
			
			//each box gets a serial id
			//b.index = i;//this is moved because insert function shuffles the deck in a non-desirable way
			var d = data[i-ptr];
			var tmpModel;
			if(d.isLastContentBlock && d.adapter){
				tmpModel = new d.adapter(data[i-ptr],this)||{};
				tmpModel.isLastContentBlock = true;
			}else{
				tmpModel = new adapter(data[i-ptr],this)||{};
			}

			//HANDLE ANY BAD GEOMETRIC PROPERTIES -- SORRY -- CANT BE ZERO or UNDEFINED
			tmpModel.width 	= tmpModel.width 	|| 1;
			tmpModel.w 			= tmpModel.w 			|| 1;
			tmpModel.height = tmpModel.height || 1;
			tmpModel.h 			= tmpModel.h 			|| 1;
			b.setModel(tmpModel);//shim data through the adapter.  We will eventually want to add a DOM template configuration for this as well.


			//the getConstrainedItemDims array scales content to the staticAxis value 
			var scrollAxis_staticAxis_arr = (b.noScaling)?[b.model[this.saDim],b.model[this.saDim_]]:this.getConstrainedItemDims(b);

			b.setDimensions( 
				scrollAxis_staticAxis_arr[this.si],
				scrollAxis_staticAxis_arr[this.si_]
			);//setDimetions() takes w,h -- this is resolved vis-a-vis si & si_

			//updateContent() will initalize the content in the box object
			//subsequent hits to updateContent should update content based on current positioning values
				//b.updateContent() //TODO: this is disabled because we are going to do this after setting layout anyway -- we may want to run this here at some point if there are any interal dependant transformations -- but we dont have that need at this point.
			
			// if(ptr==0)
				// this.setAbsScrollPos(2000);//TODO:   THIS IS JUST A KLUDGE TO ENABLE *SCROLL ON* -- harmless until we see a scroll axis longer than 2000px, that is, assuming you want the stuff to scroll on...
			
			//if this is not the first item AND there is a Last Content Block
			if(LCB && i>0){
				this.boxes.splice(-1,0,b);//LCB is the last item. Add the new item just before that -- IOW: second to last
			}else if(flag=="insert"){
				this.boxes.splice(0,0,b);//add new item to the beginning of the list
			}else{
				this.boxes.push(b);//push new item to the end of the list
			}
			
			this.e.appendChild(b.e);


		}//END for loop
		this.setLayout(layouts.basicGridLayout,{
			axes:this.staticAxisCount,
			isNewSet:(ptr==0)?true:false
		});


	}//Grid.prototype.initBoxes
	
	Grid.prototype.resetAllItemConstraints = function(){
		var c = this.boxCount;
		for (var i = 0; i < c; i++) {
			var b = this.boxes[i];
		
			var scrollAxis_staticAxis_arr = this.getConstrainedItemDims(b);
			
			b.setDimensions( 
				scrollAxis_staticAxis_arr[this.si],
				scrollAxis_staticAxis_arr[this.si_]
			);//setDimetions() takes w,h -- this is resolved vis-a-vis si & si_
		}   
	}
	
	Grid.prototype.getConstrainedItemDims = function(b){
			var 
				staticAxisDim       = this.itemConstraint,                  //cache the constraint value (for the static axis)
				constraintRatio     = staticAxisDim / b.model[this.saDim_], //how much we will enlarge/reduce the scroll axis to scale 1:1 with our staticAxis constraint
				scrollAxisDim       = b.model[this.saDim]*constraintRatio,  //calculate the scroll axis value
				scrollAxis_staticAxis_arr = [scrollAxisDim,staticAxisDim];//save as relative matrix for setDimentions(w,h)
			return scrollAxis_staticAxis_arr;
	}
	
	Grid.prototype.setLayout = function(layout,options){
		//options=(!options)?{}:options;	
		var options_ = this.lastLayoutOptions&&this.lastLayoutOptions.options||{};
		//if there are absolutely no layout specs then just bump out of here because we're not ready to draw yet...
		if(!layout && (!this.lastLayoutOptions || !this.lastLayoutOptions.layout)){return};
		if(!options  && (!this.lastLayoutOptions || !this.lastLayoutOptions.options)){return};

		if(!layout)layout = this.lastLayoutOptions.layout;
		//if(!options)options = this.lastLayoutOptions.options;
		$.extend(options_,options);
		this.lastLayoutOptions = {layout:layout,options:options_};
		
		// var axes = options.axes;

		if(this.layout_cache) delete this.layout_cache;//clean up work files from last time a layout was run. layout.call() will 

		this.hasShortGridDimsSi 	= false;
		this.hasMediumGridDimsSi 	= false;
		this.boxAxisLengths 			= [0,0];//reset this value and reevalutate during layout build
		//this.boxAxisLessScrollMargin 	= [0,0];//reset this too?
		
		var b, c = this.boxCount
		//loop through data and create new objects
		for(var i = 0; i < c; i++){
			b = this.getBoxFromIndex(i);
			b.index=i;//moved here from initBoxes -- doing it here creates a sequential index regardless of calling insert or append.  watch out because index value will dynamicly change. 

			//this.layouts[layout](b,this,axes);
			layout.call(this,b,options_);
			
			//if this is the first item then we should get the calculated values for h,w and position
			// if(i==0){
			// 	//first item position starts at the end of the head scroll margin
			// 	this.firstItemPos = -this.scrollMargin[this.si];
			// 	this.bounceMargin = this.firstItemPos + this.bounceMarginDefault;
			// }

			/*
				- boxAxisLengths is an [x,y] array starting off as the content area bounding box -- but watch out because, in a rare act of desperation, it gets mutated later in this method.
				- the tail point values are equal to the start value plus the object dims plus margin. See Layouts.js for setting method.
			*/

			this.boxAxisLengths[0]=Math.max(this.boxAxisLengths[0],b.tailPointPos[0]);
			this.boxAxisLengths[1]=Math.max(this.boxAxisLengths[1],b.tailPointPos[1]);

		}//END for loop
// console.log('boxAxisLengths|tailPointPos ===>',this.boxAxisLengths[0],b.tailPointPos[0])


		//Handle an empty set of data.
		if(!b){
			this.hasData = false;
			var sorry = 'Tremula: Warning. No data found on layout operation.';
			if(console && console.error){console.info(sorry)}
			return sorry;
		}else{
			this.hasData = true;
		}



		//Set the actual content bounding box
		this.contentDims[this.si] = this.boxAxisLengths[this.si];// + this.scrollMargin[this.si];//scrollMargin is a negative number so basically, we are removing the scroll offset here.
		this.contentDims[this.si_] = this.boxAxisLengths[this.si_];
		

		/* 
			- scrollAxisAndMargin is the sum of head and tail scroll margins (as a negative number for some unremembered reason). 
			
			- gridDimsSiPlusScrollMargin is the total gridDims (containing element) *less* scrollAxisAndMargin

			- NOTE: we need to scroll if content is greater than gridDimsSiPlusScrollMargin.
				otherise, absScroll should always return to 0
			
			- SUPER NOTE: scrollMargin is used to prevent visibility of tail items in rubberband area of head 
				and also to prevent visibility of head items in rubberband area of tail.
				ScrollMargin needs to be sufficient to prevent this case
				there are also some weird scrolling ratios tied to these values in the input events block.
				Look there to as well if you are thinking of cleaning all this logic up.
		*/


		//create scrollMargin array from default values
		this.scrollMargin =[this.si_*this.scrollMarginDefault,this.si*this.scrollMarginDefault];//[-b.width*this.si_*this.scrollMarginFactor,-b.height*this.si*this.scrollMarginFactor];//should be based on size of first & last element
		// this.scrollMargin =[-b.width*this.si_*this.scrollMarginFactor,-b.height*this.si*this.scrollMarginFactor];//should be based on size of first & last element


		//set the firstItemPos.  This is used in the transport layer to determine head scroll target
		//trailingEdgeScrollPos sets this on the tail end.
		this.firstItemPos = -this.scrollMargin[this.si];
		
		//this is the amount of tight elastic we have at the ends of our content (used when snapping back during swipe)
		this.bounceMargin = this.firstItemPos + this.bounceMarginDefault;

		var scrollAxisAndMargin = -2*parseInt(this.scrollMargin[this.si]);
		var gridDimsSiPlusScrollMargin = this.gridDims[this.si]+scrollAxisAndMargin;


		//hasShortGridDimsSi is true if content scroll axis dimention is shorter than containing element  
		if(this.gridDims[this.si]>this.contentDims[this.si]){
			this.hasShortGridDimsSi = true;
		} else if(this.contentDims[this.si]<gridDimsSiPlusScrollMargin){
			this.hasMediumGridDimsSi = true;
		}

		
		//run short list compensation test (if hasShortGridDimsSi) before trailingEdgeScrollPos assignment
		//HACK WARNING:  this.boxAxisLengths[this.si] will be transformed to gridDimsSiPlusScrollMargin if hasShortGridDimsSi is true
		if(this.hasShortGridDimsSi){
			this.boxAxisLengths[this.si]=gridDimsSiPlusScrollMargin;
		}

		//if steppedScrolling is true then we will add extra scroll margin to the tail (so tail scrolling ends the stream to the center)
		var tailScrollAxisOffsetAmt = (this.steppedScrolling)?this.scrollAxisOffset*2:this.scrollAxisOffset;

		//cache the location of the trailing edge of the stream
		//if the content scroll dim is smaller than the scrolling gridDim then use that.
		this.trailingEdgeScrollPos = -(tailScrollAxisOffsetAmt)+ Math.min(
			this.getTrailingEdgeScrollPos()+(this.contentDims[this.si]-this.gridDims[this.si]),
			this.getTrailingEdgeScrollPos()
		);


		//this converts trailingEdgeScrollPos to an intuitive value where we measure scroll values from 0 by removing the scrollDims offset.
		this.absTrailingEdgeScrollPos = this.firstItemPos - this.trailingEdgeScrollPos;


		//IMPORTANT NOTE -->  run this medium list compansation test after trailingEdgeScrollPos assignment if hasShortGridDimsSi
		if(this.hasMediumGridDimsSi){
			this.boxAxisLengths[this.si]=gridDimsSiPlusScrollMargin;
		}


		//The scroll axis always equals the scroll axis
		//The cross axis always equals the cross axis count x constraint plus item margins
		this.currentGridContentDims[this.si]=this.boxAxisLengths[this.si];
		this.currentGridContentDims[this.si_]=(this.staticAxisCount+1)*(this.itemConstraint+(this.itemMargins[this.si_]*2));//+(this.itemMargins[this.si_]*2)  <add this back


		//set scroll to top if this is a new set of items
		if(options_.isNewSet){
			this.setAbsScrollPos(1);
			this.lastLayoutOptions.options.isNewSet = false;
		}



		this.oneShotPaint(1);
	}//setLayout()
	
	
	
	
	

	Grid.prototype.doTransition = function(layout,options,ms,easing,surfaceMap){
		options=(!options)?{}:options;
		// var axes = options.axes;
		
		if(isNaN(ms))ms=0;
		
		this.layoutXansEasing = easing || easeOutElastic;
		this.layoutXansMs = ms;//TODO: document& init this
		this.layoutIsXing = (ms>0)?true:false;//TODO: document& init this
		
		var that = this
		//if(this.ltTimer){clearTimeout(this.ltTimer);}//todo: get this going too...
		this.ltTimer = setTimeout(function(){
			that.layoutIsXing = false;
			that.ltTimer = null;
		}, ms+100)//TODO: document& init this
		
		//if(options.axis)options.staticAxisCount = options.axis;<=== this was moved to updateConfig()
		
		if(surfaceMap)
			this.setSurfaceMap(surfaceMap)

		this.updateConfig(options);
		
		this.setLayout(layout,options);
		
		
		//oneShotPaint(value) value is the axis position (i.e. the origin or where the touch event would be) of the transition event. NOTE: zero doesn't work
		this.oneShotPaint(1);//this.getScrollDimCenter()
	}



	

	Grid.prototype.getTrailingEdgeScrollPos = function(){
		//cache the location of the trailing edge of the stream
		return -this.boxAxisLengths[this.si]+this.firstItemPos+this.gridDims[this.si];
	}
	


	Grid.prototype.assignBoxObjects = function(){

		// vvv assignBoxObjects helpers

		function isOnFirstPage(b) {
			return ( b[this.sa] >= sMargin[si] && b[this.sa] <= (this.boxAxisLengths[si] + sMargin[si]) )?true:false;
		}
			
		function isInViewport(b) {
			return (
				soop[si] >= -(sMargin[0]+b.width+this.itemMargins[si]*2) && soop[si] <= (this.gridDims[si] - sMargin[si])
			)?true:false;
		}
		
		function invertNegSwing(x){
			if(x>=0) return x;
			return Math.abs( this.boxAxisLengths[si]+x );
		}


		
		// vvv assignBoxObjects vars

		var
			isChildEasing_l 	= false,
			that 				= this, //used for this.physicsLoopRAF call
			m 					= this.getScrollFrame(),
			si 					= this.si,
			si_ 				= this.si_,
			soo 				= [0,0], //scroll ordinal offset x/y matrix
			soop 				= [0,0], //scroll ordinal offset x/y matrix *OFFSET FOR PAINTING* This maps each "page" onto the current gridDims[this.sa]
			sMargin 		= this.scrollMargin; //scrollMargin extends viewport bounds so that object redraws and repositions happen offscreen
	


		// vvv assignBoxObjects iteration


		for(var i = 0; i < this.boxCount; i++){

			var b = this.boxes[i];
			
			//calculate the active axis value
			soo[si] = b.headPointPos[si] + m;
			//calculate the static axis value
			soo[si_] = b.headPointPos[si_];
			
			//update the scroll axis & cross axis values in the target obj
			b.setAbsPos(this.axisOffset[0] + soo[0], this.axisOffset[1] + soo[1]);
			
			//CALCULATE SCREEN POSITION
			//offset the scrollAxis by MOD of total length of the box objects.  origin value passthrough for non-scroll axis
			soop[0] = (this.sx)? b.x % this.boxAxisLengths[0] :b.x;
			soop[1] = (!this.sx)? b.y % this.boxAxisLengths[1] :b.y;
			
			//handle scrollAxis negativity in a positive context
			soop[si] = invertNegSwing.call(this,soop[si]);

			var itemPlusMarginDim = soop[si]+sMargin[si]+(b.dims[si]*.5)+this.itemMargins[si];
			var tailRamp = itemPlusMarginDim/this.gridDims[si];
			var headRamp = 1-tailRamp;
			var triangle = 2*((tailRamp<.5)?tailRamp:headRamp);
			//set DOM position
			if(
				isInViewport.call(this,b) 
				&& (this.isLooping || isOnFirstPage.call(this,b))
			){
				b.doOnScreen(true);
				b.setWaveforms({
					tailRamp:tailRamp,
					headRamp:headRamp,
					triangle:triangle
				});
				b.paintToSurfaceMap( soop[0]+sMargin[0], soop[1]+sMargin[1]);
				//b.updateContent();//this would ping the box object to update it's display based on current updated info
				//this.$dbug.append('--->');
			}else {
				b.doOnScreen(false);
				
				b.setWaveforms({
					tailRamp:false,
					headRamp:false,
					triangle:false
				});
			}
			

			//if this guy is still easing then let us know.
			if(b.isEasing)isChildEasing_l=true;//&&b.isOnScreen


			//this prevents item wrap around by determining is an object has scrolled off the page
			

		} // for this.boxCount
		
		this.isChildEasing = (isChildEasing_l)?true:false;
		
		
		//if the this.physicsLoopRAF is running -- then call it again
		if(this.physicsLoopRAF!==null){
			this.physicsLoopRAF = requestAnimationFrame( function(){that.assignBoxObjects()} );
		}
		
	}//Grid.prototype.assignBoxObjects
	
	


	var 
		mwEventsDetected = false,
		lastMwTime = new Date(),
		lastMahTime = new Date(),
		lastMoveAxisHold = '',
		fingeredOffset = 0,
		fingeredOffset_ = 0,
		lastD = 0,
		lastD_ = 0;
		
	//var touchHemisphere;//-1 if touching start in left field, +1 if in right field 

	function _mw(evt) {
		var that=this;
		
		lastMwTime = new Date();
		if(!mwEventsDetected){
			mwEventsDetected = true;
			var mwCheck = setInterval(function(){
				var now = new Date();
				
				if(now-lastMwTime>100){
					mwEventsDetected = false;
					// that.isTouching=false;
					//that.oneShotPaint();
					that.handleGesture({type:'release'})
					clearInterval(mwCheck);
				}
			},65)//mwCheck setInterval()
		}//!mwEventsDetected
	}//_mw()

	function shuntEvent(ev){
		(ev.preventDefault)?ev.preventDefault():ev.gesture.preventDefault();
		(ev.stopPropagation)?ev.stopPropagation():ev.gesture.stopPropagation();
	}



	Grid.prototype.handleGesture = function(ev){
		// if(window.isDragging) return;

		switch(ev.type) {

			case 'mousewheel':
			case 'DOMMouseScroll':
			case 'wheel':
				_mw.call(this,ev);
				//dont break here -- keep evaluation...
				
			case '_mw': //map events over for processing by dragleft

				var wheelEvent = ev;//ev.originalEvent;
				var //wheel events for webkit|| new moz || old moz
					dy = wheelEvent.wheelDeltaY*.5||-wheelEvent.deltaY||-wheelEvent.detail*3,
					dx = wheelEvent.wheelDeltaX*.5||-wheelEvent.deltaX||-wheelEvent.detail*3;

				var nextScrollPos = this.scrollPos + (this.sx)?dx:dy;
				var maxScroll = this.trailingEdgeScrollPos;

				//isNextHeadMargin and isNextTailMargin add massive drag to input to simulate rubberband tension in scrollFrame
				var isNextHeadMargin = !this.hasMediumGridDimsSi && nextScrollPos>this.firstItemPos;
				var isNextTailMargin = !this.hasMediumGridDimsSi && nextScrollPos<maxScroll;
				

				//   || this.isInHeadMargin
				//add scroll tension if looping is OFF and the very next tick is going to put us beyound the first item or the last item
				if(!this.isLooping && (isNextHeadMargin||isNextTailMargin) ){
					if(this.sx){
						dx=Math.min(dx*.1,100);
					}else{
						dy=Math.min(dy*.1,100);
					}
				}
				
				ev.gesture                  = ev.gesture || {};
				ev.gesture.deltaX           = dx;
				ev.gesture.deltaY           = dy;
				ev.gesture.center           = ev.gesture.center || {};
				ev.gesture.center.pageX = ev.pageX;//ev.originalEvent.pageX;
				ev.gesture.center.pageY = ev.pageY;//ev.originalEvent.pageY;
				//fingeredOffset = this.scrollPos; moved below...

				// if(this.isInHeadMargin){ev.gesture.deltaX = dx*.01}
				
				// ===>  NOTE: THERE IS NO BREAK HERE. MW EVENTS ARE NORMALIZED (as ev.gesture.*) ABOVE AND THEN PROCESSED AS DRAG EVENTS BELOW vvv
				
			case 'dragup':
			case 'dragdown':
			case 'dragright':
			case 'dragleft':


			// === manually block page scroll ===
			// if in horizontal config and the user is scrolling horizontally
			// or if in vertical config and the user is scrolling vertically

			
			if(ev.pointerType=="mouse"){
				
				ev.gesture.preventDefault();
				ev.gesture.stopPropagation();

			}else if(this.sx){//is horizontal config


				// if(ev.gesture.deltaX != 0){//this old bit was recently disabled
					if(Math.abs(ev.gesture.deltaY/ev.gesture.deltaX) <= 1){ // if this ratio is 1 or less then the user is scrolling the scroll axis: so block native events
						shuntEvent(ev);
					}
				// }

			}else{// is vertical config

				// if(ev.gesture.deltaY != 0){//this old bit was recently disabled -- not needed now?
					if(Math.abs(ev.gesture.deltaX/ev.gesture.deltaY) <= 1){ // if this ratio is 1 or less then the user is scrolling the scroll axis: so block native events
						shuntEvent(ev);
					}
				// }

			}// config case
			// === END: manually block page scroll  === 




				this.isTouching=true;
				
				//incase we are at the begining of a touch event or incase this is a fallthrough WheelEvent
				if(fingeredOffset==0 || /wheel|scroll/.test(ev.type)){
					fingeredOffset = this.scrollPos;
					lastD = 0;
				}
				// //incase we are at the begining of a touch event or incase this is a fallthrough WheelEvent
				// if(fingeredOffset_==0 ||  /wheel|scroll/.test(ev.type)){
				// 	fingeredOffset_ = this.parentParentE.scrollTop;
				// 	lastD_ = 0;
				// }
				
				var D = (this.sx)?ev.gesture.deltaX:ev.gesture.deltaY;
				var D_ = (!this.sx)?ev.gesture.deltaX:ev.gesture.deltaY;

				//if we are scrolling along the scrollaxis
				if(Math.abs(D)>Math.abs(D_)){
					this.setScrollPos( D-lastD, true );
					lastD = D;
					this.oneShotPaint(ev);
				}
				
	

				

				this.tagLastUserEvent(ev);
				break;
				
			case 'swipeleft':
				if(!this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;
				//var m = this.momentum = -this.dMomentum;
				var m = -ev.gesture.velocityX;

				if(this.steppedScrolling)
					this.easeToNextStepItem();
				else
					this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;

			case 'swiperight':
				if(!this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;

				var m = ev.gesture.velocityX;

				if(this.steppedScrolling)
					this.easeToPrevStepItem();
				else
					this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;
				
			case 'swipeup':
				if(this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;

				var m = -ev.gesture.velocityY;

				if(this.steppedScrolling)
					this.easeToNextStepItem();
				else
					this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;

			case 'swipedown':
				if(this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;
				//var m = this.momentum = this.dMomentum;
				var m = ev.gesture.velocityY;

				if(this.steppedScrolling)
					this.easeToPrevStepItem();
				else
					this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;
		
			case 'touch':
				//u.log('touch: '+new Date().getMilliseconds())
				fingeredOffset = 0;
				fingeredOffset_ = 0;
				this.isTouching=true;
				
				this.oneShotPaint(ev);

				this.tagLastUserEvent(ev);
				break;


			case 'release':
				//u.log('release: '+new Date().getMilliseconds())

				//test for last event being a touch AND being OVER x ms ago.  Also make sure we're not in the middle of easing.
				var lastUserEvtMs = new Date() - this.lastUserEvent.time;
				var lastWasTouch = /touch/.test(this.lastUserEvent.evt.type,'i');
				
				if(!this.isEasing && lastWasTouch && lastUserEvtMs < 1000){
					this.$e.trigger('tremulaItemSelect',ev);
				}

				this.isTouching=false;
				if(this.steppedScrolling){


					var lastWasLegalTouch =  lastWasTouch && ev.target && ev.target.className && !/\bgridBox\b/.test(ev.target.className);

					if(!lastWasTouch || lastWasLegalTouch){
						this.easeToClosestStepItem();
					};
				
				}else{
					this.oneShotPaint();
				}

				this.tagLastUserEvent(ev);
				break;                  
				
		}//switch

	}//handleGesture



	return Grid

});










/** 
*   TremulaJS 1.2.4 https://github.com/garris/TremulaJS
*   Copyright (C) 2014, Art.com 
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


requirejs.config({baseUrl: 'src'});//use this config line when building with almond.js



define('Tremula',[
	'Layouts'
	// ,'SurfaceMaps'
	,'Easings'
	,'DataAdapters'
	,'Projections'
	,'Grid'
],function(
	layouts
	// ,surfaceMaps
	,easings
	,dataAdapters
	,projections
	,Grid
){


	var Tremula = function(){
		this.Grid 					= {};
		this.dataAdapters 	= dataAdapters;
		this.layouts 				= layouts;
		this.easings 				= easings;
		this.projections 		= projections;
		this.cache = {};//for instance parameters
		this.updateConfig = function(){console && console.error && console.error('Tremula is not initalized. Request ignored.')};
		this.toggleScrollAxis = function(){console && console.error && console.error('Tremula is not initalized. Request ignored.')};
	}


	Tremula.prototype.resize = function(evt){
		if(this.$e[0].offsetWidth==0) return;//if the Tremula container does not have any width then there is no need to do any resizing
		this.Grid.setScrollAxis();
		this.Grid.setLayout();
		this.Grid.oneShotPaint();
	}	

	Tremula.prototype.appendData = function(data,dataAdapter){
		this.Grid.initBoxes(data,dataAdapter,true);
		this.cache.endOfScrollFlag = false;
	}

	Tremula.prototype.insertData = function(data,dataAdapter){
		this.Grid.initBoxes(data,dataAdapter,'insert');
		this.cache.endOfScrollFlag = false;
	}

	Tremula.prototype.refreshData = function(data,dataAdapter){
		this.Grid.initBoxes(data,dataAdapter,false);
		this.cache.endOfScrollFlag = false;
	}

	Tremula.prototype.tailScroll = function(){
		var g = this.Grid;
		g.setLastTouchOrigin(g.gridDims[g.si]/2);
		g.easeTo(g.getScrollPos()-(g.getScrollViewDim()*.50),800)
	}

	Tremula.prototype.headScroll = function(){
		var g = this.Grid;
		g.setLastTouchOrigin(g.gridDims[g.si]/2);
		g.easeTo(g.getScrollPos()+(g.getScrollViewDim()*.50),800)
	}

	Tremula.prototype.setOnChangePub = function(cb){
		this.Grid.onChangePub = cb;
	};



	Tremula.prototype.init = function($e,options,parent){

		var that = this;
		this.parent = parent||null;
		if($e) this.$e = $e||null;


		var defaults = {
			onChangePub             :null,
			adapter 								:dataAdapters.TremulaItem,
			isLooping 							:false,
			ignoreUserEvents				:false,
			surfaceMap 							:projections.streamHorizontal,
			itemPreloading      		:false,
			itemEasing              :false,
			itemEasingParams    		:{
				touchCurve  						:easings.easeOutCubic,
				swipeCurve  						:easings.easeOutCubic,
				transitionCurve					:easings.easeOutCubic,
				easeTime        				:500,
				springLimit 						:20 //in px
															 },
			scrollAxis 							:'x',
			itemConstraint 					:null,
			staticAxisCount 				:0
		}
		
		var gridOptions = $.extend({},defaults,options||{})
		
		this.Grid = new Grid($e,gridOptions,this)
		
		this.updateConfig = this.Grid.updateConfig;
		this.toggleScrollAxis = this.Grid.toggleScrollAxis;
		
		if(options&&options.data)
			this.Grid.initBoxes(options.data,options.adapter);
		
		
		$(window).on('resize',function(evt){
			that.resize(evt);
		});

		
		if(!gridOptions.ignoreUserEvents){ //setup event listening unless we want to ignoreUserEvents

			var fanEvents =new Hammer($e[0],{prevent_default: false});
			fanEvents.on('dragdown dragup dragleft dragright swipeleft swipeup swipedown swiperight touch release tap',function(evt){that.Grid.handleGesture(evt)});
			fanEvents.on('mousewheel wheel DOMMouseScroll', function(evt){that.Grid.handleGesture(evt);})


			var ltme = {time:null,evt:null};//LTME ==> last touchmove event
			var deltaX,deltaY;
			this.$e.bind('touchmove',function(evt){

				//IMPORTANT: DO NOT DO THIS --> evt.stopPropagation();// <-- we still actually want this to propegate (otherwise it wont make it to Hammer).

				if(that.Grid.sx){//if config'd horizontally
					if(ltme.time){ //test if our last event is part of the same gesture
					// if(ltme.time && (new Date())-ltme.time<250){ //test if our last event is part of the same gesture
						deltaX = evt.originalEvent.pageX-ltme.evt.pageX;
						deltaY = evt.originalEvent.pageY-ltme.evt.pageY;

						if(deltaX!=0){
							if(Math.abs(deltaY/deltaX) <= 1){//if this ratio is 1 or less then the user is scrolling the scroll axis: so block native events
								evt.preventDefault();
							}
						}

					}else{ //need to trap the touchmove event until we get a reliable measurement
						evt.preventDefault();
					}
				
				}else{//if config'd vertically

					if(ltme.time){ //test if our last event is part of the same gesture
						deltaX = evt.originalEvent.pageX-ltme.evt.pageX;
						deltaY = evt.originalEvent.pageY-ltme.evt.pageY;

						if(deltaY!=0){
							if(Math.abs(deltaX/deltaY) <= 1){//if this ratio is 1 or less then the user is scrolling the scroll axis: so block native events
								evt.preventDefault();
							}
						}

					}else{ //need to trap the touchmove event until we get a reliable measurement
						evt.preventDefault();
					}

				}

				// console.log(  ltme.time && (new Date())-ltme.time<250   );				
				ltme = {time:new Date,evt:evt.originalEvent};

			});

		}//if (!ignoreUserEvents)

	}//init()









	function imageLoaded(e){
		var $e = $(e);
		if($e.hasClass('loaded'))return;
		$e.addClass('loaded');
		setTimeout(function(){$e.parents('.gridBox').addClass('loaded')},1500);//this is a little ape-y but whatever. see Box.prototype.doOnScreen() method for some context.
	}

	if(!window.imageLoaded)
		window.imageLoaded = imageLoaded;

	window.Tremula = Tremula;
	return Tremula;

})

   ;
require(["Tremula"]);
}());