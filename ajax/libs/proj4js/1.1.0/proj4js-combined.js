/*
  proj4js.js -- Javascript reprojection library. 
  
  Authors:      Mike Adair madairATdmsolutions.ca
                Richard Greenwood richATgreenwoodmap.com
                Didier Richard didier.richardATign.fr
                Stephen Irons stephen.ironsATclear.net.nz
                Olivier Terral oterralATgmail.com
                
  License:      
 Copyright (c) 2012, Mike Adair, Richard Greenwood, Didier Richard, 
                     Stephen Irons and Olivier Terral

 Permission is hereby granted, free of charge, to any person obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 DEALINGS IN THE SOFTWARE.
 
 Note: This program is an almost direct port of the C library PROJ.4.
*/
/* ======================================================================
    proj4js.js
   ====================================================================== */

/*
Author:       Mike Adair madairATdmsolutions.ca
              Richard Greenwood rich@greenwoodmap.com
License:      LGPL as per: http://www.gnu.org/copyleft/lesser.html

$Id: Proj.js 2956 2007-07-09 12:17:52Z steven $
*/

/**
 * Namespace: Proj4js
 *
 * Proj4js is a JavaScript library to transform point coordinates from one 
 * coordinate system to another, including datum transformations.
 *
 * This library is a port of both the Proj.4 and GCTCP C libraries to JavaScript. 
 * Enabling these transformations in the browser allows geographic data stored 
 * in different projections to be combined in browser-based web mapping 
 * applications.
 * 
 * Proj4js must have access to coordinate system initialization strings (which
 * are the same as for PROJ.4 command line).  Thes can be included in your 
 * application using a <script> tag or Proj4js can load CS initialization 
 * strings from a local directory or a web service such as spatialreference.org.
 *
 * Similarly, Proj4js must have access to projection transform code.  These can
 * be included individually using a <script> tag in your page, built into a 
 * custom build of Proj4js or loaded dynamically at run-time.  Using the
 * -combined and -compressed versions of Proj4js includes all projection class
 * code by default.
 *
 * Note that dynamic loading of defs and code happens ascynchrously, check the
 * Proj.readyToUse flag before using the Proj object.  If the defs and code
 * required by your application are loaded through script tags, dynamic loading
 * is not required and the Proj object will be readyToUse on return from the 
 * constructor.
 * 
 * All coordinates are handled as points which have a .x and a .y property
 * which will be modified in place.
 *
 * Override Proj4js.reportError for output of alerts and warnings.
 *
 * See http://trac.osgeo.org/proj4js/wiki/UserGuide for full details.
*/

/**
 * Global namespace object for Proj4js library
 */
