YUI.add('swfdetect', function(Y) {

/**
 * Utility for Flash version detection
 * @module swfdetect
 */

// shortcuts
var version = 0,
	uA = Y.UA,
	lG = Y.Lang,
	sF = "ShockwaveFlash",
	mF, eP, vS, ax6, ax;

function makeInt(n) {
	return parseInt(n, 10);
}

function parseFlashVersion (flashVer) {
	if (lG.isNumber(makeInt(flashVer[0]))) {
		uA.flashMajor = flashVer[0];
	}
	
	if (lG.isNumber(makeInt(flashVer[1]))) {
		uA.flashMinor = flashVer[1];
	}
	
	if (lG.isNumber(makeInt(flashVer[2]))) {
		uA.flashRev = flashVer[2];
	}
}

if (uA.gecko || uA.webkit || uA.opera) {
   if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {
      if ((eP = mF.enabledPlugin)) {
         vS = eP.description.replace(/\s[rd]/g, '.').replace(/[A-Za-z\s]+/g, '').split('.');
		 parseFlashVersion(vS);
      }
   }
}
else if(uA.ie) {
    try
    {
        ax6 = new ActiveXObject(sF + "." + sF + ".6");
        ax6.AllowScriptAccess = "always";
    }
    catch (e)
    {
        if(ax6 !== null)
        {
            version = 6.0;
        }
    }
    if (version === 0) {
    try
    {
        ax = new ActiveXObject(sF + "." + sF);
        vS = ax.GetVariable("$version").replace(/[A-Za-z\s]+/g, '').split(',');
        parseFlashVersion(vS);
    } catch (e2) {}
    }
}

		
Y.SWFDetect = {		
	getFlashVersion : function () {
		return (String(uA.flashMajor) + "." + String(uA.flashMinor) + "." + String(uA.flashRev));
	},
	
	isFlashVersionAtLeast : function (flashMajor, flashMinor, flashRev) {
		var uaMajor    = makeInt(uA.flashMajor),
			uaMinor    = makeInt(uA.flashMinor),
			uaRev      = makeInt(uA.flashRev);
			
		flashMajor = makeInt(flashMajor || 0);
		flashMinor = makeInt(flashMinor || 0);
		flashRev   = makeInt(flashRev || 0);

		if (flashMajor === uaMajor) {
			if (flashMinor === uaMinor) {
				return flashRev <= uaRev;
			}
			return flashMinor < uaMinor;
		}
		return flashMajor < uaMajor;
	}			
};


}, '@VERSION@' );
