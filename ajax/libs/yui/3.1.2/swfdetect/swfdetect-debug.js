YUI.add('swfdetect', function(Y) {

/**
 * Utility for Flash version detection
 * @module swfdetect
 */

// shortcuts
var version = 0;
var uA = Y.UA;
var lG = Y.Lang;
var sF = "ShockwaveFlash";

function parseFlashVersion (flashVer) {
	if (lG.isNumber(parseInt(flashVer[0]))) {
		uA.flashMajor = flashVer[0];
	}
	
	if (lG.isNumber(parseInt(flashVer[1]))) {
		uA.flashMinor = flashVer[1];
	}
	
	if (lG.isNumber(parseInt(flashVer[2]))) {
		uA.flashRev = flashVer[2];
	}
}

if (uA.gecko || uA.webkit || uA.opera) {
		   if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {
		      if ((eP = mF.enabledPlugin)) {
				 var vS = [];
		         vS = eP.description.replace(/\s[rd]/g, '.').replace(/[A-Za-z\s]+/g, '').split('.');
				 Y.log(vS[0]);
				 parseFlashVersion(vS);
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
		        parseFlashVersion(vS);
		    } catch (e) {}
		    }
		}

		
Y.SWFDetect = {		
		getFlashVersion : function () {
			return (String(uA.flashMajor) + "." + String(uA.flashMinor) + "." + String(uA.flashRev));
		},
		
		isFlashVersionAtLeast : function (flashMajor, flashMinor, flashRev) {

			if (flashMajor < uA.flashMajor) {
				return true;
			}
			else if (flashMajor > uA.flashMajor) {
				return false;
			}
			else {
				if (flashMinor < uA.flashMinor) {
					return true;
				}
				else if (flashMinor > uA.flashMinor) {
					return false;
				}
				else {
					if (flashRev <= uA.flashRev) {
						return true;
					}
					else {
						return false;
					}
				}
			}
			
			return false;
		}			
	};


}, '@VERSION@' );