var Proj4js = {

    /**
     * Property: defaultDatum
     * The datum to use when no others a specified
     */
    defaultDatum: 'WGS84',                  //default datum

    /** 
    * Method: transform(source, dest, point)
    * Transform a point coordinate from one map projection to another.  This is
    * really the only public method you should need to use.
    *
    * Parameters:
    * source - {Proj4js.Proj} source map projection for the transformation
    * dest - {Proj4js.Proj} destination map projection for the transformation
    * point - {Object} point to transform, may be geodetic (long, lat) or
    *     projected Cartesian (x,y), but should always have x,y properties.
    */
    transform: function(source, dest, point) {
        if (!source.readyToUse) {
            this.reportError("Proj4js initialization for:"+source.srsCode+" not yet complete");
            return point;
        }
        if (!dest.readyToUse) {
            this.reportError("Proj4js initialization for:"+dest.srsCode+" not yet complete");
            return point;
        }
        
        // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
        if (source.datum && dest.datum && (
            ((source.datum.datum_type == Proj4js.common.PJD_3PARAM || source.datum.datum_type == Proj4js.common.PJD_7PARAM) && dest.datumCode != "WGS84") ||
            ((dest.datum.datum_type == Proj4js.common.PJD_3PARAM || dest.datum.datum_type == Proj4js.common.PJD_7PARAM) && source.datumCode != "WGS84"))) {
            var wgs84 = Proj4js.WGS84;
            this.transform(source, wgs84, point);
            source = wgs84;
        }

        // DGR, 2010/11/12
        if (source.axis!="enu") {
            this.adjust_axis(source,false,point);
        }

        // Transform source points to long/lat, if they aren't already.
        if ( source.projName=="longlat") {
            point.x *= Proj4js.common.D2R;  // convert degrees to radians
            point.y *= Proj4js.common.D2R;
        } else {
            if (source.to_meter) {
                point.x *= source.to_meter;
                point.y *= source.to_meter;
            }
            source.inverse(point); // Convert Cartesian to longlat
        }

        // Adjust for the prime meridian if necessary
        if (source.from_greenwich) { 
            point.x += source.from_greenwich; 
        }

        // Convert datums if needed, and if possible.
        point = this.datum_transform( source.datum, dest.datum, point );

        // Adjust for the prime meridian if necessary
        if (dest.from_greenwich) {
            point.x -= dest.from_greenwich;
        }

        if( dest.projName=="longlat" ) {             
            // convert radians to decimal degrees
            point.x *= Proj4js.common.R2D;
            point.y *= Proj4js.common.R2D;
        } else  {               // else project
            dest.forward(point);
            if (dest.to_meter) {
                point.x /= dest.to_meter;
                point.y /= dest.to_meter;
            }
        }

        // DGR, 2010/11/12
        if (dest.axis!="enu") {
            this.adjust_axis(dest,true,point);
        }

        return point;
    }, // transform()

    /** datum_transform()
      source coordinate system definition,
      destination coordinate system definition,
      point to transform in geodetic coordinates (long, lat, height)
    */
    datum_transform : function( source, dest, point ) {

      // Short cut if the datums are identical.
      if( source.compare_datums( dest ) ) {
          return point; // in this case, zero is sucess,
                    // whereas cs_compare_datums returns 1 to indicate TRUE
                    // confusing, should fix this
      }

      // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
      if( source.datum_type == Proj4js.common.PJD_NODATUM
          || dest.datum_type == Proj4js.common.PJD_NODATUM) {
          return point;
      }

      // Do we need to go through geocentric coordinates?
      if( source.es != dest.es || source.a != dest.a
          || source.datum_type == Proj4js.common.PJD_3PARAM
          || source.datum_type == Proj4js.common.PJD_7PARAM
          || dest.datum_type == Proj4js.common.PJD_3PARAM
          || dest.datum_type == Proj4js.common.PJD_7PARAM)
      {

        // Convert to geocentric coordinates.
        source.geodetic_to_geocentric( point );
        // CHECK_RETURN;

        // Convert between datums
        if( source.datum_type == Proj4js.common.PJD_3PARAM || source.datum_type == Proj4js.common.PJD_7PARAM ) {
          source.geocentric_to_wgs84(point);
          // CHECK_RETURN;
        }

        if( dest.datum_type == Proj4js.common.PJD_3PARAM || dest.datum_type == Proj4js.common.PJD_7PARAM ) {
          dest.geocentric_from_wgs84(point);
          // CHECK_RETURN;
        }

        // Convert back to geodetic coordinates
        dest.geocentric_to_geodetic( point );
          // CHECK_RETURN;
      }

      return point;
    }, // cs_datum_transform

    /**
     * Function: adjust_axis
     * Normalize or de-normalized the x/y/z axes.  The normal form is "enu"
     * (easting, northing, up).
     * Parameters:
     * crs {Proj4js.Proj} the coordinate reference system
     * denorm {Boolean} when false, normalize
     * point {Object} the coordinates to adjust
     */
    adjust_axis: function(crs, denorm, point) {
        var xin= point.x, yin= point.y, zin= point.z || 0.0;
        var v, t;
        for (var i= 0; i<3; i++) {
            if (denorm && i==2 && point.z===undefined) { continue; }
                 if (i==0) { v= xin; t= 'x'; }
            else if (i==1) { v= yin; t= 'y'; }
            else           { v= zin; t= 'z'; }
            switch(crs.axis[i]) {
            case 'e':
                point[t]= v;
                break;
            case 'w':
                point[t]= -v;
                break;
            case 'n':
                point[t]= v;
                break;
            case 's':
                point[t]= -v;
                break;
            case 'u':
                if (point[t]!==undefined) { point.z= v; }
                break;
            case 'd':
                if (point[t]!==undefined) { point.z= -v; }
                break;
            default :
                alert("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
                return null;
            }
        }
        return point;
    },

    /**
     * Function: reportError
     * An internal method to report errors back to user. 
     * Override this in applications to report error messages or throw exceptions.
     */
    reportError: function(msg) {
      //console.log(msg);
    },

/**
 *
 * Title: Private Methods
 * The following properties and methods are intended for internal use only.
 *
 * This is a minimal implementation of JavaScript inheritance methods so that 
 * Proj4js can be used as a stand-alone library.
 * These are copies of the equivalent OpenLayers methods at v2.7
 */
 
/**
 * Function: extend
 * Copy all properties of a source object to a destination object.  Modifies
 *     the passed in destination object.  Any properties on the source object
 *     that are set to undefined will not be (re)set on the destination object.
 *
 * Parameters:
 * destination - {Object} The object that will be modified
 * source - {Object} The object with properties to be set on the destination
 *
 * Returns:
 * {Object} The destination object.
 */
    extend: function(destination, source) {
      destination = destination || {};
      if(source) {
          for(var property in source) {
              var value = source[property];
              if(value !== undefined) {
                  destination[property] = value;
              }
          }
      }
      return destination;
    },

/**
 * Constructor: Class
 * Base class used to construct all other classes. Includes support for 
 *     multiple inheritance. 
 *  
 */
    Class: function() {
      var Class = function() {
          this.initialize.apply(this, arguments);
      };
  
      var extended = {};
      var parent;
      for(var i=0; i<arguments.length; ++i) {
          if(typeof arguments[i] == "function") {
              // get the prototype of the superclass
              parent = arguments[i].prototype;
          } else {
              // in this case we're extending with the prototype
              parent = arguments[i];
          }
          Proj4js.extend(extended, parent);
      }
      Class.prototype = extended;
      
      return Class;
    },

    /**
     * Function: bind
     * Bind a function to an object.  Method to easily create closures with
     *     'this' altered.
     * 
     * Parameters:
     * func - {Function} Input function.
     * object - {Object} The object to bind to the input function (as this).
     * 
     * Returns:
     * {Function} A closure with 'this' set to the passed in object.
     */
    bind: function(func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function() {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(
                Array.prototype.slice.apply(arguments, [0])
            );
            return func.apply(object, newArgs);
        };
    },
    
/**
 * The following properties and methods handle dynamic loading of JSON objects.
 */
 
    /**
     * Property: scriptName
     * {String} The filename of this script without any path.
     */
    scriptName: "proj4js-combined.js",

    /**
     * Property: defsLookupService
     * AJAX service to retreive projection definition parameters from
     */
    defsLookupService: 'http://spatialreference.org/ref',

    /**
     * Property: libPath
     * internal: http server path to library code.
     */
    libPath: null,

    /**
     * Function: getScriptLocation
     * Return the path to this script.
     *
     * Returns:
     * Path to this script
     */
    getScriptLocation: function () {
        if (this.libPath) return this.libPath;
        var scriptName = this.scriptName;
        var scriptNameLen = scriptName.length;

        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute('src');
            if (src) {
                var index = src.lastIndexOf(scriptName);
                // is it found, at the end of the URL?
                if ((index > -1) && (index + scriptNameLen == src.length)) {
                    this.libPath = src.slice(0, -scriptNameLen);
                    break;
                }
            }
        }
        return this.libPath||"";
    },

    /**
     * Function: loadScript
     * Load a JS file from a URL into a <script> tag in the page.
     * 
     * Parameters:
     * url - {String} The URL containing the script to load
     * onload - {Function} A method to be executed when the script loads successfully
     * onfail - {Function} A method to be executed when there is an error loading the script
     * loadCheck - {Function} A boolean method that checks to see if the script 
     *            has loaded.  Typically this just checks for the existance of
     *            an object in the file just loaded.
     */
    loadScript: function(url, onload, onfail, loadCheck) {
      var script = document.createElement('script');
      script.defer = false;
      script.type = "text/javascript";
      script.id = url;
      script.src = url;
      script.onload = onload;
      script.onerror = onfail;
      script.loadCheck = loadCheck;
      if (/MSIE/.test(navigator.userAgent)) {
        script.onreadystatechange = this.checkReadyState;
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    
    /**
     * Function: checkReadyState
     * IE workaround since there is no onerror handler.  Calls the user defined 
     * loadCheck method to determine if the script is loaded.
     * 
     */
    checkReadyState: function() {
      if (this.readyState == 'loaded') {
        if (!this.loadCheck()) {
          this.onerror();
        } else {
          this.onload();
        }
      }
    }
};

/**
 * Class: Proj4js.Proj
 *
 * Proj objects provide transformation methods for point coordinates
 * between geodetic latitude/longitude and a projected coordinate system. 
 * once they have been initialized with a projection code.
 *
 * Initialization of Proj objects is with a projection code, usually EPSG codes,
 * which is the key that will be used with the Proj4js.defs array.
 * 
 * The code passed in will be stripped of colons and converted to uppercase
 * to locate projection definition files.
 *
 * A projection object has properties for units and title strings.
 */
Proj4js.Proj = Proj4js.Class({

  /**
   * Property: readyToUse
   * Flag to indicate if initialization is complete for this Proj object
   */
  readyToUse: false,   
  
  /**
   * Property: title
   * The title to describe the projection
   */
  title: null,  
  
  /**
   * Property: projName
   * The projection class for this projection, e.g. lcc (lambert conformal conic,
   * or merc for mercator).  These are exactly equivalent to their Proj4 
   * counterparts.
   */
  projName: null,
  /**
   * Property: units
   * The units of the projection.  Values include 'm' and 'degrees'
   */
  units: null,
  /**
   * Property: datum
   * The datum specified for the projection
   */
  datum: null,
  /**
   * Property: x0
   * The x coordinate origin
   */
  x0: 0,
  /**
   * Property: y0
   * The y coordinate origin
   */
  y0: 0,
  /**
   * Property: localCS
   * Flag to indicate if the projection is a local one in which no transforms
   * are required.
   */
  localCS: false,

  /**
  * Property: queue
  * Buffer (FIFO) to hold callbacks waiting to be called when projection loaded.
  */
  queue: null,

  /**
  * Constructor: initialize
  * Constructor for Proj4js.Proj objects
  *
  * Parameters:
  * srsCode - a code for map projection definition parameters.  These are usually
  * (but not always) EPSG codes.
  */
  initialize: function(srsCode, callback) {
      this.srsCodeInput = srsCode;
      
      //Register callbacks prior to attempting to process definition
      this.queue = [];
      if( callback ){
           this.queue.push( callback );
      }
      
      //check to see if this is a WKT string
      if ((srsCode.indexOf('GEOGCS') >= 0) ||
          (srsCode.indexOf('GEOCCS') >= 0) ||
          (srsCode.indexOf('PROJCS') >= 0) ||
          (srsCode.indexOf('LOCAL_CS') >= 0)) {
            this.parseWKT(srsCode);
            this.deriveConstants();
            this.loadProjCode(this.projName);
            return;
      }
      
      // DGR 2008-08-03 : support urn and url
      if (srsCode.indexOf('urn:') == 0) {
          //urn:ORIGINATOR:def:crs:CODESPACE:VERSION:ID
          var urn = srsCode.split(':');
          if ((urn[1] == 'ogc' || urn[1] =='x-ogc') &&
              (urn[2] =='def') &&
              (urn[3] =='crs')) {
              srsCode = urn[4]+':'+urn[urn.length-1];
          }
      } else if (srsCode.indexOf('http://') == 0) {
          //url#ID
          var url = srsCode.split('#');
          if (url[0].match(/epsg.org/)) {
            // http://www.epsg.org/#
            srsCode = 'EPSG:'+url[1];
          } else if (url[0].match(/RIG.xml/)) {
            //http://librairies.ign.fr/geoportail/resources/RIG.xml#
            //http://interop.ign.fr/registers/ign/RIG.xml#
            srsCode = 'IGNF:'+url[1];
          }
      }
      this.srsCode = srsCode.toUpperCase();
      if (this.srsCode.indexOf("EPSG") == 0) {
          this.srsCode = this.srsCode;
          this.srsAuth = 'epsg';
          this.srsProjNumber = this.srsCode.substring(5);
      // DGR 2007-11-20 : authority IGNF
      } else if (this.srsCode.indexOf("IGNF") == 0) {
          this.srsCode = this.srsCode;
          this.srsAuth = 'IGNF';
          this.srsProjNumber = this.srsCode.substring(5);
      // DGR 2008-06-19 : pseudo-authority CRS for WMS
      } else if (this.srsCode.indexOf("CRS") == 0) {
          this.srsCode = this.srsCode;
          this.srsAuth = 'CRS';
          this.srsProjNumber = this.srsCode.substring(4);
      } else {
          this.srsAuth = '';
          this.srsProjNumber = this.srsCode;
      }
      
      this.loadProjDefinition();
  },
  
/**
 * Function: loadProjDefinition
 *    Loads the coordinate system initialization string if required.
 *    Note that dynamic loading happens asynchronously so an application must 
 *    wait for the readyToUse property is set to true.
 *    To prevent dynamic loading, include the defs through a script tag in
 *    your application.
 *
 */
    loadProjDefinition: function() {
      //check in memory
      if (Proj4js.defs[this.srsCode]) {
        this.defsLoaded();
        return;
      }

      //else check for def on the server
      var url = Proj4js.getScriptLocation() + 'defs/' + this.srsAuth.toUpperCase() + this.srsProjNumber + '.js';
      Proj4js.loadScript(url, 
                Proj4js.bind(this.defsLoaded, this),
                Proj4js.bind(this.loadFromService, this),
                Proj4js.bind(this.checkDefsLoaded, this) );
    },

/**
 * Function: loadFromService
 *    Creates the REST URL for loading the definition from a web service and 
 *    loads it.
 *
 */
    loadFromService: function() {
      //else load from web service
      var url = Proj4js.defsLookupService +'/' + this.srsAuth +'/'+ this.srsProjNumber + '/proj4js/';
      Proj4js.loadScript(url, 
            Proj4js.bind(this.defsLoaded, this),
            Proj4js.bind(this.defsFailed, this),
            Proj4js.bind(this.checkDefsLoaded, this) );
    },

/**
 * Function: defsLoaded
 * Continues the Proj object initilization once the def file is loaded
 *
 */
    defsLoaded: function() {
      this.parseDefs();
      this.loadProjCode(this.projName);
    },
    
/**
 * Function: checkDefsLoaded
 *    This is the loadCheck method to see if the def object exists
 *
 */
    checkDefsLoaded: function() {
      if (Proj4js.defs[this.srsCode]) {
        return true;
      } else {
        return false;
      }
    },

 /**
 * Function: defsFailed
 *    Report an error in loading the defs file, but continue on using WGS84
 *
 */
   defsFailed: function() {
      Proj4js.reportError('failed to load projection definition for: '+this.srsCode);
      Proj4js.defs[this.srsCode] = Proj4js.defs['WGS84'];  //set it to something so it can at least continue
      this.defsLoaded();
    },

/**
 * Function: loadProjCode
 *    Loads projection class code dynamically if required.
 *     Projection code may be included either through a script tag or in
 *     a built version of proj4js
 *
 */
    loadProjCode: function(projName) {
      if (Proj4js.Proj[projName]) {
        this.initTransforms();
        return;
      }

      //the URL for the projection code
      var url = Proj4js.getScriptLocation() + 'projCode/' + projName + '.js';
      Proj4js.loadScript(url, 
              Proj4js.bind(this.loadProjCodeSuccess, this, projName),
              Proj4js.bind(this.loadProjCodeFailure, this, projName), 
              Proj4js.bind(this.checkCodeLoaded, this, projName) );
    },

 /**
 * Function: loadProjCodeSuccess
 *    Loads any proj dependencies or continue on to final initialization.
 *
 */
    loadProjCodeSuccess: function(projName) {
      if (Proj4js.Proj[projName].dependsOn){
        this.loadProjCode(Proj4js.Proj[projName].dependsOn);
      } else {
        this.initTransforms();
      }
    },

 /**
 * Function: defsFailed
 *    Report an error in loading the proj file.  Initialization of the Proj
 *    object has failed and the readyToUse flag will never be set.
 *
 */
    loadProjCodeFailure: function(projName) {
      Proj4js.reportError("failed to find projection file for: " + projName);
      //TBD initialize with identity transforms so proj will still work?
    },
    
/**
 * Function: checkCodeLoaded
 *    This is the loadCheck method to see if the projection code is loaded
 *
 */
    checkCodeLoaded: function(projName) {
      if (Proj4js.Proj[projName]) {
        return true;
      } else {
        return false;
      }
    },

/**
 * Function: initTransforms
 *    Finalize the initialization of the Proj object
 *
 */
    initTransforms: function() {
      Proj4js.extend(this, Proj4js.Proj[this.projName]);
      this.init();
      this.readyToUse = true;
      if( this.queue ) {
        var item;
        while( (item = this.queue.shift()) ) {
          item.call( this, this );
        }
      }
  },

/**
 * Function: parseWKT
 * Parses a WKT string to get initialization parameters
 *
 */
 wktRE: /^(\w+)\[(.*)\]$/,
 parseWKT: function(wkt) {
    var wktMatch = wkt.match(this.wktRE);
    if (!wktMatch) return;
    var wktObject = wktMatch[1];
    var wktContent = wktMatch[2];
    var wktTemp = wktContent.split(",");
    var wktName;
    if (wktObject.toUpperCase() == "TOWGS84") {
      wktName = wktObject;  //no name supplied for the TOWGS84 array
    } else {
      wktName = wktTemp.shift();
    }
    wktName = wktName.replace(/^\"/,"");
    wktName = wktName.replace(/\"$/,"");
    
    /*
    wktContent = wktTemp.join(",");
    var wktArray = wktContent.split("],");
    for (var i=0; i<wktArray.length-1; ++i) {
      wktArray[i] += "]";
    }
    */
    
    var wktArray = new Array();
    var bkCount = 0;
    var obj = "";
    for (var i=0; i<wktTemp.length; ++i) {
      var token = wktTemp[i];
      for (var j=0; j<token.length; ++j) {
        if (token.charAt(j) == "[") ++bkCount;
        if (token.charAt(j) == "]") --bkCount;
      }
      obj += token;
      if (bkCount === 0) {
        wktArray.push(obj);
        obj = "";
      } else {
        obj += ",";
      }
    }
    
    //do something based on the type of the wktObject being parsed
    //add in variations in the spelling as required
    switch (wktObject) {
      case 'LOCAL_CS':
        this.projName = 'identity'
        this.localCS = true;
        this.srsCode = wktName;
        break;
      case 'GEOGCS':
        this.projName = 'longlat'
        this.geocsCode = wktName;
        if (!this.srsCode) this.srsCode = wktName;
        break;
      case 'PROJCS':
        this.srsCode = wktName;
        break;
      case 'GEOCCS':
        break;
      case 'PROJECTION':
        this.projName = Proj4js.wktProjections[wktName]
        break;
      case 'DATUM':
        this.datumName = wktName;
        break;
      case 'LOCAL_DATUM':
        this.datumCode = 'none';
        break;
      case 'SPHEROID':
        this.ellps = wktName;
        this.a = parseFloat(wktArray.shift());
        this.rf = parseFloat(wktArray.shift());
        break;
      case 'PRIMEM':
        this.from_greenwich = parseFloat(wktArray.shift()); //to radians?
        break;
      case 'UNIT':
        this.units = wktName;
        this.unitsPerMeter = parseFloat(wktArray.shift());
        break;
      case 'PARAMETER':
        var name = wktName.toLowerCase();
        var value = parseFloat(wktArray.shift());
        //there may be many variations on the wktName values, add in case
        //statements as required
        switch (name) {
          case 'false_easting':
            this.x0 = value;
            break;
          case 'false_northing':
            this.y0 = value;
            break;
          case 'scale_factor':
            this.k0 = value;
            break;
          case 'central_meridian':
            this.long0 = value*Proj4js.common.D2R;
            break;
          case 'latitude_of_origin':
            this.lat0 = value*Proj4js.common.D2R;
            break;
          case 'more_here':
            break;
          default:
            break;
        }
        break;
      case 'TOWGS84':
        this.datum_params = wktArray;
        break;
      //DGR 2010-11-12: AXIS
      case 'AXIS':
        var name= wktName.toLowerCase();
        var value= wktArray.shift();
        switch (value) {
          case 'EAST' : value= 'e'; break;
          case 'WEST' : value= 'w'; break;
          case 'NORTH': value= 'n'; break;
          case 'SOUTH': value= 's'; break;
          case 'UP'   : value= 'u'; break;
          case 'DOWN' : value= 'd'; break;
          case 'OTHER':
          default     : value= ' '; break;//FIXME
        }
        if (!this.axis) { this.axis= "enu"; }
        switch(name) {
          case 'x': this.axis=                         value + this.axis.substr(1,2); break;
          case 'y': this.axis= this.axis.substr(0,1) + value + this.axis.substr(2,1); break;
          case 'z': this.axis= this.axis.substr(0,2) + value                        ; break;
          default : break;
        }
      case 'MORE_HERE':
        break;
      default:
        break;
    }
    for (var i=0; i<wktArray.length; ++i) {
      this.parseWKT(wktArray[i]);
    }
 },

/**
 * Function: parseDefs
 * Parses the PROJ.4 initialization string and sets the associated properties.
 *
 */
  parseDefs: function() {
      this.defData = Proj4js.defs[this.srsCode];
      var paramName, paramVal;
      if (!this.defData) {
        return;
      }
      var paramArray=this.defData.split("+");

      for (var prop=0; prop<paramArray.length; prop++) {
          var property = paramArray[prop].split("=");
          paramName = property[0].toLowerCase();
          paramVal = property[1];

          switch (paramName.replace(/\s/gi,"")) {  // trim out spaces
              case "": break;   // throw away nameless parameter
              case "title":  this.title = paramVal; break;
              case "proj":   this.projName =  paramVal.replace(/\s/gi,""); break;
              case "units":  this.units = paramVal.replace(/\s/gi,""); break;
              case "datum":  this.datumCode = paramVal.replace(/\s/gi,""); break;
              case "nadgrids": this.nagrids = paramVal.replace(/\s/gi,""); break;
              case "ellps":  this.ellps = paramVal.replace(/\s/gi,""); break;
              case "a":      this.a =  parseFloat(paramVal); break;  // semi-major radius
              case "b":      this.b =  parseFloat(paramVal); break;  // semi-minor radius
              // DGR 2007-11-20
              case "rf":     this.rf = parseFloat(paramVal); break; // inverse flattening rf= a/(a-b)
              case "lat_0":  this.lat0 = paramVal*Proj4js.common.D2R; break;        // phi0, central latitude
              case "lat_1":  this.lat1 = paramVal*Proj4js.common.D2R; break;        //standard parallel 1
              case "lat_2":  this.lat2 = paramVal*Proj4js.common.D2R; break;        //standard parallel 2
              case "lat_ts": this.lat_ts = paramVal*Proj4js.common.D2R; break;      // used in merc and eqc
              case "lon_0":  this.long0 = paramVal*Proj4js.common.D2R; break;       // lam0, central longitude
              case "alpha":  this.alpha =  parseFloat(paramVal)*Proj4js.common.D2R; break;  //for somerc projection
              case "lonc":   this.longc = paramVal*Proj4js.common.D2R; break;       //for somerc projection
              case "x_0":    this.x0 = parseFloat(paramVal); break;  // false easting
              case "y_0":    this.y0 = parseFloat(paramVal); break;  // false northing
              case "k_0":    this.k0 = parseFloat(paramVal); break;  // projection scale factor
              case "k":      this.k0 = parseFloat(paramVal); break;  // both forms returned
              case "r_a":    this.R_A = true; break;                 // sphere--area of ellipsoid
              case "zone":   this.zone = parseInt(paramVal,10); break;  // UTM Zone
              case "south":   this.utmSouth = true; break;  // UTM north/south
              case "towgs84":this.datum_params = paramVal.split(","); break;
              case "to_meter": this.to_meter = parseFloat(paramVal); break; // cartesian scaling
              case "from_greenwich": this.from_greenwich = paramVal*Proj4js.common.D2R; break;
              // DGR 2008-07-09 : if pm is not a well-known prime meridian take
              // the value instead of 0.0, then convert to radians
              case "pm":     paramVal = paramVal.replace(/\s/gi,"");
                             this.from_greenwich = Proj4js.PrimeMeridian[paramVal] ?
                                Proj4js.PrimeMeridian[paramVal] : parseFloat(paramVal);
                             this.from_greenwich *= Proj4js.common.D2R; 
                             break;
              // DGR 2010-11-12: axis
              case "axis":   paramVal = paramVal.replace(/\s/gi,"");
                             var legalAxis= "ewnsud";
                             if (paramVal.length==3 &&
                                 legalAxis.indexOf(paramVal.substr(0,1))!=-1 &&
                                 legalAxis.indexOf(paramVal.substr(1,1))!=-1 &&
                                 legalAxis.indexOf(paramVal.substr(2,1))!=-1) {
                                this.axis= paramVal;
                             } //FIXME: be silent ?
                             break
              case "no_defs": break; 
              default: //alert("Unrecognized parameter: " + paramName);
          } // switch()
      } // for paramArray
      this.deriveConstants();
  },

/**
 * Function: deriveConstants
 * Sets several derived constant values and initialization of datum and ellipse
 *     parameters.
 *
 */
  deriveConstants: function() {
      if (this.nagrids == '@null') this.datumCode = 'none';
      if (this.datumCode && this.datumCode != 'none') {
        var datumDef = Proj4js.Datum[this.datumCode];
        if (datumDef) {
          this.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(',') : null;
          this.ellps = datumDef.ellipse;
          this.datumName = datumDef.datumName ? datumDef.datumName : this.datumCode;
        }
      }
      if (!this.a) {    // do we have an ellipsoid?
          var ellipse = Proj4js.Ellipsoid[this.ellps] ? Proj4js.Ellipsoid[this.ellps] : Proj4js.Ellipsoid['WGS84'];
          Proj4js.extend(this, ellipse);
      }
      if (this.rf && !this.b) this.b = (1.0 - 1.0/this.rf) * this.a;
      if (this.rf === 0 || Math.abs(this.a - this.b)<Proj4js.common.EPSLN) {
        this.sphere = true;
        this.b= this.a;
      }
      this.a2 = this.a * this.a;          // used in geocentric
      this.b2 = this.b * this.b;          // used in geocentric
      this.es = (this.a2-this.b2)/this.a2;  // e ^ 2
      this.e = Math.sqrt(this.es);        // eccentricity
      if (this.R_A) {
        this.a *= 1. - this.es * (Proj4js.common.SIXTH + this.es * (Proj4js.common.RA4 + this.es * Proj4js.common.RA6));
        this.a2 = this.a * this.a;
        this.b2 = this.b * this.b;
        this.es = 0.;
      }
      this.ep2=(this.a2-this.b2)/this.b2; // used in geocentric
      if (!this.k0) this.k0 = 1.0;    //default value
      //DGR 2010-11-12: axis
      if (!this.axis) { this.axis= "enu"; }

      this.datum = new Proj4js.datum(this);
  }
});

Proj4js.Proj.longlat = {
  init: function() {
    //no-op for longlat
  },
  forward: function(pt) {
    //identity transform
    return pt;
  },
  inverse: function(pt) {
    //identity transform
    return pt;
  }
};
Proj4js.Proj.identity = Proj4js.Proj.longlat;

/**
  Proj4js.defs is a collection of coordinate system definition objects in the 
  PROJ.4 command line format.
  Generally a def is added by means of a separate .js file for example:

    <SCRIPT type="text/javascript" src="defs/EPSG26912.js"></SCRIPT>

  def is a CS definition in PROJ.4 WKT format, for example:
    +proj="tmerc"   //longlat, etc.
    +a=majorRadius
    +b=minorRadius
    +lat0=somenumber
    +long=somenumber
*/
Proj4js.defs = {
  // These are so widely used, we'll go ahead and throw them in
  // without requiring a separate .js file
  'WGS84': "+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
  'EPSG:4326': "+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees",
  'EPSG:4269': "+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees",
  'EPSG:3875': "+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
};
Proj4js.defs['EPSG:3785'] = Proj4js.defs['EPSG:3875'];  //maintain backward compat, official code is 3875
Proj4js.defs['GOOGLE'] = Proj4js.defs['EPSG:3875'];
Proj4js.defs['EPSG:900913'] = Proj4js.defs['EPSG:3875'];
Proj4js.defs['EPSG:102113'] = Proj4js.defs['EPSG:3875'];

Proj4js.common = {
  PI : 3.141592653589793238, //Math.PI,
  HALF_PI : 1.570796326794896619, //Math.PI*0.5,
  TWO_PI : 6.283185307179586477, //Math.PI*2,
  FORTPI : 0.78539816339744833,
  R2D : 57.29577951308232088,
  D2R : 0.01745329251994329577,
  SEC_TO_RAD : 4.84813681109535993589914102357e-6, /* SEC_TO_RAD = Pi/180/3600 */
  EPSLN : 1.0e-10,
  MAX_ITER : 20,
  // following constants from geocent.c
  COS_67P5 : 0.38268343236508977,  /* cosine of 67.5 degrees */
  AD_C : 1.0026000,                /* Toms region 1 constant */

  /* datum_type values */
  PJD_UNKNOWN  : 0,
  PJD_3PARAM   : 1,
  PJD_7PARAM   : 2,
  PJD_GRIDSHIFT: 3,
  PJD_WGS84    : 4,   // WGS84 or equivalent
  PJD_NODATUM  : 5,   // WGS84 or equivalent
  SRS_WGS84_SEMIMAJOR : 6378137.0,  // only used in grid shift transforms

  // ellipoid pj_set_ell.c
  SIXTH : .1666666666666666667, /* 1/6 */
  RA4   : .04722222222222222222, /* 17/360 */
  RA6   : .02215608465608465608, /* 67/3024 */
  RV4   : .06944444444444444444, /* 5/72 */
  RV6   : .04243827160493827160, /* 55/1296 */

// Function to compute the constant small m which is the radius of
//   a parallel of latitude, phi, divided by the semimajor axis.
// -----------------------------------------------------------------
  msfnz : function(eccent, sinphi, cosphi) {
      var con = eccent * sinphi;
      return cosphi/(Math.sqrt(1.0 - con * con));
  },

// Function to compute the constant small t for use in the forward
//   computations in the Lambert Conformal Conic and the Polar
//   Stereographic projections.
// -----------------------------------------------------------------
  tsfnz : function(eccent, phi, sinphi) {
    var con = eccent * sinphi;
    var com = .5 * eccent;
    con = Math.pow(((1.0 - con) / (1.0 + con)), com);
    return (Math.tan(.5 * (this.HALF_PI - phi))/con);
  },

// Function to compute the latitude angle, phi2, for the inverse of the
//   Lambert Conformal Conic and Polar Stereographic projections.
// ----------------------------------------------------------------
  phi2z : function(eccent, ts) {
    var eccnth = .5 * eccent;
    var con, dphi;
    var phi = this.HALF_PI - 2 * Math.atan(ts);
    for (var i = 0; i <= 15; i++) {
      con = eccent * Math.sin(phi);
      dphi = this.HALF_PI - 2 * Math.atan(ts *(Math.pow(((1.0 - con)/(1.0 + con)),eccnth))) - phi;
      phi += dphi;
      if (Math.abs(dphi) <= .0000000001) return phi;
    }
    alert("phi2z has NoConvergence");
    return (-9999);
  },

/* Function to compute constant small q which is the radius of a 
   parallel of latitude, phi, divided by the semimajor axis. 
------------------------------------------------------------*/
  qsfnz : function(eccent,sinphi) {
    var con;
    if (eccent > 1.0e-7) {
      con = eccent * sinphi;
      return (( 1.0- eccent * eccent) * (sinphi /(1.0 - con * con) - (.5/eccent)*Math.log((1.0 - con)/(1.0 + con))));
    } else {
      return(2.0 * sinphi);
    }
  },

/* Function to eliminate roundoff errors in asin
----------------------------------------------*/
  asinz : function(x) {
    if (Math.abs(x)>1.0) {
      x=(x>1.0)?1.0:-1.0;
    }
    return Math.asin(x);
  },

// following functions from gctpc cproj.c for transverse mercator projections
  e0fn : function(x) {return(1.0-0.25*x*(1.0+x/16.0*(3.0+1.25*x)));},
  e1fn : function(x) {return(0.375*x*(1.0+0.25*x*(1.0+0.46875*x)));},
  e2fn : function(x) {return(0.05859375*x*x*(1.0+0.75*x));},
  e3fn : function(x) {return(x*x*x*(35.0/3072.0));},
  mlfn : function(e0,e1,e2,e3,phi) {return(e0*phi-e1*Math.sin(2.0*phi)+e2*Math.sin(4.0*phi)-e3*Math.sin(6.0*phi));},

  srat : function(esinp, exp) {
    return(Math.pow((1.0-esinp)/(1.0+esinp), exp));
  },

// Function to return the sign of an argument
  sign : function(x) { if (x < 0.0) return(-1); else return(1);},

// Function to adjust longitude to -180 to 180; input in radians
  adjust_lon : function(x) {
    x = (Math.abs(x) < this.PI) ? x: (x - (this.sign(x)*this.TWO_PI) );
    return x;
  },

// IGNF - DGR : algorithms used by IGN France

// Function to adjust latitude to -90 to 90; input in radians
  adjust_lat : function(x) {
    x= (Math.abs(x) < this.HALF_PI) ? x: (x - (this.sign(x)*this.PI) );
    return x;
  },

// Latitude Isometrique - close to tsfnz ...
  latiso : function(eccent, phi, sinphi) {
    if (Math.abs(phi) > this.HALF_PI) return +Number.NaN;
    if (phi==this.HALF_PI) return Number.POSITIVE_INFINITY;
    if (phi==-1.0*this.HALF_PI) return -1.0*Number.POSITIVE_INFINITY;

    var con= eccent*sinphi;
    return Math.log(Math.tan((this.HALF_PI+phi)/2.0))+eccent*Math.log((1.0-con)/(1.0+con))/2.0;
  },

  fL : function(x,L) {
    return 2.0*Math.atan(x*Math.exp(L)) - this.HALF_PI;
  },

// Inverse Latitude Isometrique - close to ph2z
  invlatiso : function(eccent, ts) {
    var phi= this.fL(1.0,ts);
    var Iphi= 0.0;
    var con= 0.0;
    do {
      Iphi= phi;
      con= eccent*Math.sin(Iphi);
      phi= this.fL(Math.exp(eccent*Math.log((1.0+con)/(1.0-con))/2.0),ts)
    } while (Math.abs(phi-Iphi)>1.0e-12);
    return phi;
  },

// Needed for Gauss Schreiber
// Original:  Denis Makarov (info@binarythings.com)
// Web Site:  http://www.binarythings.com
  sinh : function(x)
  {
    var r= Math.exp(x);
    r= (r-1.0/r)/2.0;
    return r;
  },

  cosh : function(x)
  {
    var r= Math.exp(x);
    r= (r+1.0/r)/2.0;
    return r;
  },

  tanh : function(x)
  {
    var r= Math.exp(x);
    r= (r-1.0/r)/(r+1.0/r);
    return r;
  },

  asinh : function(x)
  {
    var s= (x>= 0? 1.0:-1.0);
    return s*(Math.log( Math.abs(x) + Math.sqrt(x*x+1.0) ));
  },

  acosh : function(x)
  {
    return 2.0*Math.log(Math.sqrt((x+1.0)/2.0) + Math.sqrt((x-1.0)/2.0));
  },

  atanh : function(x)
  {
    return Math.log((x-1.0)/(x+1.0))/2.0;
  },

// Grande Normale
  gN : function(a,e,sinphi)
  {
    var temp= e*sinphi;
    return a/Math.sqrt(1.0 - temp*temp);
  },
  
  //code from the PROJ.4 pj_mlfn.c file;  this may be useful for other projections
  pj_enfn: function(es) {
    var en = new Array();
    en[0] = this.C00 - es * (this.C02 + es * (this.C04 + es * (this.C06 + es * this.C08)));
    en[1] = es * (this.C22 - es * (this.C04 + es * (this.C06 + es * this.C08)));
    var t = es * es;
    en[2] = t * (this.C44 - es * (this.C46 + es * this.C48));
    t *= es;
    en[3] = t * (this.C66 - es * this.C68);
    en[4] = t * es * this.C88;
    return en;
  },
  
  pj_mlfn: function(phi, sphi, cphi, en) {
    cphi *= sphi;
    sphi *= sphi;
    return(en[0] * phi - cphi * (en[1] + sphi*(en[2]+ sphi*(en[3] + sphi*en[4]))));
  },
  
  pj_inv_mlfn: function(arg, es, en) {
    var k = 1./(1.-es);
    var phi = arg;
    for (var i = Proj4js.common.MAX_ITER; i ; --i) { /* rarely goes over 2 iterations */
      var s = Math.sin(phi);
      var t = 1. - es * s * s;
      //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
      //phi -= t * (t * Math.sqrt(t)) * k;
      t = (this.pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
      phi -= t;
      if (Math.abs(t) < Proj4js.common.EPSLN)
        return phi;
    }
    Proj4js.reportError("cass:pj_inv_mlfn: Convergence error");
    return phi;
  },

/* meridinal distance for ellipsoid and inverse
**	8th degree - accurate to < 1e-5 meters when used in conjuction
**		with typical major axis values.
**	Inverse determines phi to EPS (1e-11) radians, about 1e-6 seconds.
*/
  C00: 1.0,
  C02: .25,
  C04: .046875,
  C06: .01953125,
  C08: .01068115234375,
  C22: .75,
  C44: .46875,
  C46: .01302083333333333333,
  C48: .00712076822916666666,
  C66: .36458333333333333333,
  C68: .00569661458333333333,
  C88: .3076171875  

};

/** datum object
*/
Proj4js.datum = Proj4js.Class({

  initialize : function(proj) {
    this.datum_type = Proj4js.common.PJD_WGS84;   //default setting
    if (proj.datumCode && proj.datumCode == 'none') {
      this.datum_type = Proj4js.common.PJD_NODATUM;
    }
    if (proj && proj.datum_params) {
      for (var i=0; i<proj.datum_params.length; i++) {
        proj.datum_params[i]=parseFloat(proj.datum_params[i]);
      }
      if (proj.datum_params[0] != 0 || proj.datum_params[1] != 0 || proj.datum_params[2] != 0 ) {
        this.datum_type = Proj4js.common.PJD_3PARAM;
      }
      if (proj.datum_params.length > 3) {
        if (proj.datum_params[3] != 0 || proj.datum_params[4] != 0 ||
            proj.datum_params[5] != 0 || proj.datum_params[6] != 0 ) {
          this.datum_type = Proj4js.common.PJD_7PARAM;
          proj.datum_params[3] *= Proj4js.common.SEC_TO_RAD;
          proj.datum_params[4] *= Proj4js.common.SEC_TO_RAD;
          proj.datum_params[5] *= Proj4js.common.SEC_TO_RAD;
          proj.datum_params[6] = (proj.datum_params[6]/1000000.0) + 1.0;
        }
      }
    }
    if (proj) {
      this.a = proj.a;    //datum object also uses these values
      this.b = proj.b;
      this.es = proj.es;
      this.ep2 = proj.ep2;
      this.datum_params = proj.datum_params;
    }
  },

  /****************************************************************/
  // cs_compare_datums()
  //   Returns TRUE if the two datums match, otherwise FALSE.
  compare_datums : function( dest ) {
    if( this.datum_type != dest.datum_type ) {
      return false; // false, datums are not equal
    } else if( this.a != dest.a || Math.abs(this.es-dest.es) > 0.000000000050 ) {
      // the tolerence for es is to ensure that GRS80 and WGS84
      // are considered identical
      return false;
    } else if( this.datum_type == Proj4js.common.PJD_3PARAM ) {
      return (this.datum_params[0] == dest.datum_params[0]
              && this.datum_params[1] == dest.datum_params[1]
              && this.datum_params[2] == dest.datum_params[2]);
    } else if( this.datum_type == Proj4js.common.PJD_7PARAM ) {
      return (this.datum_params[0] == dest.datum_params[0]
              && this.datum_params[1] == dest.datum_params[1]
              && this.datum_params[2] == dest.datum_params[2]
              && this.datum_params[3] == dest.datum_params[3]
              && this.datum_params[4] == dest.datum_params[4]
              && this.datum_params[5] == dest.datum_params[5]
              && this.datum_params[6] == dest.datum_params[6]);
    } else if ( this.datum_type == Proj4js.common.PJD_GRIDSHIFT ||
                dest.datum_type == Proj4js.common.PJD_GRIDSHIFT ) {
      alert("ERROR: Grid shift transformations are not implemented.");
      return false
    } else {
      return true; // datums are equal
    }
  }, // cs_compare_datums()

  /*
   * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
   * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
   * according to the current ellipsoid parameters.
   *
   *    Latitude  : Geodetic latitude in radians                     (input)
   *    Longitude : Geodetic longitude in radians                    (input)
   *    Height    : Geodetic height, in meters                       (input)
   *    X         : Calculated Geocentric X coordinate, in meters    (output)
   *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
   *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
   *
   */
  geodetic_to_geocentric : function(p) {
    var Longitude = p.x;
    var Latitude = p.y;
    var Height = p.z ? p.z : 0;   //Z value not always supplied
    var X;  // output
    var Y;
    var Z;

    var Error_Code=0;  //  GEOCENT_NO_ERROR;
    var Rn;            /*  Earth radius at location  */
    var Sin_Lat;       /*  Math.sin(Latitude)  */
    var Sin2_Lat;      /*  Square of Math.sin(Latitude)  */
    var Cos_Lat;       /*  Math.cos(Latitude)  */

    /*
    ** Don't blow up if Latitude is just a little out of the value
    ** range as it may just be a rounding issue.  Also removed longitude
    ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
    */
    if( Latitude < -Proj4js.common.HALF_PI && Latitude > -1.001 * Proj4js.common.HALF_PI ) {
        Latitude = -Proj4js.common.HALF_PI;
    } else if( Latitude > Proj4js.common.HALF_PI && Latitude < 1.001 * Proj4js.common.HALF_PI ) {
        Latitude = Proj4js.common.HALF_PI;
    } else if ((Latitude < -Proj4js.common.HALF_PI) || (Latitude > Proj4js.common.HALF_PI)) {
      /* Latitude out of range */
      Proj4js.reportError('geocent:lat out of range:'+Latitude);
      return null;
    }

    if (Longitude > Proj4js.common.PI) Longitude -= (2*Proj4js.common.PI);
    Sin_Lat = Math.sin(Latitude);
    Cos_Lat = Math.cos(Latitude);
    Sin2_Lat = Sin_Lat * Sin_Lat;
    Rn = this.a / (Math.sqrt(1.0e0 - this.es * Sin2_Lat));
    X = (Rn + Height) * Cos_Lat * Math.cos(Longitude);
    Y = (Rn + Height) * Cos_Lat * Math.sin(Longitude);
    Z = ((Rn * (1 - this.es)) + Height) * Sin_Lat;

    p.x = X;
    p.y = Y;
    p.z = Z;
    return Error_Code;
  }, // cs_geodetic_to_geocentric()


  geocentric_to_geodetic : function (p) {
/* local defintions and variables */
/* end-criterium of loop, accuracy of sin(Latitude) */
var genau = 1.E-12;
var genau2 = (genau*genau);
var maxiter = 30;

    var P;        /* distance between semi-minor axis and location */
    var RR;       /* distance between center and location */
    var CT;       /* sin of geocentric latitude */
    var ST;       /* cos of geocentric latitude */
    var RX;
    var RK;
    var RN;       /* Earth radius at location */
    var CPHI0;    /* cos of start or old geodetic latitude in iterations */
    var SPHI0;    /* sin of start or old geodetic latitude in iterations */
    var CPHI;     /* cos of searched geodetic latitude */
    var SPHI;     /* sin of searched geodetic latitude */
    var SDPHI;    /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
    var At_Pole;     /* indicates location is in polar region */
    var iter;        /* # of continous iteration, max. 30 is always enough (s.a.) */

    var X = p.x;
    var Y = p.y;
    var Z = p.z ? p.z : 0.0;   //Z value not always supplied
    var Longitude;
    var Latitude;
    var Height;

    At_Pole = false;
    P = Math.sqrt(X*X+Y*Y);
    RR = Math.sqrt(X*X+Y*Y+Z*Z);

/*      special cases for latitude and longitude */
    if (P/this.a < genau) {

/*  special case, if P=0. (X=0., Y=0.) */
        At_Pole = true;
        Longitude = 0.0;

/*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
 *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
        if (RR/this.a < genau) {
            Latitude = Proj4js.common.HALF_PI;
            Height   = -this.b;
            return;
        }
    } else {
/*  ellipsoidal (geodetic) longitude
 *  interval: -PI < Longitude <= +PI */
        Longitude=Math.atan2(Y,X);
    }

/* --------------------------------------------------------------
 * Following iterative algorithm was developped by
 * "Institut fï¿½r Erdmessung", University of Hannover, July 1988.
 * Internet: www.ife.uni-hannover.de
 * Iterative computation of CPHI,SPHI and Height.
 * Iteration of CPHI and SPHI to 10**-12 radian resp.
 * 2*10**-7 arcsec.
 * --------------------------------------------------------------
 */
    CT = Z/RR;
    ST = P/RR;
    RX = 1.0/Math.sqrt(1.0-this.es*(2.0-this.es)*ST*ST);
    CPHI0 = ST*(1.0-this.es)*RX;
    SPHI0 = CT*RX;
    iter = 0;

/* loop to find sin(Latitude) resp. Latitude
 * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
    do
    {
        iter++;
        RN = this.a/Math.sqrt(1.0-this.es*SPHI0*SPHI0);

/*  ellipsoidal (geodetic) height */
        Height = P*CPHI0+Z*SPHI0-RN*(1.0-this.es*SPHI0*SPHI0);

        RK = this.es*RN/(RN+Height);
        RX = 1.0/Math.sqrt(1.0-RK*(2.0-RK)*ST*ST);
        CPHI = ST*(1.0-RK)*RX;
        SPHI = CT*RX;
        SDPHI = SPHI*CPHI0-CPHI*SPHI0;
        CPHI0 = CPHI;
        SPHI0 = SPHI;
    }
    while (SDPHI*SDPHI > genau2 && iter < maxiter);

/*      ellipsoidal (geodetic) latitude */
    Latitude=Math.atan(SPHI/Math.abs(CPHI));

    p.x = Longitude;
    p.y = Latitude;
    p.z = Height;
    return p;
  }, // cs_geocentric_to_geodetic()

  /** Convert_Geocentric_To_Geodetic
   * The method used here is derived from 'An Improved Algorithm for
   * Geocentric to Geodetic Coordinate Conversion', by Ralph Toms, Feb 1996
   */
  geocentric_to_geodetic_noniter : function (p) {
    var X = p.x;
    var Y = p.y;
    var Z = p.z ? p.z : 0;   //Z value not always supplied
    var Longitude;
    var Latitude;
    var Height;

    var W;        /* distance from Z axis */
    var W2;       /* square of distance from Z axis */
    var T0;       /* initial estimate of vertical component */
    var T1;       /* corrected estimate of vertical component */
    var S0;       /* initial estimate of horizontal component */
    var S1;       /* corrected estimate of horizontal component */
    var Sin_B0;   /* Math.sin(B0), B0 is estimate of Bowring aux variable */
    var Sin3_B0;  /* cube of Math.sin(B0) */
    var Cos_B0;   /* Math.cos(B0) */
    var Sin_p1;   /* Math.sin(phi1), phi1 is estimated latitude */
    var Cos_p1;   /* Math.cos(phi1) */
    var Rn;       /* Earth radius at location */
    var Sum;      /* numerator of Math.cos(phi1) */
    var At_Pole;  /* indicates location is in polar region */

    X = parseFloat(X);  // cast from string to float
    Y = parseFloat(Y);
    Z = parseFloat(Z);

    At_Pole = false;
    if (X != 0.0)
    {
        Longitude = Math.atan2(Y,X);
    }
    else
    {
        if (Y > 0)
        {
            Longitude = Proj4js.common.HALF_PI;
        }
        else if (Y < 0)
        {
            Longitude = -Proj4js.common.HALF_PI;
        }
        else
        {
            At_Pole = true;
            Longitude = 0.0;
            if (Z > 0.0)
            {  /* north pole */
                Latitude = Proj4js.common.HALF_PI;
            }
            else if (Z < 0.0)
            {  /* south pole */
                Latitude = -Proj4js.common.HALF_PI;
            }
            else
            {  /* center of earth */
                Latitude = Proj4js.common.HALF_PI;
                Height = -this.b;
                return;
            }
        }
    }
    W2 = X*X + Y*Y;
    W = Math.sqrt(W2);
    T0 = Z * Proj4js.common.AD_C;
    S0 = Math.sqrt(T0 * T0 + W2);
    Sin_B0 = T0 / S0;
    Cos_B0 = W / S0;
    Sin3_B0 = Sin_B0 * Sin_B0 * Sin_B0;
    T1 = Z + this.b * this.ep2 * Sin3_B0;
    Sum = W - this.a * this.es * Cos_B0 * Cos_B0 * Cos_B0;
    S1 = Math.sqrt(T1*T1 + Sum * Sum);
    Sin_p1 = T1 / S1;
    Cos_p1 = Sum / S1;
    Rn = this.a / Math.sqrt(1.0 - this.es * Sin_p1 * Sin_p1);
    if (Cos_p1 >= Proj4js.common.COS_67P5)
    {
        Height = W / Cos_p1 - Rn;
    }
    else if (Cos_p1 <= -Proj4js.common.COS_67P5)
    {
        Height = W / -Cos_p1 - Rn;
    }
    else
    {
        Height = Z / Sin_p1 + Rn * (this.es - 1.0);
    }
    if (At_Pole == false)
    {
        Latitude = Math.atan(Sin_p1 / Cos_p1);
    }

    p.x = Longitude;
    p.y = Latitude;
    p.z = Height;
    return p;
  }, // geocentric_to_geodetic_noniter()

  /****************************************************************/
  // pj_geocentic_to_wgs84( p )
  //  p = point to transform in geocentric coordinates (x,y,z)
  geocentric_to_wgs84 : function ( p ) {

    if( this.datum_type == Proj4js.common.PJD_3PARAM )
    {
      // if( x[io] == HUGE_VAL )
      //    continue;
      p.x += this.datum_params[0];
      p.y += this.datum_params[1];
      p.z += this.datum_params[2];

    }
    else if (this.datum_type == Proj4js.common.PJD_7PARAM)
    {
      var Dx_BF =this.datum_params[0];
      var Dy_BF =this.datum_params[1];
      var Dz_BF =this.datum_params[2];
      var Rx_BF =this.datum_params[3];
      var Ry_BF =this.datum_params[4];
      var Rz_BF =this.datum_params[5];
      var M_BF  =this.datum_params[6];
      // if( x[io] == HUGE_VAL )
      //    continue;
      var x_out = M_BF*(       p.x - Rz_BF*p.y + Ry_BF*p.z) + Dx_BF;
      var y_out = M_BF*( Rz_BF*p.x +       p.y - Rx_BF*p.z) + Dy_BF;
      var z_out = M_BF*(-Ry_BF*p.x + Rx_BF*p.y +       p.z) + Dz_BF;
      p.x = x_out;
      p.y = y_out;
      p.z = z_out;
    }
  }, // cs_geocentric_to_wgs84

  /****************************************************************/
  // pj_geocentic_from_wgs84()
  //  coordinate system definition,
  //  point to transform in geocentric coordinates (x,y,z)
  geocentric_from_wgs84 : function( p ) {

    if( this.datum_type == Proj4js.common.PJD_3PARAM )
    {
      //if( x[io] == HUGE_VAL )
      //    continue;
      p.x -= this.datum_params[0];
      p.y -= this.datum_params[1];
      p.z -= this.datum_params[2];

    }
    else if (this.datum_type == Proj4js.common.PJD_7PARAM)
    {
      var Dx_BF =this.datum_params[0];
      var Dy_BF =this.datum_params[1];
      var Dz_BF =this.datum_params[2];
      var Rx_BF =this.datum_params[3];
      var Ry_BF =this.datum_params[4];
      var Rz_BF =this.datum_params[5];
      var M_BF  =this.datum_params[6];
      var x_tmp = (p.x - Dx_BF) / M_BF;
      var y_tmp = (p.y - Dy_BF) / M_BF;
      var z_tmp = (p.z - Dz_BF) / M_BF;
      //if( x[io] == HUGE_VAL )
      //    continue;

      p.x =        x_tmp + Rz_BF*y_tmp - Ry_BF*z_tmp;
      p.y = -Rz_BF*x_tmp +       y_tmp + Rx_BF*z_tmp;
      p.z =  Ry_BF*x_tmp - Rx_BF*y_tmp +       z_tmp;
    } //cs_geocentric_from_wgs84()
  }
});

/** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
Proj4js.Point = Proj4js.Class({

    /**
     * Constructor: Proj4js.Point
     *
     * Parameters:
     * - x {float} or {Array} either the first coordinates component or
     *     the full coordinates
     * - y {float} the second component
     * - z {float} the third component, optional.
     */
    initialize : function(x,y,z) {
      if (typeof x == 'object') {
        this.x = x[0];
        this.y = x[1];
        this.z = x[2] || 0.0;
      } else if (typeof x == 'string' && typeof y == 'undefined') {
        var coords = x.split(',');
        this.x = parseFloat(coords[0]);
        this.y = parseFloat(coords[1]);
        this.z = parseFloat(coords[2]) || 0.0;
      } else {
        this.x = x;
        this.y = y;
        this.z = z || 0.0;
      }
    },

    /**
     * APIMethod: clone
     * Build a copy of a Proj4js.Point object.
     *
     * Return:
     * {Proj4js}.Point the cloned point.
     */
    clone : function() {
      return new Proj4js.Point(this.x, this.y, this.z);
    },

    /**
     * APIMethod: toString
     * Return a readable string version of the point
     *
     * Return:
     * {String} String representation of Proj4js.Point object. 
     *           (ex. <i>"x=5,y=42"</i>)
     */
    toString : function() {
        return ("x=" + this.x + ",y=" + this.y);
    },

    /** 
     * APIMethod: toShortString
     * Return a short string version of the point.
     *
     * Return:
     * {String} Shortened String representation of Proj4js.Point object. 
     *         (ex. <i>"5, 42"</i>)
     */
    toShortString : function() {
        return (this.x + ", " + this.y);
    }
});

Proj4js.PrimeMeridian = {
    "greenwich": 0.0,               //"0dE",
    "lisbon":     -9.131906111111,   //"9d07'54.862\"W",
    "paris":       2.337229166667,   //"2d20'14.025\"E",
    "bogota":    -74.080916666667,  //"74d04'51.3\"W",
    "madrid":     -3.687938888889,  //"3d41'16.58\"W",
    "rome":       12.452333333333,  //"12d27'8.4\"E",
    "bern":        7.439583333333,  //"7d26'22.5\"E",
    "jakarta":   106.807719444444,  //"106d48'27.79\"E",
    "ferro":     -17.666666666667,  //"17d40'W",
    "brussels":    4.367975,        //"4d22'4.71\"E",
    "stockholm":  18.058277777778,  //"18d3'29.8\"E",
    "athens":     23.7163375,       //"23d42'58.815\"E",
    "oslo":       10.722916666667   //"10d43'22.5\"E"
};

Proj4js.Ellipsoid = {
  "MERIT": {a:6378137.0, rf:298.257, ellipseName:"MERIT 1983"},
  "SGS85": {a:6378136.0, rf:298.257, ellipseName:"Soviet Geodetic System 85"},
  "GRS80": {a:6378137.0, rf:298.257222101, ellipseName:"GRS 1980(IUGG, 1980)"},
  "IAU76": {a:6378140.0, rf:298.257, ellipseName:"IAU 1976"},
  "airy": {a:6377563.396, b:6356256.910, ellipseName:"Airy 1830"},
  "APL4.": {a:6378137, rf:298.25, ellipseName:"Appl. Physics. 1965"},
  "NWL9D": {a:6378145.0, rf:298.25, ellipseName:"Naval Weapons Lab., 1965"},
  "mod_airy": {a:6377340.189, b:6356034.446, ellipseName:"Modified Airy"},
  "andrae": {a:6377104.43, rf:300.0, ellipseName:"Andrae 1876 (Den., Iclnd.)"},
  "aust_SA": {a:6378160.0, rf:298.25, ellipseName:"Australian Natl & S. Amer. 1969"},
  "GRS67": {a:6378160.0, rf:298.2471674270, ellipseName:"GRS 67(IUGG 1967)"},
  "bessel": {a:6377397.155, rf:299.1528128, ellipseName:"Bessel 1841"},
  "bess_nam": {a:6377483.865, rf:299.1528128, ellipseName:"Bessel 1841 (Namibia)"},
  "clrk66": {a:6378206.4, b:6356583.8, ellipseName:"Clarke 1866"},
  "clrk80": {a:6378249.145, rf:293.4663, ellipseName:"Clarke 1880 mod."},
  "CPM": {a:6375738.7, rf:334.29, ellipseName:"Comm. des Poids et Mesures 1799"},
  "delmbr": {a:6376428.0, rf:311.5, ellipseName:"Delambre 1810 (Belgium)"},
  "engelis": {a:6378136.05, rf:298.2566, ellipseName:"Engelis 1985"},
  "evrst30": {a:6377276.345, rf:300.8017, ellipseName:"Everest 1830"},
  "evrst48": {a:6377304.063, rf:300.8017, ellipseName:"Everest 1948"},
  "evrst56": {a:6377301.243, rf:300.8017, ellipseName:"Everest 1956"},
  "evrst69": {a:6377295.664, rf:300.8017, ellipseName:"Everest 1969"},
  "evrstSS": {a:6377298.556, rf:300.8017, ellipseName:"Everest (Sabah & Sarawak)"},
  "fschr60": {a:6378166.0, rf:298.3, ellipseName:"Fischer (Mercury Datum) 1960"},
  "fschr60m": {a:6378155.0, rf:298.3, ellipseName:"Fischer 1960"},
  "fschr68": {a:6378150.0, rf:298.3, ellipseName:"Fischer 1968"},
  "helmert": {a:6378200.0, rf:298.3, ellipseName:"Helmert 1906"},
  "hough": {a:6378270.0, rf:297.0, ellipseName:"Hough"},
  "intl": {a:6378388.0, rf:297.0, ellipseName:"International 1909 (Hayford)"},
  "kaula": {a:6378163.0, rf:298.24, ellipseName:"Kaula 1961"},
  "lerch": {a:6378139.0, rf:298.257, ellipseName:"Lerch 1979"},
  "mprts": {a:6397300.0, rf:191.0, ellipseName:"Maupertius 1738"},
  "new_intl": {a:6378157.5, b:6356772.2, ellipseName:"New International 1967"},
  "plessis": {a:6376523.0, rf:6355863.0, ellipseName:"Plessis 1817 (France)"},
  "krass": {a:6378245.0, rf:298.3, ellipseName:"Krassovsky, 1942"},
  "SEasia": {a:6378155.0, b:6356773.3205, ellipseName:"Southeast Asia"},
  "walbeck": {a:6376896.0, b:6355834.8467, ellipseName:"Walbeck"},
  "WGS60": {a:6378165.0, rf:298.3, ellipseName:"WGS 60"},
  "WGS66": {a:6378145.0, rf:298.25, ellipseName:"WGS 66"},
  "WGS72": {a:6378135.0, rf:298.26, ellipseName:"WGS 72"},
  "WGS84": {a:6378137.0, rf:298.257223563, ellipseName:"WGS 84"},
  "sphere": {a:6370997.0, b:6370997.0, ellipseName:"Normal Sphere (r=6370997)"}
};

Proj4js.Datum = {
  "WGS84": {towgs84: "0,0,0", ellipse: "WGS84", datumName: "WGS84"},
  "GGRS87": {towgs84: "-199.87,74.79,246.62", ellipse: "GRS80", datumName: "Greek_Geodetic_Reference_System_1987"},
  "NAD83": {towgs84: "0,0,0", ellipse: "GRS80", datumName: "North_American_Datum_1983"},
  "NAD27": {nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat", ellipse: "clrk66", datumName: "North_American_Datum_1927"},
  "potsdam": {towgs84: "606.0,23.0,413.0", ellipse: "bessel", datumName: "Potsdam Rauenberg 1950 DHDN"},
  "carthage": {towgs84: "-263.0,6.0,431.0", ellipse: "clark80", datumName: "Carthage 1934 Tunisia"},
  "hermannskogel": {towgs84: "653.0,-212.0,449.0", ellipse: "bessel", datumName: "Hermannskogel"},
  "ire65": {towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15", ellipse: "mod_airy", datumName: "Ireland 1965"},
  "nzgd49": {towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993", ellipse: "intl", datumName: "New Zealand Geodetic Datum 1949"},
  "OSGB36": {towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894", ellipse: "airy", datumName: "Airy 1830"}
};

Proj4js.WGS84 = new Proj4js.Proj('WGS84');
Proj4js.Datum['OSB36'] = Proj4js.Datum['OSGB36']; //as returned from spatialreference.org

//lookup table to go from the projection name in WKT to the Proj4js projection name
//build this out as required
Proj4js.wktProjections = {
  "Lambert Tangential Conformal Conic Projection": "lcc",
  "Mercator": "merc",
  "Popular Visualisation Pseudo Mercator": "merc",
  "Mercator_1SP": "merc",
  "Transverse_Mercator": "tmerc",
  "Transverse Mercator": "tmerc",
  "Lambert Azimuthal Equal Area": "laea",
  "Universal Transverse Mercator System": "utm"
};


/* ======================================================================
    projCode/aea.js
   ====================================================================== */

/*******************************************************************************
NAME                     ALBERS CONICAL EQUAL AREA 

PURPOSE:	Transforms input longitude and latitude to Easting and Northing
		for the Albers Conical Equal Area projection.  The longitude
		and latitude must be in radians.  The Easting and Northing
		values will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan,       	Feb, 1992

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/


Proj4js.Proj.aea = {
  init : function() {

    if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) {
       Proj4js.reportError("aeaInitEqualLatitudes");
       return;
    }
    this.temp = this.b / this.a;
    this.es = 1.0 - Math.pow(this.temp,2);
    this.e3 = Math.sqrt(this.es);

    this.sin_po=Math.sin(this.lat1);
    this.cos_po=Math.cos(this.lat1);
    this.t1=this.sin_po;
    this.con = this.sin_po;
    this.ms1 = Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po);
    this.qs1 = Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po);

    this.sin_po=Math.sin(this.lat2);
    this.cos_po=Math.cos(this.lat2);
    this.t2=this.sin_po;
    this.ms2 = Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po);
    this.qs2 = Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po);

    this.sin_po=Math.sin(this.lat0);
    this.cos_po=Math.cos(this.lat0);
    this.t3=this.sin_po;
    this.qs0 = Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po);

    if (Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN) {
      this.ns0 = (this.ms1 * this.ms1 - this.ms2 *this.ms2)/ (this.qs2 - this.qs1);
    } else {
      this.ns0 = this.con;
    }
    this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
    this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0)/this.ns0;
  },

/* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
  forward: function(p){

    var lon=p.x;
    var lat=p.y;

    this.sin_phi=Math.sin(lat);
    this.cos_phi=Math.cos(lat);

    var qs = Proj4js.common.qsfnz(this.e3,this.sin_phi,this.cos_phi);
    var rh1 =this.a * Math.sqrt(this.c - this.ns0 * qs)/this.ns0;
    var theta = this.ns0 * Proj4js.common.adjust_lon(lon - this.long0); 
    var x = rh1 * Math.sin(theta) + this.x0;
    var y = this.rh - rh1 * Math.cos(theta) + this.y0;

    p.x = x; 
    p.y = y;
    return p;
  },


  inverse: function(p) {
    var rh1,qs,con,theta,lon,lat;

    p.x -= this.x0;
    p.y = this.rh - p.y + this.y0;
    if (this.ns0 >= 0) {
      rh1 = Math.sqrt(p.x *p.x + p.y * p.y);
      con = 1.0;
    } else {
      rh1 = -Math.sqrt(p.x * p.x + p.y *p.y);
      con = -1.0;
    }
    theta = 0.0;
    if (rh1 != 0.0) {
      theta = Math.atan2(con * p.x, con * p.y);
    }
    con = rh1 * this.ns0 / this.a;
    qs = (this.c - con * con) / this.ns0;
    if (this.e3 >= 1e-10) {
      con = 1 - .5 * (1.0 -this.es) * Math.log((1.0 - this.e3) / (1.0 + this.e3))/this.e3;
      if (Math.abs(Math.abs(con) - Math.abs(qs)) > .0000000001 ) {
          lat = this.phi1z(this.e3,qs);
      } else {
          if (qs >= 0) {
             lat = .5 * Proj4js.common.PI;
          } else {
             lat = -.5 * Proj4js.common.PI;
          }
      }
    } else {
      lat = this.phi1z(this.e3,qs);
    }

    lon = Proj4js.common.adjust_lon(theta/this.ns0 + this.long0);
    p.x = lon;
    p.y = lat;
    return p;
  },
  
/* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
  phi1z: function (eccent,qs) {
    var sinphi, cosphi, con, com, dphi;
    var phi = Proj4js.common.asinz(.5 * qs);
    if (eccent < Proj4js.common.EPSLN) return phi;
    
    var eccnts = eccent * eccent; 
    for (var i = 1; i <= 25; i++) {
        sinphi = Math.sin(phi);
        cosphi = Math.cos(phi);
        con = eccent * sinphi; 
        com = 1.0 - con * con;
        dphi = .5 * com * com / cosphi * (qs / (1.0 - eccnts) - sinphi / com + .5 / eccent * Math.log((1.0 - con) / (1.0 + con)));
        phi = phi + dphi;
        if (Math.abs(dphi) <= 1e-7) return phi;
    }
    Proj4js.reportError("aea:phi1z:Convergence error");
    return null;
  }
  
};



/* ======================================================================
    projCode/sterea.js
   ====================================================================== */


Proj4js.Proj.sterea = {
  dependsOn : 'gauss',

  init : function() {
    Proj4js.Proj['gauss'].init.apply(this);
    if (!this.rc) {
      Proj4js.reportError("sterea:init:E_ERROR_0");
      return;
    }
    this.sinc0 = Math.sin(this.phic0);
    this.cosc0 = Math.cos(this.phic0);
    this.R2 = 2.0 * this.rc;
    if (!this.title) this.title = "Oblique Stereographic Alternative";
  },

  forward : function(p) {
    var sinc, cosc, cosl, k;
    p.x = Proj4js.common.adjust_lon(p.x-this.long0); /* adjust del longitude */
    Proj4js.Proj['gauss'].forward.apply(this, [p]);
    sinc = Math.sin(p.y);
    cosc = Math.cos(p.y);
    cosl = Math.cos(p.x);
    k = this.k0 * this.R2 / (1.0 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
    p.x = k * cosc * Math.sin(p.x);
    p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
    p.x = this.a * p.x + this.x0;
    p.y = this.a * p.y + this.y0;
    return p;
  },

  inverse : function(p) {
    var sinc, cosc, lon, lat, rho;
    p.x = (p.x - this.x0) / this.a; /* descale and de-offset */
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;
    if ( (rho = Math.sqrt(p.x*p.x + p.y*p.y)) ) {
      var c = 2.0 * Math.atan2(rho, this.R2);
      sinc = Math.sin(c);
      cosc = Math.cos(c);
      lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
      lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
    } else {
      lat = this.phic0;
      lon = 0.;
    }

    p.x = lon;
    p.y = lat;
    Proj4js.Proj['gauss'].inverse.apply(this,[p]);
    p.x = Proj4js.common.adjust_lon(p.x + this.long0); /* adjust longitude to CM */
    return p;
  }
};

/* ======================================================================
    projCode/poly.js
   ====================================================================== */

/* Function to compute, phi4, the latitude for the inverse of the
   Polyconic projection.
------------------------------------------------------------*/
function phi4z (eccent,e0,e1,e2,e3,a,b,c,phi) {
	var sinphi, sin2ph, tanphi, ml, mlp, con1, con2, con3, dphi, i;

	phi = a;
	for (i = 1; i <= 15; i++) {
		sinphi = Math.sin(phi);
		tanphi = Math.tan(phi);
		c = tanphi * Math.sqrt (1.0 - eccent * sinphi * sinphi);
		sin2ph = Math.sin (2.0 * phi);
		/*
		ml = e0 * *phi - e1 * sin2ph + e2 * sin (4.0 *  *phi);
		mlp = e0 - 2.0 * e1 * cos (2.0 *  *phi) + 4.0 * e2 *  cos (4.0 *  *phi);
		*/
		ml = e0 * phi - e1 * sin2ph + e2 * Math.sin (4.0 *  phi) - e3 * Math.sin (6.0 * phi);
		mlp = e0 - 2.0 * e1 * Math.cos (2.0 *  phi) + 4.0 * e2 * Math.cos (4.0 *  phi) - 6.0 * e3 * Math.cos (6.0 *  phi);
		con1 = 2.0 * ml + c * (ml * ml + b) - 2.0 * a *  (c * ml + 1.0);
		con2 = eccent * sin2ph * (ml * ml + b - 2.0 * a * ml) / (2.0 *c);
		con3 = 2.0 * (a - ml) * (c * mlp - 2.0 / sin2ph) - 2.0 * mlp;
		dphi = con1 / (con2 + con3);
		phi += dphi;
		if (Math.abs(dphi) <= .0000000001 ) return(phi);   
	}
	Proj4js.reportError("phi4z: No convergence");
	return null;
}


/* Function to compute the constant e4 from the input of the eccentricity
   of the spheroid, x.  This constant is used in the Polar Stereographic
   projection.
--------------------------------------------------------------------*/
function e4fn(x) {
	var con, com;
	con = 1.0 + x;
	com = 1.0 - x;
	return (Math.sqrt((Math.pow(con,con))*(Math.pow(com,com))));
}





/*******************************************************************************
NAME                             POLYCONIC 

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Polyconic projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/

Proj4js.Proj.poly = {

	/* Initialize the POLYCONIC projection
	  ----------------------------------*/
	init: function() {
		var temp;			/* temporary variable		*/
		if (this.lat0 == 0) this.lat0 = 90;//this.lat0 ca

		/* Place parameters in static storage for common use
		  -------------------------------------------------*/
		this.temp = this.b / this.a;
		this.es = 1.0 - Math.pow(this.temp,2);// devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles 
		this.e = Math.sqrt(this.es);
		this.e0 = Proj4js.common.e0fn(this.es);
		this.e1 = Proj4js.common.e1fn(this.es);
		this.e2 = Proj4js.common.e2fn(this.es);
		this.e3 = Proj4js.common.e3fn(this.es);
		this.ml0 = Proj4js.common.mlfn(this.e0, this.e1,this.e2, this.e3, this.lat0);//si que des zeros le calcul ne se fait pas
		//if (!this.ml0) {this.ml0=0;}
	},


	/* Polyconic forward equations--mapping lat,long to x,y
	  ---------------------------------------------------*/
	forward: function(p) {
		var sinphi, cosphi;	/* sin and cos value				*/
		var al;				/* temporary values				*/
		var c;				/* temporary values				*/
		var con, ml;		/* cone constant, small m			*/
		var ms;				/* small m					*/
		var x,y;

		var lon=p.x;
		var lat=p.y;	

		con = Proj4js.common.adjust_lon(lon - this.long0);
		if (Math.abs(lat) <= .0000001) {
			x = this.x0 + this.a * con;
			y = this.y0 - this.a * this.ml0;
		} else {
			sinphi = Math.sin(lat);
			cosphi = Math.cos(lat);	   

			ml = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat);
			ms = Proj4js.common.msfnz(this.e,sinphi,cosphi);
			con = sinphi;
			x = this.x0 + this.a * ms * Math.sin(con)/sinphi;
			y = this.y0 + this.a * (ml - this.ml0 + ms * (1.0 - Math.cos(con))/sinphi);
		}

		p.x=x;
		p.y=y;   
		return p;
	},


	/* Inverse equations
	-----------------*/
	inverse: function(p) {
		var sin_phi, cos_phi;	/* sin and cos value				*/
		var al;					/* temporary values				*/
		var b;					/* temporary values				*/
		var c;					/* temporary values				*/
		var con, ml;			/* cone constant, small m			*/
		var iflg;				/* error flag					*/
		var lon,lat;
		p.x -= this.x0;
		p.y -= this.y0;
		al = this.ml0 + p.y/this.a;
		iflg = 0;

		if (Math.abs(al) <= .0000001) {
			lon = p.x/this.a + this.long0;
			lat = 0.0;
		} else {
			b = al * al + (p.x/this.a) * (p.x/this.a);
			iflg = phi4z(this.es,this.e0,this.e1,this.e2,this.e3,this.al,b,c,lat);
			if (iflg != 1) return(iflg);
			lon = Proj4js.common.adjust_lon((Proj4js.common.asinz(p.x * c / this.a) / Math.sin(lat)) + this.long0);
		}

		p.x=lon;
		p.y=lat;
		return p;
	}
};



/* ======================================================================
    projCode/equi.js
   ====================================================================== */

/*******************************************************************************
NAME                             EQUIRECTANGULAR 

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Equirectangular projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/
Proj4js.Proj.equi = {

  init: function() {
    if(!this.x0) this.x0=0;
    if(!this.y0) this.y0=0;
    if(!this.lat0) this.lat0=0;
    if(!this.long0) this.long0=0;
    ///this.t2;
  },



/* Equirectangular forward equations--mapping lat,long to x,y
  ---------------------------------------------------------*/
  forward: function(p) {

    var lon=p.x;				
    var lat=p.y;			

    var dlon = Proj4js.common.adjust_lon(lon - this.long0);
    var x = this.x0 +this. a * dlon *Math.cos(this.lat0);
    var y = this.y0 + this.a * lat;

    this.t1=x;
    this.t2=Math.cos(this.lat0);
    p.x=x;
    p.y=y;
    return p;
  },  //equiFwd()



/* Equirectangular inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
  inverse: function(p) {

    p.x -= this.x0;
    p.y -= this.y0;
    var lat = p.y /this. a;

    if ( Math.abs(lat) > Proj4js.common.HALF_PI) {
        Proj4js.reportError("equi:Inv:DataError");
    }
    var lon = Proj4js.common.adjust_lon(this.long0 + p.x / (this.a * Math.cos(this.lat0)));
    p.x=lon;
    p.y=lat;
  }//equiInv()
};


/* ======================================================================
    projCode/merc.js
   ====================================================================== */

/*******************************************************************************
NAME                            MERCATOR

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Mercator projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE
----------              ----
D. Steinwand, EROS      Nov, 1991
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/

//static double r_major = a;		   /* major axis 				*/
//static double r_minor = b;		   /* minor axis 				*/
//static double lon_center = long0;	   /* Center longitude (projection center) */
//static double lat_origin =  lat0;	   /* center latitude			*/
//static double e,es;		           /* eccentricity constants		*/
//static double m1;		               /* small value m			*/
//static double false_northing = y0;   /* y offset in meters			*/
//static double false_easting = x0;	   /* x offset in meters			*/
//scale_fact = k0 

Proj4js.Proj.merc = {
  init : function() {
	//?this.temp = this.r_minor / this.r_major;
	//this.temp = this.b / this.a;
	//this.es = 1.0 - Math.sqrt(this.temp);
	//this.e = Math.sqrt( this.es );
	//?this.m1 = Math.cos(this.lat_origin) / (Math.sqrt( 1.0 - this.es * Math.sin(this.lat_origin) * Math.sin(this.lat_origin)));
	//this.m1 = Math.cos(0.0) / (Math.sqrt( 1.0 - this.es * Math.sin(0.0) * Math.sin(0.0)));
    if (this.lat_ts) {
      if (this.sphere) {
        this.k0 = Math.cos(this.lat_ts);
      } else {
        this.k0 = Proj4js.common.msfnz(this.es, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
      }
    }
  },

/* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

  forward : function(p) {	
    //alert("ll2m coords : "+coords);
    var lon = p.x;
    var lat = p.y;
    // convert to radians
    if ( lat*Proj4js.common.R2D > 90.0 && 
          lat*Proj4js.common.R2D < -90.0 && 
          lon*Proj4js.common.R2D > 180.0 && 
          lon*Proj4js.common.R2D < -180.0) {
      Proj4js.reportError("merc:forward: llInputOutOfRange: "+ lon +" : " + lat);
      return null;
    }

    var x,y;
    if(Math.abs( Math.abs(lat) - Proj4js.common.HALF_PI)  <= Proj4js.common.EPSLN) {
      Proj4js.reportError("merc:forward: ll2mAtPoles");
      return null;
    } else {
      if (this.sphere) {
        x = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(lon - this.long0);
        y = this.y0 + this.a * this.k0 * Math.log(Math.tan(Proj4js.common.FORTPI + 0.5*lat));
      } else {
        var sinphi = Math.sin(lat);
        var ts = Proj4js.common.tsfnz(this.e,lat,sinphi);
        x = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(lon - this.long0);
        y = this.y0 - this.a * this.k0 * Math.log(ts);
      }
      p.x = x; 
      p.y = y;
      return p;
    }
  },


  /* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
  inverse : function(p) {	

    var x = p.x - this.x0;
    var y = p.y - this.y0;
    var lon,lat;

    if (this.sphere) {
      lat = Proj4js.common.HALF_PI - 2.0 * Math.atan(Math.exp(-y / this.a * this.k0));
    } else {
      var ts = Math.exp(-y / (this.a * this.k0));
      lat = Proj4js.common.phi2z(this.e,ts);
      if(lat == -9999) {
        Proj4js.reportError("merc:inverse: lat = -9999");
        return null;
      }
    }
    lon = Proj4js.common.adjust_lon(this.long0+ x / (this.a * this.k0));

    p.x = lon;
    p.y = lat;
    return p;
  }
};


/* ======================================================================
    projCode/utm.js
   ====================================================================== */

/*******************************************************************************
NAME                            TRANSVERSE MERCATOR

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Transverse Mercator projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/


/**
  Initialize Transverse Mercator projection
*/

Proj4js.Proj.utm = {
  dependsOn : 'tmerc',

  init : function() {
    if (!this.zone) {
      Proj4js.reportError("utm:init: zone must be specified for UTM");
      return;
    }
    this.lat0 = 0.0;
    this.long0 = ((6 * Math.abs(this.zone)) - 183) * Proj4js.common.D2R;
    this.x0 = 500000.0;
    this.y0 = this.utmSouth ? 10000000.0 : 0.0;
    this.k0 = 0.9996;

    Proj4js.Proj['tmerc'].init.apply(this);
    this.forward = Proj4js.Proj['tmerc'].forward;
    this.inverse = Proj4js.Proj['tmerc'].inverse;
  }
};
/* ======================================================================
    projCode/eqdc.js
   ====================================================================== */

/*******************************************************************************
NAME                            EQUIDISTANT CONIC 

PURPOSE:	Transforms input longitude and latitude to Easting and Northing
		for the Equidistant Conic projection.  The longitude and
		latitude must be in radians.  The Easting and Northing values
		will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/

/* Variables common to all subroutines in this code file
  -----------------------------------------------------*/

Proj4js.Proj.eqdc = {

/* Initialize the Equidistant Conic projection
  ------------------------------------------*/
  init: function() {

    /* Place parameters in static storage for common use
      -------------------------------------------------*/

    if(!this.mode) this.mode=0;//chosen default mode
    this.temp = this.b / this.a;
    this.es = 1.0 - Math.pow(this.temp,2);
    this.e = Math.sqrt(this.es);
    this.e0 = Proj4js.common.e0fn(this.es);
    this.e1 = Proj4js.common.e1fn(this.es);
    this.e2 = Proj4js.common.e2fn(this.es);
    this.e3 = Proj4js.common.e3fn(this.es);

    this.sinphi=Math.sin(this.lat1);
    this.cosphi=Math.cos(this.lat1);

    this.ms1 = Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi);
    this.ml1 = Proj4js.common.mlfn(this.e0, this.e1, this.e2,this.e3, this.lat1);

    /* format B
    ---------*/
    if (this.mode != 0) {
      if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) {
            Proj4js.reportError("eqdc:Init:EqualLatitudes");
            //return(81);
       }
       this.sinphi=Math.sin(this.lat2);
       this.cosphi=Math.cos(this.lat2);   

       this.ms2 = Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi);
       this.ml2 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
       if (Math.abs(this.lat1 - this.lat2) >= Proj4js.common.EPSLN) {
         this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
       } else {
          this.ns = this.sinphi;
       }
    } else {
      this.ns = this.sinphi;
    }
    this.g = this.ml1 + this.ms1/this.ns;
    this.ml0 = Proj4js.common.mlfn(this.e0, this.e1,this. e2, this.e3, this.lat0);
    this.rh = this.a * (this.g - this.ml0);
  },


/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
  forward: function(p) {
    var lon=p.x;
    var lat=p.y;

    /* Forward equations
      -----------------*/
    var ml = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat);
    var rh1 = this.a * (this.g - ml);
    var theta = this.ns * Proj4js.common.adjust_lon(lon - this.long0);

    var x = this.x0  + rh1 * Math.sin(theta);
    var y = this.y0 + this.rh - rh1 * Math.cos(theta);
    p.x=x;
    p.y=y;
    return p;
  },

/* Inverse equations
  -----------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y  = this.rh - p.y + this.y0;
    var con, rh1;
    if (this.ns >= 0) {
       rh1 = Math.sqrt(p.x *p.x + p.y * p.y); 
       con = 1.0;
    } else {
       rh1 = -Math.sqrt(p.x *p. x +p. y * p.y); 
       con = -1.0;
    }
    var theta = 0.0;
    if (rh1 != 0.0) theta = Math.atan2(con *p.x, con *p.y);
    var ml = this.g - rh1 /this.a;
    var lat = this.phi3z(ml,this.e0,this.e1,this.e2,this.e3);
    var lon = Proj4js.common.adjust_lon(this.long0 + theta / this.ns);

     p.x=lon;
     p.y=lat;  
     return p;
    },
    
/* Function to compute latitude, phi3, for the inverse of the Equidistant
   Conic projection.
-----------------------------------------------------------------*/
  phi3z: function(ml,e0,e1,e2,e3) {
    var phi;
    var dphi;

    phi = ml;
    for (var i = 0; i < 15; i++) {
      dphi = (ml + e1 * Math.sin(2.0 * phi) - e2 * Math.sin(4.0 * phi) + e3 * Math.sin(6.0 * phi))/ e0 - phi;
      phi += dphi;
      if (Math.abs(dphi) <= .0000000001) {
        return phi;
      }
    }
    Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");
    return null;
  }

    
};
/* ======================================================================
    projCode/tmerc.js
   ====================================================================== */

/*******************************************************************************
NAME                            TRANSVERSE MERCATOR

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Transverse Mercator projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/


/**
  Initialize Transverse Mercator projection
*/

Proj4js.Proj.tmerc = {
  init : function() {
    this.e0 = Proj4js.common.e0fn(this.es);
    this.e1 = Proj4js.common.e1fn(this.es);
    this.e2 = Proj4js.common.e2fn(this.es);
    this.e3 = Proj4js.common.e3fn(this.es);
    this.ml0 = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  },

  /**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
  forward : function(p) {
    var lon = p.x;
    var lat = p.y;

    var delta_lon = Proj4js.common.adjust_lon(lon - this.long0); // Delta longitude
    var con;    // cone constant
    var x, y;
    var sin_phi=Math.sin(lat);
    var cos_phi=Math.cos(lat);

    if (this.sphere) {  /* spherical form */
      var b = cos_phi * Math.sin(delta_lon);
      if ((Math.abs(Math.abs(b) - 1.0)) < .0000000001)  {
        Proj4js.reportError("tmerc:forward: Point projects into infinity");
        return(93);
      } else {
        x = .5 * this.a * this.k0 * Math.log((1.0 + b)/(1.0 - b));
        con = Math.acos(cos_phi * Math.cos(delta_lon)/Math.sqrt(1.0 - b*b));
        if (lat < 0) con = - con;
        y = this.a * this.k0 * (con - this.lat0);
      }
    } else {
      var al  = cos_phi * delta_lon;
      var als = Math.pow(al,2);
      var c   = this.ep2 * Math.pow(cos_phi,2);
      var tq  = Math.tan(lat);
      var t   = Math.pow(tq,2);
      con = 1.0 - this.es * Math.pow(sin_phi,2);
      var n   = this.a / Math.sqrt(con);
      var ml  = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat);

      x = this.k0 * n * al * (1.0 + als / 6.0 * (1.0 - t + c + als / 20.0 * (5.0 - 18.0 * t + Math.pow(t,2) + 72.0 * c - 58.0 * this.ep2))) + this.x0;
      y = this.k0 * (ml - this.ml0 + n * tq * (als * (0.5 + als / 24.0 * (5.0 - t + 9.0 * c + 4.0 * Math.pow(c,2) + als / 30.0 * (61.0 - 58.0 * t + Math.pow(t,2) + 600.0 * c - 330.0 * this.ep2))))) + this.y0;

    }
    p.x = x; p.y = y;
    return p;
  }, // tmercFwd()

  /**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
  inverse : function(p) {
    var con, phi;  /* temporary angles       */
    var delta_phi; /* difference between longitudes    */
    var i;
    var max_iter = 6;      /* maximun number of iterations */
    var lat, lon;

    if (this.sphere) {   /* spherical form */
      var f = Math.exp(p.x/(this.a * this.k0));
      var g = .5 * (f - 1/f);
      var temp = this.lat0 + p.y/(this.a * this.k0);
      var h = Math.cos(temp);
      con = Math.sqrt((1.0 - h * h)/(1.0 + g * g));
      lat = Proj4js.common.asinz(con);
      if (temp < 0)
        lat = -lat;
      if ((g == 0) && (h == 0)) {
        lon = this.long0;
      } else {
        lon = Proj4js.common.adjust_lon(Math.atan2(g,h) + this.long0);
      }
    } else {    // ellipsoidal form
      var x = p.x - this.x0;
      var y = p.y - this.y0;

      con = (this.ml0 + y / this.k0) / this.a;
      phi = con;
      for (i=0;true;i++) {
        delta_phi=((con + this.e1 * Math.sin(2.0*phi) - this.e2 * Math.sin(4.0*phi) + this.e3 * Math.sin(6.0*phi)) / this.e0) - phi;
        phi += delta_phi;
        if (Math.abs(delta_phi) <= Proj4js.common.EPSLN) break;
        if (i >= max_iter) {
          Proj4js.reportError("tmerc:inverse: Latitude failed to converge");
          return(95);
        }
      } // for()
      if (Math.abs(phi) < Proj4js.common.HALF_PI) {
        // sincos(phi, &sin_phi, &cos_phi);
        var sin_phi=Math.sin(phi);
        var cos_phi=Math.cos(phi);
        var tan_phi = Math.tan(phi);
        var c = this.ep2 * Math.pow(cos_phi,2);
        var cs = Math.pow(c,2);
        var t = Math.pow(tan_phi,2);
        var ts = Math.pow(t,2);
        con = 1.0 - this.es * Math.pow(sin_phi,2);
        var n = this.a / Math.sqrt(con);
        var r = n * (1.0 - this.es) / con;
        var d = x / (n * this.k0);
        var ds = Math.pow(d,2);
        lat = phi - (n * tan_phi * ds / r) * (0.5 - ds / 24.0 * (5.0 + 3.0 * t + 10.0 * c - 4.0 * cs - 9.0 * this.ep2 - ds / 30.0 * (61.0 + 90.0 * t + 298.0 * c + 45.0 * ts - 252.0 * this.ep2 - 3.0 * cs)));
        lon = Proj4js.common.adjust_lon(this.long0 + (d * (1.0 - ds / 6.0 * (1.0 + 2.0 * t + c - ds / 20.0 * (5.0 - 2.0 * c + 28.0 * t - 3.0 * cs + 8.0 * this.ep2 + 24.0 * ts))) / cos_phi));
      } else {
        lat = Proj4js.common.HALF_PI * Proj4js.common.sign(y);
        lon = this.long0;
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  } // tmercInv()
};
/* ======================================================================
    defs/GOOGLE.js
   ====================================================================== */

Proj4js.defs["GOOGLE"]="+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
Proj4js.defs["EPSG:900913"]=Proj4js.defs["GOOGLE"];
/* ======================================================================
    projCode/gstmerc.js
   ====================================================================== */

Proj4js.Proj.gstmerc = {
  init : function() {

    // array of:  a, b, lon0, lat0, k0, x0, y0
      var temp= this.b / this.a;
      this.e= Math.sqrt(1.0 - temp*temp);
      this.lc= this.long0;
      this.rs= Math.sqrt(1.0+this.e*this.e*Math.pow(Math.cos(this.lat0),4.0)/(1.0-this.e*this.e));
      var sinz= Math.sin(this.lat0);
      var pc= Math.asin(sinz/this.rs);
      var sinzpc= Math.sin(pc);
      this.cp= Proj4js.common.latiso(0.0,pc,sinzpc)-this.rs*Proj4js.common.latiso(this.e,this.lat0,sinz);
      this.n2= this.k0*this.a*Math.sqrt(1.0-this.e*this.e)/(1.0-this.e*this.e*sinz*sinz);
      this.xs= this.x0;
      this.ys= this.y0-this.n2*pc;

      if (!this.title) this.title = "Gauss Schreiber transverse mercator";
    },


    // forward equations--mapping lat,long to x,y
    // -----------------------------------------------------------------
    forward : function(p) {

      var lon= p.x;
      var lat= p.y;

      var L= this.rs*(lon-this.lc);
      var Ls= this.cp+(this.rs*Proj4js.common.latiso(this.e,lat,Math.sin(lat)));
      var lat1= Math.asin(Math.sin(L)/Proj4js.common.cosh(Ls));
      var Ls1= Proj4js.common.latiso(0.0,lat1,Math.sin(lat1));
      p.x= this.xs+(this.n2*Ls1);
      p.y= this.ys+(this.n2*Math.atan(Proj4js.common.sinh(Ls)/Math.cos(L)));
      return p;
    },

  // inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  inverse : function(p) {

    var x= p.x;
    var y= p.y;

    var L= Math.atan(Proj4js.common.sinh((x-this.xs)/this.n2)/Math.cos((y-this.ys)/this.n2));
    var lat1= Math.asin(Math.sin((y-this.ys)/this.n2)/Proj4js.common.cosh((x-this.xs)/this.n2));
    var LC= Proj4js.common.latiso(0.0,lat1,Math.sin(lat1));
    p.x= this.lc+L/this.rs;
    p.y= Proj4js.common.invlatiso(this.e,(LC-this.cp)/this.rs);
    return p;
  }

};
/* ======================================================================
    projCode/ortho.js
   ====================================================================== */

