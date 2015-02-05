/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Utility for Flash version detection
 * @namespace YAHOO.util
 * @module swfdetect
 */
YAHOO.namespace("util");

/**
 * Flafh detection utility.
 * @class SWFDetect
 * @static
 */
(function () {
	
var version = 0;
var uA = YAHOO.env.ua;
var sF = "ShockwaveFlash";
var mF, eP;

 	if (uA.gecko || uA.webkit || uA.opera) {
		   if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {
		      if ((eP = mF.enabledPlugin)) {
				 var vS = [];
		         vS = eP.description.replace(/\s[rd]/g, '.').replace(/[A-Za-z\s]+/g, '').split('.');
		        version = vS[0] + '.';
				switch((vS[2].toString()).length)
				{
					case 1:
					version += "00";
					break;
					case 2: 
					version += "0";
					break;
				}
		 		version +=  vS[2];
				version = parseFloat(version);
		      }
		   }
		}
		else if(uA.ie) {
		    try
		    {
		        var ax6 = new ActiveXObject(sF + "." + sF + ".6");
		        ax6.AllowScriptAccess = "always";
		    }
		    catch(e)
		    {
		        if(ax6 != null)
		        {
		            version = 6.0;
		        }
		    }
		    if (version == 0) {
		    try
		    {
		        var ax  = new ActiveXObject(sF + "." + sF);
		       	var vS = [];
		        vS = ax.GetVariable("$version").replace(/[A-Za-z\s]+/g, '').split(',');
		        version = vS[0] + '.';
				switch((vS[2].toString()).length)
				{
					case 1:
					version += "00";
					break;
					case 2: 
					version += "0";
					break;
				}
		 		version +=  vS[2];
				version = parseFloat(version);
				
		    } catch (e) {}
		    }
		}
		
		uA.flash = version;
		
YAHOO.util.SWFDetect = {		
		getFlashVersion : function () {
			return version;
		},
		
		isFlashVersionAtLeast : function (ver) {
			return version >= ver;
		},
		
		parseFlashVersion : function (ver)
		{
			var flashVersion = ver;
			if(YAHOO.lang.isString(ver))
			{
				var verSplit = ver.split(".");
				if(verSplit.length > 2)
				{
					flashVersion = parseInt(verSplit[0]);
					flashVersion += parseInt(verSplit[2]) * .001;
				}
				else
				{
					flashVersion = parseFloat(ver);
				}					
			}
			return YAHOO.lang.isNumber(flashVersion) ? flashVersion : null;
		}			
	};
})();
YAHOO.register("swfdetect", YAHOO.util.SWFDetect, {version: "2.9.0", build: "2800"});