/*******************************************************************************
NAME                             ORTHOGRAPHIC 

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Orthographic projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/

Proj4js.Proj.ortho = {

  /* Initialize the Orthographic projection
    -------------------------------------*/
  init: function(def) {
    //double temp;			/* temporary variable		*/

    /* Place parameters in static storage for common use
      -------------------------------------------------*/;
    this.sin_p14=Math.sin(this.lat0);
    this.cos_p14=Math.cos(this.lat0);	
  },


  /* Orthographic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
  forward: function(p) {
    var sinphi, cosphi;	/* sin and cos value				*/
    var dlon;		/* delta longitude value			*/
    var coslon;		/* cos of longitude				*/
    var ksp;		/* scale factor					*/
    var g;		
    var lon=p.x;
    var lat=p.y;	
    /* Forward equations
      -----------------*/
    dlon = Proj4js.common.adjust_lon(lon - this.long0);

    sinphi=Math.sin(lat);
    cosphi=Math.cos(lat);	

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1.0;
    if ((g > 0) || (Math.abs(g) <= Proj4js.common.EPSLN)) {
      var x = this.a * ksp * cosphi * Math.sin(dlon);
      var y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
    } else {
      Proj4js.reportError("orthoFwdPointError");
    }
    p.x=x;
    p.y=y;
    return p;
  },


  inverse: function(p) {
    var rh;		/* height above ellipsoid			*/
    var z;		/* angle					*/
    var sinz,cosz;	/* sin of z and cos of z			*/
    var temp;
    var con;
    var lon , lat;
    /* Inverse equations
      -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > this.a + .0000001) {
      Proj4js.reportError("orthoInvDataError");
    }
    z = Proj4js.common.asinz(rh / this.a);

    sinz=Math.sin(z);
    cosz=Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= Proj4js.common.EPSLN) {
      lat = this.lat0; 
    }
    lat = Proj4js.common.asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14)/rh);
    con = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
    if (Math.abs(con) <= Proj4js.common.EPSLN) {
       if (this.lat0 >= 0) {
          lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
       } else {
          lon = Proj4js.common.adjust_lon(this.long0 -Math.atan2(-p.x, p.y));
       }
    }
    con = cosz - this.sin_p14 * Math.sin(lat);
    p.x=lon;
    p.y=lat;
    return p;
  }
};


/* ======================================================================
    projCode/krovak.js
   ====================================================================== */

/**
   NOTES: According to EPSG the full Krovak projection method should have
          the following parameters.  Within PROJ.4 the azimuth, and pseudo
          standard parallel are hardcoded in the algorithm and can't be 
          altered from outside.  The others all have defaults to match the
          common usage with Krovak projection.

  lat_0 = latitude of centre of the projection
         
  lon_0 = longitude of centre of the projection
  
  ** = azimuth (true) of the centre line passing through the centre of the projection

  ** = latitude of pseudo standard parallel
   
  k  = scale factor on the pseudo standard parallel
  
  x_0 = False Easting of the centre of the projection at the apex of the cone
  
  y_0 = False Northing of the centre of the projection at the apex of the cone

 **/

Proj4js.Proj.krovak = {

	init: function() {
		/* we want Bessel as fixed ellipsoid */
		this.a =  6377397.155;
		this.es = 0.006674372230614;
		this.e = Math.sqrt(this.es);
		/* if latitude of projection center is not set, use 49d30'N */
		if (!this.lat0) {
			this.lat0 = 0.863937979737193;
		}
		if (!this.long0) {
			this.long0 = 0.7417649320975901 - 0.308341501185665;
		}
		/* if scale not set default to 0.9999 */
		if (!this.k0) {
			this.k0 = 0.9999;
		}
		this.s45 = 0.785398163397448;    /* 45° */
		this.s90 = 2 * this.s45;
		this.fi0 = this.lat0;    /* Latitude of projection centre 49° 30' */
      		/*  Ellipsoid Bessel 1841 a = 6377397.155m 1/f = 299.1528128,
      					 e2=0.006674372230614;
		 */
		this.e2 = this.es;       /* 0.006674372230614; */
		this.e = Math.sqrt(this.e2);
		this.alfa = Math.sqrt(1. + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1. - this.e2));
		this.uq = 1.04216856380474;      /* DU(2, 59, 42, 42.69689) */
		this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
		this.g = Math.pow(   (1. + this.e * Math.sin(this.fi0)) / (1. - this.e * Math.sin(this.fi0)) , this.alfa * this.e / 2.  );
		this.k = Math.tan( this.u0 / 2. + this.s45) / Math.pow  (Math.tan(this.fi0 / 2. + this.s45) , this.alfa) * this.g;
		this.k1 = this.k0;
		this.n0 = this.a * Math.sqrt(1. - this.e2) / (1. - this.e2 * Math.pow(Math.sin(this.fi0), 2));
		this.s0 = 1.37008346281555;       /* Latitude of pseudo standard parallel 78° 30'00" N */
		this.n = Math.sin(this.s0);
		this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
		this.ad = this.s90 - this.uq;
	},
	
	/* ellipsoid */
	/* calculate xy from lat/lon */
	/* Constants, identical to inverse transform function */
	forward: function(p) {
		var gfi, u, deltav, s, d, eps, ro;
		var lon = p.x;
		var lat = p.y;
		var delta_lon = Proj4js.common.adjust_lon(lon - this.long0); // Delta longitude
		/* Transformation */
		gfi = Math.pow ( ((1. + this.e * Math.sin(lat)) / (1. - this.e * Math.sin(lat))) , (this.alfa * this.e / 2.));
		u= 2. * (Math.atan(this.k * Math.pow( Math.tan(lat / 2. + this.s45), this.alfa) / gfi)-this.s45);
		deltav = - delta_lon * this.alfa;
		s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
		d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
		eps = this.n * d;
		ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2. + this.s45) , this.n) / Math.pow(Math.tan(s / 2. + this.s45) , this.n);
		/* x and y are reverted! */
		//p.y = ro * Math.cos(eps) / a;
		//p.x = ro * Math.sin(eps) / a;
		p.y = ro * Math.cos(eps) / 1.0;
		p.x = ro * Math.sin(eps) / 1.0;

		if(this.czech) {
	    		p.y *= -1.0;
	    		p.x *= -1.0;
		}
		return (p);
	},

	/* calculate lat/lon from xy */
	inverse: function(p) {
		/* Constants, identisch wie in der Umkehrfunktion */
		var u, deltav, s, d, eps, ro, fi1;
		var ok;

		/* Transformation */
		/* revert y, x*/
		var tmp = p.x;
		p.x=p.y;
		p.y=tmp;
		if(this.czech) {
	    		p.y *= -1.0;
	    		p.x *= -1.0;
		}
		ro = Math.sqrt(p.x * p.x + p.y * p.y);
		eps = Math.atan2(p.y, p.x);
		d = eps / Math.sin(this.s0);
		s = 2. * (Math.atan(  Math.pow(this.ro0 / ro, 1. / this.n) * Math.tan(this.s0 / 2. + this.s45)) - this.s45);
		u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
		deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
		p.x = this.long0 - deltav / this.alfa;
		/* ITERATION FOR lat */
		fi1 = u;
		ok = 0;
		var iter = 0;
		do {
			p.y = 2. * ( Math.atan( Math.pow( this.k, -1. / this.alfa)  *
                            Math.pow( Math.tan(u / 2. + this.s45) , 1. / this.alfa)  *
                            Math.pow( (1. + this.e * Math.sin(fi1)) / (1. - this.e * Math.sin(fi1)) , this.e / 2.)
                           )  - this.s45);
      			if (Math.abs(fi1 - p.y) < 0.0000000001) ok=1;
			fi1 = p.y;
			iter += 1;
		} while (ok==0 && iter < 15);
		if (iter >= 15) {
			Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");
			//console.log('iter:', iter);
			return null;
		}
   		
		return (p);
	}
};
/* ======================================================================
    projCode/somerc.js
   ====================================================================== */

/*******************************************************************************
NAME                       SWISS OBLIQUE MERCATOR

PURPOSE:	Swiss projection.
WARNING:  X and Y are inverted (weird) in the swiss coordinate system. Not
   here, since we want X to be horizontal and Y vertical.

ALGORITHM REFERENCES
1. "Formules et constantes pour le Calcul pour la
 projection cylindrique conforme Ã  axe oblique et pour la transformation entre
 des systÃ¨mes de rÃ©fÃ©rence".
 http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf

*******************************************************************************/

Proj4js.Proj.somerc = {

  init: function() {
    var phy0 = this.lat0;
    this.lambda0 = this.long0;
    var sinPhy0 = Math.sin(phy0);
    var semiMajorAxis = this.a;
    var invF = this.rf;
    var flattening = 1 / invF;
    var e2 = 2 * flattening - Math.pow(flattening, 2);
    var e = this.e = Math.sqrt(e2);
    this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2.0));
    this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4.0));
    this.b0 = Math.asin(sinPhy0 / this.alpha);
    this.K = Math.log(Math.tan(Math.PI / 4.0 + this.b0 / 2.0))
            - this.alpha
            * Math.log(Math.tan(Math.PI / 4.0 + phy0 / 2.0))
            + this.alpha
            * e / 2
            * Math.log((1 + e * sinPhy0)
            / (1 - e * sinPhy0));
  },


  forward: function(p) {
    var Sa1 = Math.log(Math.tan(Math.PI / 4.0 - p.y / 2.0));
    var Sa2 = this.e / 2.0
            * Math.log((1 + this.e * Math.sin(p.y))
            / (1 - this.e * Math.sin(p.y)));
    var S = -this.alpha * (Sa1 + Sa2) + this.K;

        // spheric latitude
    var b = 2.0 * (Math.atan(Math.exp(S)) - Math.PI / 4.0);

        // spheric longitude
    var I = this.alpha * (p.x - this.lambda0);

        // psoeudo equatorial rotation
    var rotI = Math.atan(Math.sin(I)
            / (Math.sin(this.b0) * Math.tan(b) +
               Math.cos(this.b0) * Math.cos(I)));

    var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) -
                         Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

    p.y = this.R / 2.0
            * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB)))
            + this.y0;
    p.x = this.R * rotI + this.x0;
    return p;
  },

  inverse: function(p) {
    var Y = p.x - this.x0;
    var X = p.y - this.y0;

    var rotI = Y / this.R;
    var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4.0);

    var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB)
            + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
    var I = Math.atan(Math.sin(rotI)
            / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0)
            * Math.tan(rotB)));

    var lambda = this.lambda0 + I / this.alpha;

    var S = 0.0;
    var phy = b;
    var prevPhy = -1000.0;
    var iteration = 0;
    while (Math.abs(phy - prevPhy) > 0.0000001)
    {
      if (++iteration > 20)
      {
        Proj4js.reportError("omercFwdInfinity");
        return;
      }
      //S = Math.log(Math.tan(Math.PI / 4.0 + phy / 2.0));
      S = 1.0
              / this.alpha
              * (Math.log(Math.tan(Math.PI / 4.0 + b / 2.0)) - this.K)
              + this.e
              * Math.log(Math.tan(Math.PI / 4.0
              + Math.asin(this.e * Math.sin(phy))
              / 2.0));
      prevPhy = phy;
      phy = 2.0 * Math.atan(Math.exp(S)) - Math.PI / 2.0;
    }

    p.x = lambda;
    p.y = phy;
    return p;
  }
};
/* ======================================================================
    projCode/stere.js
   ====================================================================== */


// Initialize the Stereographic projection

Proj4js.Proj.stere = {
  ssfn_: function(phit, sinphi, eccen) {
  	sinphi *= eccen;
  	return (Math.tan (.5 * (Proj4js.common.HALF_PI + phit)) * Math.pow((1. - sinphi) / (1. + sinphi), .5 * eccen));
  },
  TOL:	1.e-8,
  NITER:	8,
  CONV:	1.e-10,
  S_POLE:	0,
  N_POLE:	1,
  OBLIQ:	2,
  EQUIT:	3,

  init: function() {
  	this.phits = this.lat_ts ? this.lat_ts : Proj4js.common.HALF_PI;
    var t = Math.abs(this.lat0);
  	if ((Math.abs(t) - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) {
  		this.mode = this.lat0 < 0. ? this.S_POLE : this.N_POLE;
  	} else {
  		this.mode = t > Proj4js.common.EPSLN ? this.OBLIQ : this.EQUIT;
    }
  	this.phits = Math.abs(this.phits);
  	if (this.es) {
  		var X;

  		switch (this.mode) {
  		case this.N_POLE:
  		case this.S_POLE:
  			if (Math.abs(this.phits - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) {
  				this.akm1 = 2. * this.k0 / Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e));
  			} else {
          t = Math.sin(this.phits);
  				this.akm1 = Math.cos(this.phits) / Proj4js.common.tsfnz(this.e, this.phits, t);
  				t *= this.e;
  				this.akm1 /= Math.sqrt(1. - t * t);
  			}
  			break;
  		case this.EQUIT:
  			this.akm1 = 2. * this.k0;
  			break;
  		case this.OBLIQ:
  			t = Math.sin(this.lat0);
  			X = 2. * Math.atan(this.ssfn_(this.lat0, t, this.e)) - Proj4js.common.HALF_PI;
  			t *= this.e;
  			this.akm1 = 2. * this.k0 * Math.cos(this.lat0) / Math.sqrt(1. - t * t);
  			this.sinX1 = Math.sin(X);
  			this.cosX1 = Math.cos(X);
  			break;
  		}
  	} else {
  		switch (this.mode) {
  		case this.OBLIQ:
  			this.sinph0 = Math.sin(this.lat0);
  			this.cosph0 = Math.cos(this.lat0);
  		case this.EQUIT:
  			this.akm1 = 2. * this.k0;
  			break;
  		case this.S_POLE:
  		case this.N_POLE:
  			this.akm1 = Math.abs(this.phits - Proj4js.common.HALF_PI) >= Proj4js.common.EPSLN ?
  			   Math.cos(this.phits) / Math.tan(Proj4js.common.FORTPI - .5 * this.phits) :
  			   2. * this.k0 ;
  			break;
  		}
  	}
  }, 

// Stereographic forward equations--mapping lat,long to x,y
  forward: function(p) {
    var lon = p.x;
    lon = Proj4js.common.adjust_lon(lon - this.long0);
    var lat = p.y;
    var x, y;
    
    if (this.sphere) {
    	var  sinphi, cosphi, coslam, sinlam;

    	sinphi = Math.sin(lat);
    	cosphi = Math.cos(lat);
    	coslam = Math.cos(lon);
    	sinlam = Math.sin(lon);
    	switch (this.mode) {
    	case this.EQUIT:
    		y = 1. + cosphi * coslam;
    		if (y <= Proj4js.common.EPSLN) {
            Proj4js.reportError("stere:forward:Equit");
        }
        y = this.akm1 / y;
    		x = y * cosphi * sinlam;
        y *= sinphi;
    		break;
    	case this.OBLIQ:
    		y = 1. + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
    		if (y <= Proj4js.common.EPSLN) {
            Proj4js.reportError("stere:forward:Obliq");
        }
        y = this.akm1 / y;
    		x = y * cosphi * sinlam;
    		y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    		break;
    	case this.N_POLE:
    		coslam = -coslam;
    		lat = -lat;
        //Note  no break here so it conitnues through S_POLE
    	case this.S_POLE:
    		if (Math.abs(lat - Proj4js.common.HALF_PI) < this.TOL) {
            Proj4js.reportError("stere:forward:S_POLE");
        }
        y = this.akm1 * Math.tan(Proj4js.common.FORTPI + .5 * lat);
    		x = sinlam * y;
    		y *= coslam;
    		break;
    	}
    } else {
    	coslam = Math.cos(lon);
    	sinlam = Math.sin(lon);
    	sinphi = Math.sin(lat);
    	var sinX, cosX;
    	if (this.mode == this.OBLIQ || this.mode == this.EQUIT) {
    	  var Xt = 2. * Math.atan(this.ssfn_(lat, sinphi, this.e));
        sinX = Math.sin(Xt - Proj4js.common.HALF_PI);
        cosX = Math.cos(Xt);
    	}
    	switch (this.mode) {
    	case this.OBLIQ:
    		var A = this.akm1 / (this.cosX1 * (1. + this.sinX1 * sinX + this.cosX1 * cosX * coslam));
    		y = A * (this.cosX1 * sinX - this.sinX1 * cosX * coslam);
    		x = A * cosX;
    		break;
    	case this.EQUIT:
    		var A = 2. * this.akm1 / (1. + cosX * coslam);
    		y = A * sinX;
    		x = A * cosX;
    		break;
    	case this.S_POLE:
    		lat = -lat;
    		coslam = - coslam;
    		sinphi = -sinphi;
    	case this.N_POLE:
    		x = this.akm1 * Proj4js.common.tsfnz(this.e, lat, sinphi);
    		y = - x * coslam;
    		break;
    	}
    	x = x * sinlam;
    }
    p.x = x*this.a + this.x0;
    p.y = y*this.a + this.y0;
    return p;
  },


//* Stereographic inverse equations--mapping x,y to lat/long
  inverse: function(p) {
    var x = (p.x - this.x0)/this.a;   /* descale and de-offset */
    var y = (p.y - this.y0)/this.a;
    var lon, lat;

    var cosphi, sinphi, tp=0.0, phi_l=0.0, rho, halfe=0.0, pi2=0.0;
    var i;

    if (this.sphere) {
    	var  c, rh, sinc, cosc;

      rh = Math.sqrt(x*x + y*y);
      c = 2. * Math.atan(rh / this.akm1);
    	sinc = Math.sin(c);
    	cosc = Math.cos(c);
    	lon = 0.;
    	switch (this.mode) {
    	case this.EQUIT:
    		if (Math.abs(rh) <= Proj4js.common.EPSLN) {
    			lat = 0.;
    		} else {
    			lat = Math.asin(y * sinc / rh);
        }
    		if (cosc != 0. || x != 0.) lon = Math.atan2(x * sinc, cosc * rh);
    		break;
    	case this.OBLIQ:
    		if (Math.abs(rh) <= Proj4js.common.EPSLN) {
    			lat = this.phi0;
    		} else {
    			lat = Math.asin(cosc * this.sinph0 + y * sinc * this.cosph0 / rh);
        }
        c = cosc - this.sinph0 * Math.sin(lat);
    		if (c != 0. || x != 0.) {
    			lon = Math.atan2(x * sinc * this.cosph0, c * rh);
        }
    		break;
    	case this.N_POLE:
    		y = -y;
    	case this.S_POLE:
    		if (Math.abs(rh) <= Proj4js.common.EPSLN) {
    			lat = this.phi0;
    		} else {
    			lat = Math.asin(this.mode == this.S_POLE ? -cosc : cosc);
        }
    		lon = (x == 0. && y == 0.) ? 0. : Math.atan2(x, y);
    		break;
    	}
        p.x = Proj4js.common.adjust_lon(lon + this.long0);
        p.y = lat;
    } else {
    	rho = Math.sqrt(x*x + y*y);
    	switch (this.mode) {
    	case this.OBLIQ:
    	case this.EQUIT:
        tp = 2. * Math.atan2(rho * this.cosX1 , this.akm1);
    		cosphi = Math.cos(tp);
    		sinphi = Math.sin(tp);
        if( rho == 0.0 ) {
    		  phi_l = Math.asin(cosphi * this.sinX1);
        } else {
    		  phi_l = Math.asin(cosphi * this.sinX1 + (y * sinphi * this.cosX1 / rho));
        }

    		tp = Math.tan(.5 * (Proj4js.common.HALF_PI + phi_l));
    		x *= sinphi;
    		y = rho * this.cosX1 * cosphi - y * this.sinX1* sinphi;
    		pi2 = Proj4js.common.HALF_PI;
    		halfe = .5 * this.e;
    		break;
    	case this.N_POLE:
    		y = -y;
    	case this.S_POLE:
        tp = - rho / this.akm1;
    		phi_l = Proj4js.common.HALF_PI - 2. * Math.atan(tp);
    		pi2 = -Proj4js.common.HALF_PI;
    		halfe = -.5 * this.e;
    		break;
    	}
    	for (i = this.NITER; i--; phi_l = lat) { //check this
    		sinphi = this.e * Math.sin(phi_l);
    		lat = 2. * Math.atan(tp * Math.pow((1.+sinphi)/(1.-sinphi), halfe)) - pi2;
    		if (Math.abs(phi_l - lat) < this.CONV) {
    			if (this.mode == this.S_POLE) lat = -lat;
    			lon = (x == 0. && y == 0.) ? 0. : Math.atan2(x, y);
          p.x = Proj4js.common.adjust_lon(lon + this.long0);
          p.y = lat;
    			return p;
    		}
    	}
    }
  }
}; 
/* ======================================================================
    projCode/nzmg.js
   ====================================================================== */

/*******************************************************************************
NAME                            NEW ZEALAND MAP GRID

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the New Zealand Map Grid projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.


ALGORITHM REFERENCES

1.  Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf

2.  OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf


IMPLEMENTATION NOTES

The two references use different symbols for the calculated values. This
implementation uses the variable names similar to the symbols in reference [1].

The alogrithm uses different units for delta latitude and delta longitude.
The delta latitude is assumed to be in units of seconds of arc x 10^-5.
The delta longitude is the usual radians. Look out for these conversions.

The algorithm is described using complex arithmetic. There were three
options:
   * find and use a Javascript library for complex arithmetic
   * write my own complex library
   * expand the complex arithmetic by hand to simple arithmetic

This implementation has expanded the complex multiplication operations
into parallel simple arithmetic operations for the real and imaginary parts.
The imaginary part is way over to the right of the display; this probably
violates every coding standard in the world, but, to me, it makes it much
more obvious what is going on.

The following complex operations are used:
   - addition
   - multiplication
   - division
   - complex number raised to integer power
   - summation

A summary of complex arithmetic operations:
   (from http://en.wikipedia.org/wiki/Complex_arithmetic)
   addition:       (a + bi) + (c + di) = (a + c) + (b + d)i
   subtraction:    (a + bi) - (c + di) = (a - c) + (b - d)i
   multiplication: (a + bi) x (c + di) = (ac - bd) + (bc + ad)i
   division:       (a + bi) / (c + di) = [(ac + bd)/(cc + dd)] + [(bc - ad)/(cc + dd)]i

The algorithm needs to calculate summations of simple and complex numbers. This is
implemented using a for-loop, pre-loading the summed value to zero.

The algorithm needs to calculate theta^2, theta^3, etc while doing a summation.
There are three possible implementations:
   - use Math.pow in the summation loop - except for complex numbers
   - precalculate the values before running the loop
   - calculate theta^n = theta^(n-1) * theta during the loop
This implementation uses the third option for both real and complex arithmetic.

For example
   psi_n = 1;
   sum = 0;
   for (n = 1; n <=6; n++) {
      psi_n1 = psi_n * psi;       // calculate psi^(n+1)
      psi_n = psi_n1;
      sum = sum + A[n] * psi_n;
   }


TEST VECTORS

NZMG E, N:         2487100.638      6751049.719     metres
NZGD49 long, lat:      172.739194       -34.444066  degrees

NZMG E, N:         2486533.395      6077263.661     metres
NZGD49 long, lat:      172.723106       -40.512409  degrees

NZMG E, N:         2216746.425      5388508.765     metres
NZGD49 long, lat:      169.172062       -46.651295  degrees

Note that these test vectors convert from NZMG metres to lat/long referenced
to NZGD49, not the more usual WGS84. The difference is about 70m N/S and about
10m E/W.

These test vectors are provided in reference [1]. Many more test
vectors are available in
   http://www.linz.govt.nz/docs/topography/topographicdata/placenamesdatabase/nznamesmar08.zip
which is a catalog of names on the 260-series maps.


EPSG CODES

NZMG     EPSG:27200
NZGD49   EPSG:4272

http://spatialreference.org/ defines these as
  Proj4js.defs["EPSG:4272"] = "+proj=longlat +ellps=intl +datum=nzgd49 +no_defs ";
  Proj4js.defs["EPSG:27200"] = "+proj=nzmg +lat_0=-41 +lon_0=173 +x_0=2510000 +y_0=6023150 +ellps=intl +datum=nzgd49 +units=m +no_defs ";


LICENSE
  Copyright: Stephen Irons 2008
  Released under terms of the LGPL as per: http://www.gnu.org/copyleft/lesser.html

*******************************************************************************/


/**
  Initialize New Zealand Map Grip projection
*/

Proj4js.Proj.nzmg = {

  /**
   * iterations: Number of iterations to refine inverse transform.
   *     0 -> km accuracy
   *     1 -> m accuracy -- suitable for most mapping applications
   *     2 -> mm accuracy
   */
  iterations: 1,

  init : function() {
    this.A = new Array();
    this.A[1]  = +0.6399175073;
    this.A[2]  = -0.1358797613;
    this.A[3]  = +0.063294409;
    this.A[4]  = -0.02526853;
    this.A[5]  = +0.0117879;
    this.A[6]  = -0.0055161;
    this.A[7]  = +0.0026906;
    this.A[8]  = -0.001333;
    this.A[9]  = +0.00067;
    this.A[10] = -0.00034;

    this.B_re = new Array();        this.B_im = new Array();
    this.B_re[1] = +0.7557853228;   this.B_im[1] =  0.0;
    this.B_re[2] = +0.249204646;    this.B_im[2] = +0.003371507;
    this.B_re[3] = -0.001541739;    this.B_im[3] = +0.041058560;
    this.B_re[4] = -0.10162907;     this.B_im[4] = +0.01727609;
    this.B_re[5] = -0.26623489;     this.B_im[5] = -0.36249218;
    this.B_re[6] = -0.6870983;      this.B_im[6] = -1.1651967;

    this.C_re = new Array();        this.C_im = new Array();
    this.C_re[1] = +1.3231270439;   this.C_im[1] =  0.0;
    this.C_re[2] = -0.577245789;    this.C_im[2] = -0.007809598;
    this.C_re[3] = +0.508307513;    this.C_im[3] = -0.112208952;
    this.C_re[4] = -0.15094762;     this.C_im[4] = +0.18200602;
    this.C_re[5] = +1.01418179;     this.C_im[5] = +1.64497696;
    this.C_re[6] = +1.9660549;      this.C_im[6] = +2.5127645;

    this.D = new Array();
    this.D[1] = +1.5627014243;
    this.D[2] = +0.5185406398;
    this.D[3] = -0.03333098;
    this.D[4] = -0.1052906;
    this.D[5] = -0.0368594;
    this.D[6] = +0.007317;
    this.D[7] = +0.01220;
    this.D[8] = +0.00394;
    this.D[9] = -0.0013;
  },

  /**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
  forward : function(p) {
    var lon = p.x;
    var lat = p.y;

    var delta_lat = lat - this.lat0;
    var delta_lon = lon - this.long0;

    // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
    // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
    var d_phi = delta_lat / Proj4js.common.SEC_TO_RAD * 1E-5;       var d_lambda = delta_lon;
    var d_phi_n = 1;  // d_phi^0

    var d_psi = 0;
    for (var n = 1; n <= 10; n++) {
      d_phi_n = d_phi_n * d_phi;
      d_psi = d_psi + this.A[n] * d_phi_n;
    }

    // 2. Calculate theta
    var th_re = d_psi;                                              var th_im = d_lambda;

    // 3. Calculate z
    var th_n_re = 1;                                                var th_n_im = 0;  // theta^0
    var th_n_re1;                                                   var th_n_im1;

    var z_re = 0;                                                   var z_im = 0;
    for (var n = 1; n <= 6; n++) {
      th_n_re1 = th_n_re*th_re - th_n_im*th_im;                     th_n_im1 = th_n_im*th_re + th_n_re*th_im;
      th_n_re = th_n_re1;                                           th_n_im = th_n_im1;
      z_re = z_re + this.B_re[n]*th_n_re - this.B_im[n]*th_n_im;    z_im = z_im + this.B_im[n]*th_n_re + this.B_re[n]*th_n_im;
    }

    // 4. Calculate easting and northing
    p.x = (z_im * this.a) + this.x0; 
    p.y = (z_re * this.a) + this.y0;

    return p;
  },


  /**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
  inverse : function(p) {

    var x = p.x;
    var y = p.y;

    var delta_x = x - this.x0;
    var delta_y = y - this.y0;

    // 1. Calculate z
    var z_re = delta_y / this.a;                                              var z_im = delta_x / this.a;

    // 2a. Calculate theta - first approximation gives km accuracy
    var z_n_re = 1;                                                           var z_n_im = 0;  // z^0
    var z_n_re1;                                                              var z_n_im1;

    var th_re = 0;                                                            var th_im = 0;
    for (var n = 1; n <= 6; n++) {
      z_n_re1 = z_n_re*z_re - z_n_im*z_im;                                    z_n_im1 = z_n_im*z_re + z_n_re*z_im;
      z_n_re = z_n_re1;                                                       z_n_im = z_n_im1;
      th_re = th_re + this.C_re[n]*z_n_re - this.C_im[n]*z_n_im;              th_im = th_im + this.C_im[n]*z_n_re + this.C_re[n]*z_n_im;
    }

    // 2b. Iterate to refine the accuracy of the calculation
    //        0 iterations gives km accuracy
    //        1 iteration gives m accuracy -- good enough for most mapping applications
    //        2 iterations bives mm accuracy
    for (var i = 0; i < this.iterations; i++) {
       var th_n_re = th_re;                                                      var th_n_im = th_im;
       var th_n_re1;                                                             var th_n_im1;

       var num_re = z_re;                                                        var num_im = z_im;
       for (var n = 2; n <= 6; n++) {
         th_n_re1 = th_n_re*th_re - th_n_im*th_im;                               th_n_im1 = th_n_im*th_re + th_n_re*th_im;
         th_n_re = th_n_re1;                                                     th_n_im = th_n_im1;
         num_re = num_re + (n-1)*(this.B_re[n]*th_n_re - this.B_im[n]*th_n_im);  num_im = num_im + (n-1)*(this.B_im[n]*th_n_re + this.B_re[n]*th_n_im);
       }

       th_n_re = 1;                                                              th_n_im = 0;
       var den_re = this.B_re[1];                                                var den_im = this.B_im[1];
       for (var n = 2; n <= 6; n++) {
         th_n_re1 = th_n_re*th_re - th_n_im*th_im;                               th_n_im1 = th_n_im*th_re + th_n_re*th_im;
         th_n_re = th_n_re1;                                                     th_n_im = th_n_im1;
         den_re = den_re + n * (this.B_re[n]*th_n_re - this.B_im[n]*th_n_im);    den_im = den_im + n * (this.B_im[n]*th_n_re + this.B_re[n]*th_n_im);
       }

       // Complex division
       var den2 = den_re*den_re + den_im*den_im;
       th_re = (num_re*den_re + num_im*den_im) / den2;                           th_im = (num_im*den_re - num_re*den_im) / den2;
    }

    // 3. Calculate d_phi              ...                                    // and d_lambda
    var d_psi = th_re;                                                        var d_lambda = th_im;
    var d_psi_n = 1;  // d_psi^0

    var d_phi = 0;
    for (var n = 1; n <= 9; n++) {
       d_psi_n = d_psi_n * d_psi;
       d_phi = d_phi + this.D[n] * d_psi_n;
    }

    // 4. Calculate latitude and longitude
    // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
    var lat = this.lat0 + (d_phi * Proj4js.common.SEC_TO_RAD * 1E5);
    var lon = this.long0 +  d_lambda;

    p.x = lon;
    p.y = lat;

    return p;
  }
};
/* ======================================================================
    projCode/mill.js
   ====================================================================== */

/*******************************************************************************
NAME                    MILLER CYLINDRICAL 

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Miller Cylindrical projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE            
----------              ----           
T. Mittan		March, 1993

This function was adapted from the Lambert Azimuthal Equal Area projection
code (FORTRAN) in the General Cartographic Transformation Package software
which is available from the U.S. Geological Survey National Mapping Division.
 
ALGORITHM REFERENCES

1.  "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.

2.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

3.  "Software Documentation for GCTP General Cartographic Transformation
    Package", U.S. Geological Survey National Mapping Division, May 1982.
*******************************************************************************/

Proj4js.Proj.mill = {

/* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
  init: function() {
    //no-op
  },


  /* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
  forward: function(p) {
    var lon=p.x;
    var lat=p.y;
    /* Forward equations
      -----------------*/
    var dlon = Proj4js.common.adjust_lon(lon -this.long0);
    var x = this.x0 + this.a * dlon;
    var y = this.y0 + this.a * Math.log(Math.tan((Proj4js.common.PI / 4.0) + (lat / 2.5))) * 1.25;

    p.x=x;
    p.y=y;
    return p;
  },//millFwd()

  /* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y -= this.y0;

    var lon = Proj4js.common.adjust_lon(this.long0 + p.x /this.a);
    var lat = 2.5 * (Math.atan(Math.exp(0.8*p.y/this.a)) - Proj4js.common.PI / 4.0);

    p.x=lon;
    p.y=lat;
    return p;
  }//millInv()
};
/* ======================================================================
    projCode/gnom.js
   ====================================================================== */

/*****************************************************************************
NAME                             GNOMONIC

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Gnomonic Projection.
                Implementation based on the existing sterea and ortho
                implementations.

PROGRAMMER              DATE
----------              ----
Richard Marsden         November 2009

ALGORITHM REFERENCES

1.  Snyder, John P., "Flattening the Earth - Two Thousand Years of Map 
    Projections", University of Chicago Press 1993

2.  Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
******************************************************************************/

Proj4js.Proj.gnom = {

  /* Initialize the Gnomonic projection
    -------------------------------------*/
  init: function(def) {

    /* Place parameters in static storage for common use
      -------------------------------------------------*/
    this.sin_p14=Math.sin(this.lat0);
    this.cos_p14=Math.cos(this.lat0);
    // Approximation for projecting points to the horizon (infinity)
    this.infinity_dist = 1000 * this.a;
    this.rc = 1;
  },


  /* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
  forward: function(p) {
    var sinphi, cosphi;	/* sin and cos value				*/
    var dlon;		/* delta longitude value			*/
    var coslon;		/* cos of longitude				*/
    var ksp;		/* scale factor					*/
    var g;		
    var x, y;
    var lon=p.x;
    var lat=p.y;	
    /* Forward equations
      -----------------*/
    dlon = Proj4js.common.adjust_lon(lon - this.long0);

    sinphi=Math.sin(lat);
    cosphi=Math.cos(lat);	

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1.0;
    if ((g > 0) || (Math.abs(g) <= Proj4js.common.EPSLN)) {
      x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
      y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
    } else {
      Proj4js.reportError("orthoFwdPointError");

      // Point is in the opposing hemisphere and is unprojectable
      // We still need to return a reasonable point, so we project 
      // to infinity, on a bearing 
      // equivalent to the northern hemisphere equivalent
      // This is a reasonable approximation for short shapes and lines that 
      // straddle the horizon.

      x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
      y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

    }
    p.x=x;
    p.y=y;
    return p;
  },


  inverse: function(p) {
    var rh;		/* Rho */
    var z;		/* angle */
    var sinc, cosc;
    var c;
    var lon , lat;

    /* Inverse equations
      -----------------*/
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;

    if ( (rh = Math.sqrt(p.x * p.x + p.y * p.y)) ) {
      c = Math.atan2(rh, this.rc);
      sinc = Math.sin(c);
      cosc = Math.cos(c);

      lat = Proj4js.common.asinz(cosc*this.sin_p14 + (p.y*sinc*this.cos_p14) / rh);
      lon = Math.atan2(p.x*sinc, rh*this.cos_p14*cosc - p.y*this.sin_p14*sinc);
      lon = Proj4js.common.adjust_lon(this.long0+lon);
    } else {
      lat = this.phic0;
      lon = 0.0;
    }
 
    p.x=lon;
    p.y=lat;
    return p;
  }
};


/* ======================================================================
    projCode/sinu.js
   ====================================================================== */

/*******************************************************************************
NAME                  		SINUSOIDAL

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Sinusoidal projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE            
----------              ----           
D. Steinwand, EROS      May, 1991     

This function was adapted from the Sinusoidal projection code (FORTRAN) in the 
General Cartographic Transformation Package software which is available from 
the U.S. Geological Survey National Mapping Division.
 
ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  "Software Documentation for GCTP General Cartographic Transformation
    Package", U.S. Geological Survey National Mapping Division, May 1982.
*******************************************************************************/

Proj4js.Proj.sinu = {

	/* Initialize the Sinusoidal projection
	  ------------------------------------*/
	init: function() {
		/* Place parameters in static storage for common use
		  -------------------------------------------------*/
		  

		if (!this.sphere) {
		  this.en = Proj4js.common.pj_enfn(this.es);
    } else {
      this.n = 1.;
      this.m = 0.;
      this.es = 0;
      this.C_y = Math.sqrt((this.m + 1.) / this.n);
      this.C_x = this.C_y/(this.m + 1.);
    }
		  
	},

	/* Sinusoidal forward equations--mapping lat,long to x,y
	-----------------------------------------------------*/
	forward: function(p) {
		var x,y,delta_lon;	
		var lon=p.x;
		var lat=p.y;	
		/* Forward equations
		-----------------*/
		lon = Proj4js.common.adjust_lon(lon - this.long0);
		
		if (this.sphere) {
      if (!this.m) {
        lat = this.n != 1. ? Math.asin(this.n * Math.sin(lat)): lat;
      } else {
        var k = this.n * Math.sin(lat);
        for (var i = Proj4js.common.MAX_ITER; i ; --i) {
          var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
          lat -= V;
          if (Math.abs(V) < Proj4js.common.EPSLN) break;
        }
      }
      x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
      y = this.a * this.C_y * lat;

		} else {
		  
		  var s = Math.sin(lat);
		  var c = Math.cos(lat);
      y = this.a * Proj4js.common.pj_mlfn(lat, s, c, this.en);
      x = this.a * lon * c / Math.sqrt(1. - this.es * s * s);
		}

		p.x=x;
		p.y=y;	
		return p;
	},

	inverse: function(p) {
		var lat,temp,lon;	
		
		/* Inverse equations
		  -----------------*/
		p.x -= this.x0;
		p.y -= this.y0;
		lat = p.y / this.a;
		
		if (this.sphere) {
		  
      p.y /= this.C_y;
      lat = this.m ? Math.asin((this.m * p.y + Math.sin(p.y)) / this.n) :
        ( this.n != 1. ? Math.asin(Math.sin(p.y) / this.n) : p.y );
      lon = p.x / (this.C_x * (this.m + Math.cos(p.y)));
		  
		} else {
		  lat = Proj4js.common.pj_inv_mlfn(p.y/this.a, this.es, this.en)
		  var s = Math.abs(lat);
      if (s < Proj4js.common.HALF_PI) {
        s = Math.sin(lat);
        temp = this.long0 + p.x * Math.sqrt(1. - this.es * s * s) /(this.a * Math.cos(lat));
        //temp = this.long0 + p.x / (this.a * Math.cos(lat));
        lon = Proj4js.common.adjust_lon(temp);
      } else if ((s - Proj4js.common.EPSLN) < Proj4js.common.HALF_PI) {
        lon = this.long0;
      }
		  
		}
		  
		p.x=lon;
		p.y=lat;
		return p;
	}
};


/* ======================================================================
    projCode/vandg.js
   ====================================================================== */

/*******************************************************************************
NAME                    VAN DER GRINTEN 

PURPOSE:	Transforms input Easting and Northing to longitude and
		latitude for the Van der Grinten projection.  The
		Easting and Northing must be in meters.  The longitude
		and latitude values will be returned in radians.

PROGRAMMER              DATE            
----------              ----           
T. Mittan		March, 1993

This function was adapted from the Van Der Grinten projection code
(FORTRAN) in the General Cartographic Transformation Package software
which is available from the U.S. Geological Survey National Mapping Division.
 
ALGORITHM REFERENCES

1.  "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.

2.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

3.  "Software Documentation for GCTP General Cartographic Transformation
    Package", U.S. Geological Survey National Mapping Division, May 1982.
*******************************************************************************/

Proj4js.Proj.vandg = {

/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
	init: function() {
		this.R = 6370997.0; //Radius of earth
	},

	forward: function(p) {

		var lon=p.x;
		var lat=p.y;	

		/* Forward equations
		-----------------*/
		var dlon = Proj4js.common.adjust_lon(lon - this.long0);
		var x,y;

		if (Math.abs(lat) <= Proj4js.common.EPSLN) {
			x = this.x0  + this.R * dlon;
			y = this.y0;
		}
		var theta = Proj4js.common.asinz(2.0 * Math.abs(lat / Proj4js.common.PI));
		if ((Math.abs(dlon) <= Proj4js.common.EPSLN) || (Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN)) {
			x = this.x0;
			if (lat >= 0) {
				y = this.y0 + Proj4js.common.PI * this.R * Math.tan(.5 * theta);
			} else {
				y = this.y0 + Proj4js.common.PI * this.R * - Math.tan(.5 * theta);
			}
			//  return(OK);
		}
		var al = .5 * Math.abs((Proj4js.common.PI / dlon) - (dlon / Proj4js.common.PI));
		var asq = al * al;
		var sinth = Math.sin(theta);
		var costh = Math.cos(theta);

		var g = costh / (sinth + costh - 1.0);
		var gsq = g * g;
		var m = g * (2.0 / sinth - 1.0);
		var msq = m * m;
		var con = Proj4js.common.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
		if (dlon < 0) {
		 con = -con;
		}
		x = this.x0 + con;
		con = Math.abs(con / (Proj4js.common.PI * this.R));
		if (lat >= 0) {
		 y = this.y0 + Proj4js.common.PI * this.R * Math.sqrt(1.0 - con * con - 2.0 * al * con);
		} else {
		 y = this.y0 - Proj4js.common.PI * this.R * Math.sqrt(1.0 - con * con - 2.0 * al * con);
		}
		p.x = x;
		p.y = y;
		return p;
	},

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
	inverse: function(p) {
		var lon, lat;
		var xx,yy,xys,c1,c2,c3;
		var al,asq;
		var a1;
		var m1;
		var con;
		var th1;
		var d;

		/* inverse equations
		-----------------*/
		p.x -= this.x0;
		p.y -= this.y0;
		con = Proj4js.common.PI * this.R;
		xx = p.x / con;
		yy =p.y / con;
		xys = xx * xx + yy * yy;
		c1 = -Math.abs(yy) * (1.0 + xys);
		c2 = c1 - 2.0 * yy * yy + xx * xx;
		c3 = -2.0 * c1 + 1.0 + 2.0 * yy * yy + xys * xys;
		d = yy * yy / c3 + (2.0 * c2 * c2 * c2 / c3 / c3 / c3 - 9.0 * c1 * c2 / c3 /c3) / 27.0;
		a1 = (c1 - c2 * c2 / 3.0 / c3) / c3;
		m1 = 2.0 * Math.sqrt( -a1 / 3.0);
		con = ((3.0 * d) / a1) / m1;
		if (Math.abs(con) > 1.0) {
			if (con >= 0.0) {
				con = 1.0;
			} else {
				con = -1.0;
			}
		}
		th1 = Math.acos(con) / 3.0;
		if (p.y >= 0) {
			lat = (-m1 *Math.cos(th1 + Proj4js.common.PI / 3.0) - c2 / 3.0 / c3) * Proj4js.common.PI;
		} else {
			lat = -(-m1 * Math.cos(th1 + Proj4js.common.PI / 3.0) - c2 / 3.0 / c3) * Proj4js.common.PI;
		}

		if (Math.abs(xx) < Proj4js.common.EPSLN) {
			lon = this.long0;
		}
		lon = Proj4js.common.adjust_lon(this.long0 + Proj4js.common.PI * (xys - 1.0 + Math.sqrt(1.0 + 2.0 * (xx * xx - yy * yy) + xys * xys)) / 2.0 / xx);

		p.x=lon;
		p.y=lat;
		return p;
	}
};
/* ======================================================================
    projCode/cea.js
   ====================================================================== */

/*******************************************************************************
NAME                    LAMBERT CYLINDRICAL EQUAL AREA

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Lambert Cylindrical Equal Area projection.
                This class of projection includes the Behrmann and 
                Gall-Peters Projections.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE            
----------              ----
R. Marsden              August 2009
Winwaed Software Tech LLC, http://www.winwaed.com

This function was adapted from the Miller Cylindrical Projection in the Proj4JS
library.

Note: This implementation assumes a Spherical Earth. The (commented) code 
has been included for the ellipsoidal forward transform, but derivation of 
the ellispoidal inverse transform is beyond me. Note that most of the 
Proj4JS implementations do NOT currently support ellipsoidal figures. 
Therefore this is not seen as a problem - especially this lack of support 
is explicitly stated here.
 
ALGORITHM REFERENCES

1.  "Cartographic Projection Procedures for the UNIX Environment - 
     A User's Manual" by Gerald I. Evenden, USGS Open File Report 90-284
    and Release 4 Interim Reports (2003)

2.  Snyder, John P., "Flattening the Earth - Two Thousand Years of Map 
    Projections", Univ. Chicago Press, 1993
*******************************************************************************/

Proj4js.Proj.cea = {

/* Initialize the Cylindrical Equal Area projection
  -------------------------------------------*/
  init: function() {
    //no-op
  },


  /* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
  forward: function(p) {
    var lon=p.x;
    var lat=p.y;
    /* Forward equations
      -----------------*/
    var dlon = Proj4js.common.adjust_lon(lon -this.long0);
    var x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    var y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
   /* Elliptical Forward Transform
      Not implemented due to a lack of a matchign inverse function
    {
      var Sin_Lat = Math.sin(lat);
      var Rn = this.a * (Math.sqrt(1.0e0 - this.es * Sin_Lat * Sin_Lat ));
      x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
      y = this.y0 + Rn * Math.sin(lat) / Math.cos(this.lat_ts);
    }
   */


    p.x=x;
    p.y=y;
    return p;
  },//ceaFwd()

  /* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y -= this.y0;

    var lon = Proj4js.common.adjust_lon( this.long0 + (p.x / this.a) / Math.cos(this.lat_ts) );

    var lat = Math.asin( (p.y/this.a) * Math.cos(this.lat_ts) );

    p.x=lon;
    p.y=lat;
    return p;
  }//ceaInv()
};
/* ======================================================================
    projCode/eqc.js
   ====================================================================== */

/* similar to equi.js FIXME proj4 uses eqc */
Proj4js.Proj.eqc = {
  init : function() {

      if(!this.x0) this.x0=0;
      if(!this.y0) this.y0=0;
      if(!this.lat0) this.lat0=0;
      if(!this.long0) this.long0=0;
      if(!this.lat_ts) this.lat_ts=0;
      if (!this.title) this.title = "Equidistant Cylindrical (Plate Carre)";

      this.rc= Math.cos(this.lat_ts);
    },


    // forward equations--mapping lat,long to x,y
    // -----------------------------------------------------------------
    forward : function(p) {

      var lon= p.x;
      var lat= p.y;

      var dlon = Proj4js.common.adjust_lon(lon - this.long0);
      var dlat = Proj4js.common.adjust_lat(lat - this.lat0 );
      p.x= this.x0 + (this.a*dlon*this.rc);
      p.y= this.y0 + (this.a*dlat        );
      return p;
    },

  // inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  inverse : function(p) {

    var x= p.x;
    var y= p.y;

    p.x= Proj4js.common.adjust_lon(this.long0 + ((x - this.x0)/(this.a*this.rc)));
    p.y= Proj4js.common.adjust_lat(this.lat0  + ((y - this.y0)/(this.a        )));
    return p;
  }

};
/* ======================================================================
    projCode/cass.js
   ====================================================================== */

/*******************************************************************************
NAME                            CASSINI

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Cassini projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.
    Ported from PROJ.4.


ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
*******************************************************************************/


//Proj4js.defs["EPSG:28191"] = "+proj=cass +lat_0=31.73409694444445 +lon_0=35.21208055555556 +x_0=170251.555 +y_0=126867.909 +a=6378300.789 +b=6356566.435 +towgs84=-275.722,94.7824,340.894,-8.001,-4.42,-11.821,1 +units=m +no_defs";

// Initialize the Cassini projection
// -----------------------------------------------------------------

Proj4js.Proj.cass = {
  init : function() {
    if (!this.sphere) {
      this.en = Proj4js.common.pj_enfn(this.es)
      this.m0 = Proj4js.common.pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
    }
  },

  C1:	.16666666666666666666,
  C2:	.00833333333333333333,
  C3:	.04166666666666666666,
  C4:	.33333333333333333333,
  C5:	.06666666666666666666,


/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
  forward: function(p) {

    /* Forward equations
      -----------------*/
    var x,y;
    var lam=p.x;
    var phi=p.y;
    lam = Proj4js.common.adjust_lon(lam - this.long0);
    
    if (this.sphere) {
      x = Math.asin(Math.cos(phi) * Math.sin(lam));
      y = Math.atan2(Math.tan(phi) , Math.cos(lam)) - this.phi0;
    } else {
        //ellipsoid
      this.n = Math.sin(phi);
      this.c = Math.cos(phi);
      y = Proj4js.common.pj_mlfn(phi, this.n, this.c, this.en);
      this.n = 1./Math.sqrt(1. - this.es * this.n * this.n);
      this.tn = Math.tan(phi); 
      this.t = this.tn * this.tn;
      this.a1 = lam * this.c;
      this.c *= this.es * this.c / (1 - this.es);
      this.a2 = this.a1 * this.a1;
      x = this.n * this.a1 * (1. - this.a2 * this.t * (this.C1 - (8. - this.t + 8. * this.c) * this.a2 * this.C2));
      y -= this.m0 - this.n * this.tn * this.a2 * (.5 + (5. - this.t + 6. * this.c) * this.a2 * this.C3);
    }
    
    p.x = this.a*x + this.x0;
    p.y = this.a*y + this.y0;
    return p;
  },//cassFwd()

/* Inverse equations
  -----------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x/this.a;
    var y = p.y/this.a;
    var phi, lam;

    if (this.sphere) {
      this.dd = y + this.lat0;
      phi = Math.asin(Math.sin(this.dd) * Math.cos(x));
      lam = Math.atan2(Math.tan(x), Math.cos(this.dd));
    } else {
      /* ellipsoid */
      var ph1 = Proj4js.common.pj_inv_mlfn(this.m0 + y, this.es, this.en);
      this.tn = Math.tan(ph1); 
      this.t = this.tn * this.tn;
      this.n = Math.sin(ph1);
      this.r = 1. / (1. - this.es * this.n * this.n);
      this.n = Math.sqrt(this.r);
      this.r *= (1. - this.es) * this.n;
      this.dd = x / this.n;
      this.d2 = this.dd * this.dd;
      phi = ph1 - (this.n * this.tn / this.r) * this.d2 * (.5 - (1. + 3. * this.t) * this.d2 * this.C3);
      lam = this.dd * (1. + this.t * this.d2 * (-this.C4 + (1. + 3. * this.t) * this.d2 * this.C5)) / Math.cos(ph1);
    }
    p.x = Proj4js.common.adjust_lon(this.long0+lam);
    p.y = phi;
    return p;
  }//cassInv()

}
/* ======================================================================
    projCode/gauss.js
   ====================================================================== */


Proj4js.Proj.gauss = {

  init : function() {
    var sphi = Math.sin(this.lat0);
    var cphi = Math.cos(this.lat0);  
    cphi *= cphi;
    this.rc = Math.sqrt(1.0 - this.es) / (1.0 - this.es * sphi * sphi);
    this.C = Math.sqrt(1.0 + this.es * cphi * cphi / (1.0 - this.es));
    this.phic0 = Math.asin(sphi / this.C);
    this.ratexp = 0.5 * this.C * this.e;
    this.K = Math.tan(0.5 * this.phic0 + Proj4js.common.FORTPI) / (Math.pow(Math.tan(0.5*this.lat0 + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e*sphi, this.ratexp));
  },

  forward : function(p) {
    var lon = p.x;
    var lat = p.y;

    p.y = 2.0 * Math.atan( this.K * Math.pow(Math.tan(0.5 * lat + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e * Math.sin(lat), this.ratexp) ) - Proj4js.common.HALF_PI;
    p.x = this.C * lon;
    return p;
  },

  inverse : function(p) {
    var DEL_TOL = 1e-14;
    var lon = p.x / this.C;
    var lat = p.y;
    var num = Math.pow(Math.tan(0.5 * lat + Proj4js.common.FORTPI)/this.K, 1./this.C);
    for (var i = Proj4js.common.MAX_ITER; i>0; --i) {
      lat = 2.0 * Math.atan(num * Proj4js.common.srat(this.e * Math.sin(p.y), -0.5 * this.e)) - Proj4js.common.HALF_PI;
      if (Math.abs(lat - p.y) < DEL_TOL) break;
      p.y = lat;
    }	
    /* convergence failed */
    if (!i) {
      Proj4js.reportError("gauss:inverse:convergence failed");
      return null;
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
};

/* ======================================================================
    projCode/omerc.js
   ====================================================================== */

/*******************************************************************************
NAME                       OBLIQUE MERCATOR (HOTINE) 

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Oblique Mercator projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/

Proj4js.Proj.omerc = {

  /* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
  init: function() {
    if (!this.mode) this.mode=0;
    if (!this.lon1)   {this.lon1=0;this.mode=1;}
    if (!this.lon2)   this.lon2=0;
    if (!this.lat2)    this.lat2=0;

    /* Place parameters in static storage for common use
      -------------------------------------------------*/
    var temp = this.b/ this.a;
    var es = 1.0 - Math.pow(temp,2);
    var e = Math.sqrt(es);

    this.sin_p20=Math.sin(this.lat0);
    this.cos_p20=Math.cos(this.lat0);

    this.con = 1.0 - this.es * this.sin_p20 * this.sin_p20;
    this.com = Math.sqrt(1.0 - es);
    this.bl = Math.sqrt(1.0 + this.es * Math.pow(this.cos_p20,4.0)/(1.0 - es));
    this.al = this.a * this.bl * this.k0 * this.com / this.con;
    if (Math.abs(this.lat0) < Proj4js.common.EPSLN) {
       this.ts = 1.0;
       this.d = 1.0;
       this.el = 1.0;
    } else {
       this.ts = Proj4js.common.tsfnz(this.e,this.lat0,this.sin_p20);
       this.con = Math.sqrt(this.con);
       this.d = this.bl * this.com / (this.cos_p20 * this.con);
       if ((this.d * this.d - 1.0) > 0.0) {
          if (this.lat0 >= 0.0) {
             this.f = this.d + Math.sqrt(this.d * this.d - 1.0);
          } else {
             this.f = this.d - Math.sqrt(this.d * this.d - 1.0);
          }
       } else {
         this.f = this.d;
       }
       this.el = this.f * Math.pow(this.ts,this.bl);
    }

    //this.longc=52.60353916666667;

    if (this.mode != 0) {
       this.g = .5 * (this.f - 1.0/this.f);
       this.gama = Proj4js.common.asinz(Math.sin(this.alpha) / this.d);
       this.longc= this.longc - Proj4js.common.asinz(this.g * Math.tan(this.gama))/this.bl;

       /* Report parameters common to format B
       -------------------------------------*/
       //genrpt(azimuth * R2D,"Azimuth of Central Line:    ");
       //cenlon(lon_origin);
      // cenlat(lat_origin);

       this.con = Math.abs(this.lat0);
       if ((this.con > Proj4js.common.EPSLN) && (Math.abs(this.con - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN)) {
            this.singam=Math.sin(this.gama);
            this.cosgam=Math.cos(this.gama);

            this.sinaz=Math.sin(this.alpha);
            this.cosaz=Math.cos(this.alpha);

            if (this.lat0>= 0) {
               this.u =  (this.al / this.bl) * Math.atan(Math.sqrt(this.d*this.d - 1.0)/this.cosaz);
            } else {
               this.u =  -(this.al / this.bl) *Math.atan(Math.sqrt(this.d*this.d - 1.0)/this.cosaz);
            }
          } else {
            Proj4js.reportError("omerc:Init:DataError");
          }
       } else {
       this.sinphi =Math. sin(this.at1);
       this.ts1 = Proj4js.common.tsfnz(this.e,this.lat1,this.sinphi);
       this.sinphi = Math.sin(this.lat2);
       this.ts2 = Proj4js.common.tsfnz(this.e,this.lat2,this.sinphi);
       this.h = Math.pow(this.ts1,this.bl);
       this.l = Math.pow(this.ts2,this.bl);
       this.f = this.el/this.h;
       this.g = .5 * (this.f - 1.0/this.f);
       this.j = (this.el * this.el - this.l * this.h)/(this.el * this.el + this.l * this.h);
       this.p = (this.l - this.h) / (this.l + this.h);
       this.dlon = this.lon1 - this.lon2;
       if (this.dlon < -Proj4js.common.PI) this.lon2 = this.lon2 - 2.0 * Proj4js.common.PI;
       if (this.dlon > Proj4js.common.PI) this.lon2 = this.lon2 + 2.0 * Proj4js.common.PI;
       this.dlon = this.lon1 - this.lon2;
       this.longc = .5 * (this.lon1 + this.lon2) -Math.atan(this.j * Math.tan(.5 * this.bl * this.dlon)/this.p)/this.bl;
       this.dlon  = Proj4js.common.adjust_lon(this.lon1 - this.longc);
       this.gama = Math.atan(Math.sin(this.bl * this.dlon)/this.g);
       this.alpha = Proj4js.common.asinz(this.d * Math.sin(this.gama));

       /* Report parameters common to format A
       -------------------------------------*/

       if (Math.abs(this.lat1 - this.lat2) <= Proj4js.common.EPSLN) {
          Proj4js.reportError("omercInitDataError");
          //return(202);
       } else {
          this.con = Math.abs(this.lat1);
       }
       if ((this.con <= Proj4js.common.EPSLN) || (Math.abs(this.con - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN)) {
           Proj4js.reportError("omercInitDataError");
                //return(202);
       } else {
         if (Math.abs(Math.abs(this.lat0) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) {
            Proj4js.reportError("omercInitDataError");
            //return(202);
         }
       }

       this.singam=Math.sin(this.gam);
       this.cosgam=Math.cos(this.gam);

       this.sinaz=Math.sin(this.alpha);
       this.cosaz=Math.cos(this.alpha);  


       if (this.lat0 >= 0) {
          this.u =  (this.al/this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1.0)/this.cosaz);
       } else {
          this.u = -(this.al/this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1.0)/this.cosaz);
       }
     }
  },


  /* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
  forward: function(p) {
    var theta;		/* angle					*/
    var sin_phi, cos_phi;/* sin and cos value				*/
    var b;		/* temporary values				*/
    var c, t, tq;	/* temporary values				*/
    var con, n, ml;	/* cone constant, small m			*/
    var q,us,vl;
    var ul,vs;
    var s;
    var dlon;
    var ts1;

    var lon=p.x;
    var lat=p.y;
    /* Forward equations
      -----------------*/
    sin_phi = Math.sin(lat);
    dlon = Proj4js.common.adjust_lon(lon - this.longc);
    vl = Math.sin(this.bl * dlon);
    if (Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN) {
       ts1 = Proj4js.common.tsfnz(this.e,lat,sin_phi);
       q = this.el / (Math.pow(ts1,this.bl));
       s = .5 * (q - 1.0 / q);
       t = .5 * (q + 1.0/ q);
       ul = (s * this.singam - vl * this.cosgam) / t;
       con = Math.cos(this.bl * dlon);
       if (Math.abs(con) < .0000001) {
          us = this.al * this.bl * dlon;
       } else {
          us = this.al * Math.atan((s * this.cosgam + vl * this.singam) / con)/this.bl;
          if (con < 0) us = us + Proj4js.common.PI * this.al / this.bl;
       }
    } else {
       if (lat >= 0) {
          ul = this.singam;
       } else {
          ul = -this.singam;
       }
       us = this.al * lat / this.bl;
    }
    if (Math.abs(Math.abs(ul) - 1.0) <= Proj4js.common.EPSLN) {
       //alert("Point projects into infinity","omer-for");
       Proj4js.reportError("omercFwdInfinity");
       //return(205);
    }
    vs = .5 * this.al * Math.log((1.0 - ul)/(1.0 + ul)) / this.bl;
    us = us - this.u;
    var x = this.x0 + vs * this.cosaz + us * this.sinaz;
    var y = this.y0 + us * this.cosaz - vs * this.sinaz;

    p.x=x;
    p.y=y;
    return p;
  },

  inverse: function(p) {
    var delta_lon;	/* Delta longitude (Given longitude - center 	*/
    var theta;		/* angle					*/
    var delta_theta;	/* adjusted longitude				*/
    var sin_phi, cos_phi;/* sin and cos value				*/
    var b;		/* temporary values				*/
    var c, t, tq;	/* temporary values				*/
    var con, n, ml;	/* cone constant, small m			*/
    var vs,us,q,s,ts1;
    var vl,ul,bs;
    var lon, lat;
    var flag;

    /* Inverse equations
      -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    flag = 0;
    vs = p.x * this.cosaz - p.y * this.sinaz;
    us = p.y * this.cosaz + p.x * this.sinaz;
    us = us + this.u;
    q = Math.exp(-this.bl * vs / this.al);
    s = .5 * (q - 1.0/q);
    t = .5 * (q + 1.0/q);
    vl = Math.sin(this.bl * us / this.al);
    ul = (vl * this.cosgam + s * this.singam)/t;
    if (Math.abs(Math.abs(ul) - 1.0) <= Proj4js.common.EPSLN)
       {
       lon = this.longc;
       if (ul >= 0.0) {
          lat = Proj4js.common.HALF_PI;
       } else {
         lat = -Proj4js.common.HALF_PI;
       }
    } else {
       con = 1.0 / this.bl;
       ts1 =Math.pow((this.el / Math.sqrt((1.0 + ul) / (1.0 - ul))),con);
       lat = Proj4js.common.phi2z(this.e,ts1);
       //if (flag != 0)
          //return(flag);
       //~ con = Math.cos(this.bl * us /al);
       theta = this.longc - Math.atan2((s * this.cosgam - vl * this.singam) , con)/this.bl;
       lon = Proj4js.common.adjust_lon(theta);
    }
    p.x=lon;
    p.y=lat;
    return p;
  }
};
/* ======================================================================
    projCode/lcc.js
   ====================================================================== */

/*******************************************************************************
NAME                            LAMBERT CONFORMAL CONIC

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Lambert Conformal Conic projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.


ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
*******************************************************************************/


//<2104> +proj=lcc +lat_1=10.16666666666667 +lat_0=10.16666666666667 +lon_0=-71.60561777777777 +k_0=1 +x0=-17044 +x0=-23139.97 +ellps=intl +units=m +no_defs  no_defs

// Initialize the Lambert Conformal conic projection
// -----------------------------------------------------------------

//Proj4js.Proj.lcc = Class.create();
Proj4js.Proj.lcc = {
  init : function() {

    // array of:  r_maj,r_min,lat1,lat2,c_lon,c_lat,false_east,false_north
    //double c_lat;                   /* center latitude                      */
    //double c_lon;                   /* center longitude                     */
    //double lat1;                    /* first standard parallel              */
    //double lat2;                    /* second standard parallel             */
    //double r_maj;                   /* major axis                           */
    //double r_min;                   /* minor axis                           */
    //double false_east;              /* x offset in meters                   */
    //double false_north;             /* y offset in meters                   */

      if (!this.lat2){this.lat2=this.lat0;}//if lat2 is not defined
      if (!this.k0) this.k0 = 1.0;

    // Standard Parallels cannot be equal and on opposite sides of the equator
      if (Math.abs(this.lat1+this.lat2) < Proj4js.common.EPSLN) {
        Proj4js.reportError("lcc:init: Equal Latitudes");
        return;
      }

      var temp = this.b / this.a;
      this.e = Math.sqrt(1.0 - temp*temp);

      var sin1 = Math.sin(this.lat1);
      var cos1 = Math.cos(this.lat1);
      var ms1 = Proj4js.common.msfnz(this.e, sin1, cos1);
      var ts1 = Proj4js.common.tsfnz(this.e, this.lat1, sin1);

      var sin2 = Math.sin(this.lat2);
      var cos2 = Math.cos(this.lat2);
      var ms2 = Proj4js.common.msfnz(this.e, sin2, cos2);
      var ts2 = Proj4js.common.tsfnz(this.e, this.lat2, sin2);

      var ts0 = Proj4js.common.tsfnz(this.e, this.lat0, Math.sin(this.lat0));

      if (Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN) {
        this.ns = Math.log(ms1/ms2)/Math.log(ts1/ts2);
      } else {
        this.ns = sin1;
      }
      this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
      this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
      if (!this.title) this.title = "Lambert Conformal Conic";
    },


    // Lambert Conformal conic forward equations--mapping lat,long to x,y
    // -----------------------------------------------------------------
    forward : function(p) {

      var lon = p.x;
      var lat = p.y;

    // convert to radians
      if ( lat <= 90.0 && lat >= -90.0 && lon <= 180.0 && lon >= -180.0) {
        //lon = lon * Proj4js.common.D2R;
        //lat = lat * Proj4js.common.D2R;
      } else {
        Proj4js.reportError("lcc:forward: llInputOutOfRange: "+ lon +" : " + lat);
        return null;
      }

      var con  = Math.abs( Math.abs(lat) - Proj4js.common.HALF_PI);
      var ts, rh1;
      if (con > Proj4js.common.EPSLN) {
        ts = Proj4js.common.tsfnz(this.e, lat, Math.sin(lat) );
        rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
      } else {
        con = lat * this.ns;
        if (con <= 0) {
          Proj4js.reportError("lcc:forward: No Projection");
          return null;
        }
        rh1 = 0;
      }
      var theta = this.ns * Proj4js.common.adjust_lon(lon - this.long0);
      p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
      p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

      return p;
    },

  // Lambert Conformal Conic inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  inverse : function(p) {

    var rh1, con, ts;
    var lat, lon;
    var x = (p.x - this.x0)/this.k0;
    var y = (this.rh - (p.y - this.y0)/this.k0);
    if (this.ns > 0) {
      rh1 = Math.sqrt (x * x + y * y);
      con = 1.0;
    } else {
      rh1 = -Math.sqrt (x * x + y * y);
      con = -1.0;
    }
    var theta = 0.0;
    if (rh1 != 0) {
      theta = Math.atan2((con * x),(con * y));
    }
    if ((rh1 != 0) || (this.ns > 0.0)) {
      con = 1.0/this.ns;
      ts = Math.pow((rh1/(this.a * this.f0)), con);
      lat = Proj4js.common.phi2z(this.e, ts);
      if (lat == -9999) return null;
    } else {
      lat = -Proj4js.common.HALF_PI;
    }
    lon = Proj4js.common.adjust_lon(theta/this.ns + this.long0);

    p.x = lon;
    p.y = lat;
    return p;
  }
};




/* ======================================================================
    projCode/laea.js
   ====================================================================== */

/*******************************************************************************
NAME                  LAMBERT AZIMUTHAL EQUAL-AREA
 
PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Lambert Azimuthal Equal-Area projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE            
----------              ----           
D. Steinwand, EROS      March, 1991   

This function was adapted from the Lambert Azimuthal Equal Area projection
code (FORTRAN) in the General Cartographic Transformation Package software
which is available from the U.S. Geological Survey National Mapping Division.
 
ALGORITHM REFERENCES

1.  "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.

2.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

3.  "Software Documentation for GCTP General Cartographic Transformation
    Package", U.S. Geological Survey National Mapping Division, May 1982.
*******************************************************************************/

Proj4js.Proj.laea = {
  S_POLE: 1,
  N_POLE: 2,
  EQUIT: 3,
  OBLIQ: 4,


/* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
  init: function() {
    var t = Math.abs(this.lat0);
    if (Math.abs(t - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) {
      this.mode = this.lat0 < 0. ? this.S_POLE : this.N_POLE;
    } else if (Math.abs(t) < Proj4js.common.EPSLN) {
      this.mode = this.EQUIT;
    } else {
      this.mode = this.OBLIQ;
    }
    if (this.es > 0) {
      var sinphi;
  
      this.qp = Proj4js.common.qsfnz(this.e, 1.0);
      this.mmf = .5 / (1. - this.es);
      this.apa = this.authset(this.es);
      switch (this.mode) {
        case this.N_POLE:
        case this.S_POLE:
          this.dd = 1.;
          break;
        case this.EQUIT:
          this.rq = Math.sqrt(.5 * this.qp);
          this.dd = 1. / this.rq;
          this.xmf = 1.;
          this.ymf = .5 * this.qp;
          break;
        case this.OBLIQ:
          this.rq = Math.sqrt(.5 * this.qp);
          sinphi = Math.sin(this.lat0);
          this.sinb1 = Proj4js.common.qsfnz(this.e, sinphi) / this.qp;
          this.cosb1 = Math.sqrt(1. - this.sinb1 * this.sinb1);
          this.dd = Math.cos(this.lat0) / (Math.sqrt(1. - this.es * sinphi * sinphi) * this.rq * this.cosb1);
          this.ymf = (this.xmf = this.rq) / this.dd;
          this.xmf *= this.dd;
          break;
      }
    } else {
      if (this.mode == this.OBLIQ) {
        this.sinph0 = Math.sin(this.lat0);
        this.cosph0 = Math.cos(this.lat0);
      }
    }
  },

/* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
  forward: function(p) {

    /* Forward equations
      -----------------*/
    var x,y;
    var lam=p.x;
    var phi=p.y;
    lam = Proj4js.common.adjust_lon(lam - this.long0);
    
    if (this.sphere) {
        var coslam, cosphi, sinphi;
      
        sinphi = Math.sin(phi);
        cosphi = Math.cos(phi);
        coslam = Math.cos(lam);
        switch (this.mode) {
          case this.OBLIQ:
          case this.EQUIT:
            y = (this.mode == this.EQUIT) ? 1. + cosphi * coslam : 1. + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
            if (y <= Proj4js.common.EPSLN) {
              Proj4js.reportError("laea:fwd:y less than eps");
              return null;
            }
            y = Math.sqrt(2. / y);
            x = y * cosphi * Math.sin(lam);
            y *= (this.mode == this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
            break;
          case this.N_POLE:
            coslam = -coslam;
          case this.S_POLE:
            if (Math.abs(phi + this.phi0) < Proj4js.common.EPSLN) {
              Proj4js.reportError("laea:fwd:phi < eps");
              return null;
            }
            y = Proj4js.common.FORTPI - phi * .5;
            y = 2. * ((this.mode == this.S_POLE) ? Math.cos(y) : Math.sin(y));
            x = y * Math.sin(lam);
            y *= coslam;
            break;
        }
    } else {
        var coslam, sinlam, sinphi, q, sinb=0.0, cosb=0.0, b=0.0;
      
        coslam = Math.cos(lam);
        sinlam = Math.sin(lam);
        sinphi = Math.sin(phi);
        q = Proj4js.common.qsfnz(this.e, sinphi);
        if (this.mode == this.OBLIQ || this.mode == this.EQUIT) {
          sinb = q / this.qp;
          cosb = Math.sqrt(1. - sinb * sinb);
        }
        switch (this.mode) {
          case this.OBLIQ:
            b = 1. + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
            break;
          case this.EQUIT:
            b = 1. + cosb * coslam;
            break;
          case this.N_POLE:
            b = Proj4js.common.HALF_PI + phi;
            q = this.qp - q;
            break;
          case this.S_POLE:
            b = phi - Proj4js.common.HALF_PI;
            q = this.qp + q;
            break;
        }
        if (Math.abs(b) < Proj4js.common.EPSLN) {
            Proj4js.reportError("laea:fwd:b < eps");
            return null;
        }
        switch (this.mode) {
          case this.OBLIQ:
          case this.EQUIT:
            b = Math.sqrt(2. / b);
            if (this.mode == this.OBLIQ) {
              y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
            } else {
              y = (b = Math.sqrt(2. / (1. + cosb * coslam))) * sinb * this.ymf;
            }
            x = this.xmf * b * cosb * sinlam;
            break;
          case this.N_POLE:
          case this.S_POLE:
            if (q >= 0.) {
              x = (b = Math.sqrt(q)) * sinlam;
              y = coslam * ((this.mode == this.S_POLE) ? b : -b);
            } else {
              x = y = 0.;
            }
            break;
        }
    }

    //v 1.0
    /*
    var sin_lat=Math.sin(lat);
    var cos_lat=Math.cos(lat);

    var sin_delta_lon=Math.sin(delta_lon);
    var cos_delta_lon=Math.cos(delta_lon);

    var g =this.sin_lat_o * sin_lat +this.cos_lat_o * cos_lat * cos_delta_lon;
    if (g == -1.0) {
      Proj4js.reportError("laea:fwd:Point projects to a circle of radius "+ 2.0 * R);
      return null;
    }
    var ksp = this.a * Math.sqrt(2.0 / (1.0 + g));
    var x = ksp * cos_lat * sin_delta_lon + this.x0;
    var y = ksp * (this.cos_lat_o * sin_lat - this.sin_lat_o * cos_lat * cos_delta_lon) + this.y0;
    */
    p.x = this.a*x + this.x0;
    p.y = this.a*y + this.y0;
    return p;
  },//lamazFwd()

/* Inverse equations
  -----------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x/this.a;
    var y = p.y/this.a;
    var lam, phi;

    if (this.sphere) {
        var  cosz=0.0, rh, sinz=0.0;
      
        rh = Math.sqrt(x*x + y*y);
        phi = rh * .5;
        if (phi > 1.) {
          Proj4js.reportError("laea:Inv:DataError");
          return null;
        }
        phi = 2. * Math.asin(phi);
        if (this.mode == this.OBLIQ || this.mode == this.EQUIT) {
          sinz = Math.sin(phi);
          cosz = Math.cos(phi);
        }
        switch (this.mode) {
        case this.EQUIT:
          phi = (Math.abs(rh) <= Proj4js.common.EPSLN) ? 0. : Math.asin(y * sinz / rh);
          x *= sinz;
          y = cosz * rh;
          break;
        case this.OBLIQ:
          phi = (Math.abs(rh) <= Proj4js.common.EPSLN) ? this.phi0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
          x *= sinz * this.cosph0;
          y = (cosz - Math.sin(phi) * this.sinph0) * rh;
          break;
        case this.N_POLE:
          y = -y;
          phi = Proj4js.common.HALF_PI - phi;
          break;
        case this.S_POLE:
          phi -= Proj4js.common.HALF_PI;
          break;
        }
        lam = (y == 0. && (this.mode == this.EQUIT || this.mode == this.OBLIQ)) ? 0. : Math.atan2(x, y);
    } else {
        var cCe, sCe, q, rho, ab=0.0;
      
        switch (this.mode) {
          case this.EQUIT:
          case this.OBLIQ:
            x /= this.dd;
            y *=  this.dd;
            rho = Math.sqrt(x*x + y*y);
            if (rho < Proj4js.common.EPSLN) {
              p.x = 0.;
              p.y = this.phi0;
              return p;
            }
            sCe = 2. * Math.asin(.5 * rho / this.rq);
            cCe = Math.cos(sCe);
            x *= (sCe = Math.sin(sCe));
            if (this.mode == this.OBLIQ) {
              ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho
              q = this.qp * ab;
              y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
            } else {
              ab = y * sCe / rho;
              q = this.qp * ab;
              y = rho * cCe;
            }
            break;
          case this.N_POLE:
            y = -y;
          case this.S_POLE:
            q = (x * x + y * y);
            if (!q ) {
              p.x = 0.;
              p.y = this.phi0;
              return p;
            }
            /*
            q = this.qp - q;
            */
            ab = 1. - q / this.qp;
            if (this.mode == this.S_POLE) {
              ab = - ab;
            }
            break;
        }
        lam = Math.atan2(x, y);
        phi = this.authlat(Math.asin(ab), this.apa);
    }

    /*
    var Rh = Math.Math.sqrt(p.x *p.x +p.y * p.y);
    var temp = Rh / (2.0 * this.a);

    if (temp > 1) {
      Proj4js.reportError("laea:Inv:DataError");
      return null;
    }

    var z = 2.0 * Proj4js.common.asinz(temp);
    var sin_z=Math.sin(z);
    var cos_z=Math.cos(z);

    var lon =this.long0;
    if (Math.abs(Rh) > Proj4js.common.EPSLN) {
       var lat = Proj4js.common.asinz(this.sin_lat_o * cos_z +this. cos_lat_o * sin_z *p.y / Rh);
       var temp =Math.abs(this.lat0) - Proj4js.common.HALF_PI;
       if (Math.abs(temp) > Proj4js.common.EPSLN) {
          temp = cos_z -this.sin_lat_o * Math.sin(lat);
          if(temp!=0.0) lon=Proj4js.common.adjust_lon(this.long0+Math.atan2(p.x*sin_z*this.cos_lat_o,temp*Rh));
       } else if (this.lat0 < 0.0) {
          lon = Proj4js.common.adjust_lon(this.long0 - Math.atan2(-p.x,p.y));
       } else {
          lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
       }
    } else {
      lat = this.lat0;
    }
    */
    //return(OK);
    p.x = Proj4js.common.adjust_lon(this.long0+lam);
    p.y = phi;
    return p;
  },//lamazInv()
  
/* determine latitude from authalic latitude */
  P00: .33333333333333333333,
  P01: .17222222222222222222,
  P02: .10257936507936507936,
  P10: .06388888888888888888,
  P11: .06640211640211640211,
  P20: .01641501294219154443,
  
  authset: function(es) {
    var t;
    var APA = new Array();
    APA[0] = es * this.P00;
    t = es * es;
    APA[0] += t * this.P01;
    APA[1] = t * this.P10;
    t *= es;
    APA[0] += t * this.P02;
    APA[1] += t * this.P11;
    APA[2] = t * this.P20;
    return APA;
  },
  
  authlat: function(beta, APA) {
    var t = beta+beta;
    return(beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t+t) + APA[2] * Math.sin(t+t+t));
  }
  
};



/* ======================================================================
    projCode/aeqd.js
   ====================================================================== */

Proj4js.Proj.aeqd = {

  init : function() {
    this.sin_p12=Math.sin(this.lat0);
    this.cos_p12=Math.cos(this.lat0);
  },

  forward: function(p) {
    var lon=p.x;
    var lat=p.y;
    var ksp;

    var sinphi=Math.sin(p.y);
    var cosphi=Math.cos(p.y); 
    var dlon = Proj4js.common.adjust_lon(lon - this.long0);
    var coslon = Math.cos(dlon);
    var g = this.sin_p12 * sinphi + this.cos_p12 * cosphi * coslon;
    if (Math.abs(Math.abs(g) - 1.0) < Proj4js.common.EPSLN) {
       ksp = 1.0;
       if (g < 0.0) {
         Proj4js.reportError("aeqd:Fwd:PointError");
         return;
       }
    } else {
       var z = Math.acos(g);
       ksp = z/Math.sin(z);
    }
    p.x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon);
    p.y = this.y0 + this.a * ksp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * coslon);
    return p;
  },

  inverse: function(p){
    p.x -= this.x0;
    p.y -= this.y0;

    var rh = Math.sqrt(p.x * p.x + p.y *p.y);
    if (rh > (2.0 * Proj4js.common.HALF_PI * this.a)) {
       Proj4js.reportError("aeqdInvDataError");
       return;
    }
    var z = rh / this.a;

    var sinz=Math.sin(z);
    var cosz=Math.cos(z);

    var lon = this.long0;
    var lat;
    if (Math.abs(rh) <= Proj4js.common.EPSLN) {
      lat = this.lat0;
    } else {
      lat = Proj4js.common.asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
      var con = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
      if (Math.abs(con) <= Proj4js.common.EPSLN) {
        if (this.lat0 >= 0.0) {
          lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2(p.x , -p.y));
        } else {
          lon = Proj4js.common.adjust_lon(this.long0 - Math.atan2(-p.x , p.y));
        }
      } else {
        con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < Proj4js.common.EPSLN) && (Math.abs(p.x) < Proj4js.common.EPSLN)) {
           //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  } 
};
/* ======================================================================
    projCode/moll.js
   ====================================================================== */

/*******************************************************************************
NAME                            MOLLWEIDE

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the MOllweide projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE
----------              ----
D. Steinwand, EROS      May, 1991;  Updated Sept, 1992; Updated Feb, 1993
S. Nelson, EDC		Jun, 2993;	Made corrections in precision and
					number of iterations.

ALGORITHM REFERENCES

1.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.

2.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.
*******************************************************************************/

Proj4js.Proj.moll = {

  /* Initialize the Mollweide projection
    ------------------------------------*/
  init: function(){
    //no-op
  },

  /* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
  forward: function(p) {

    /* Forward equations
      -----------------*/
    var lon=p.x;
    var lat=p.y;

    var delta_lon = Proj4js.common.adjust_lon(lon - this.long0);
    var theta = lat;
    var con = Proj4js.common.PI * Math.sin(lat);

    /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
    for (var i=0;true;i++) {
       var delta_theta = -(theta + Math.sin(theta) - con)/ (1.0 + Math.cos(theta));
       theta += delta_theta;
       if (Math.abs(delta_theta) < Proj4js.common.EPSLN) break;
       if (i >= 50) {
          Proj4js.reportError("moll:Fwd:IterationError");
         //return(241);
       }
    }
    theta /= 2.0;

    /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
    if (Proj4js.common.PI/2 - Math.abs(lat) < Proj4js.common.EPSLN) delta_lon =0;
    var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
    var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

    p.x=x;
    p.y=y;
    return p;
  },

  inverse: function(p){
    var theta;
    var arg;

    /* Inverse equations
      -----------------*/
    p.x-= this.x0;
    //~ p.y -= this.y0;
    var arg = p.y /  (1.4142135623731 * this.a);

    /* Because of division by zero problems, 'arg' can not be 1.0.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
    if(Math.abs(arg) > 0.999999999999) arg=0.999999999999;
    var theta =Math.asin(arg);
    var lon = Proj4js.common.adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
    if(lon < (-Proj4js.common.PI)) lon= -Proj4js.common.PI;
    if(lon > Proj4js.common.PI) lon= Proj4js.common.PI;
    arg = (2.0 * theta + Math.sin(2.0 * theta)) / Proj4js.common.PI;
    if(Math.abs(arg) > 1.0)arg=1.0;
    var lat = Math.asin(arg);
    //return(OK);

    p.x=lon;
    p.y=lat;
    return p;
  }
};

