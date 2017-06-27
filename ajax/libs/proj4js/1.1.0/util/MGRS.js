/*
Portions of this software are based on a port of components from the OpenMap
com.bbn.openmap.proj.coords Java package. An initial port was initially created
by Patrice G. Cappelaere and included in Community Mapbuilder
(http://svn.codehaus.org/mapbuilder/), which is licensed under the LGPL license
as per http://www.gnu.org/copyleft/lesser.html. OpenMap is licensed under the
following license agreement:


               OpenMap Software License Agreement
               ----------------------------------

This Agreement sets forth the terms and conditions under which
the software known as OpenMap(tm) will be licensed by BBN
Technologies ("BBN") to you ("Licensee"), and by which Derivative 
Works (as hereafter defined) of OpenMap will be licensed by you to BBN.

Definitions:

 "Derivative Work(s)" shall mean any revision, enhancement,
 modification, translation, abridgement, condensation or
 expansion created by Licensee or BBN that is based upon the
 Software or a portion thereof that would be a copyright
 infringement if prepared without the authorization of the
 copyright owners of the Software or portion thereof.

 "OpenMap" shall mean a programmer's toolkit for building map
 based applications as originally created by BBN, and any
 Derivative Works thereof as created by either BBN or Licensee,
 but shall include only those Derivative Works BBN has approved
 for inclusion into, and BBN has integrated into OpenMap.

 "Standard Version" shall mean OpenMap, as originally created by
 BBN.

 "Software" shall mean OpenMap and the Derivative Works created
 by Licensee and the collection of files distributed by the
 Licensee with OpenMap, and the collection of files created
 through textual modifications.

 "Copyright Holder" is whoever is named in the copyright or
 copyrights for the Derivative Works.

 "Licensee" is you, only if you agree to be bound by the terms
 and conditions set forth in this Agreement.

 "Reasonable copying fee" is whatever you can justify on the
 basis of media cost, duplication charges, time of people
 involved.

 "Freely Available" means that no fee is charged for the item
 itself, though there may be fees involved in handling the item.
 It also means that recipients of the item may redistribute it
 under the same conditions that they received it.

1. BBN maintains all rights, title and interest in and to
OpenMap, including all applicable copyrights, trade secrets,
patents and other intellectual rights therein.  Licensee hereby
grants to BBN all right, title and interest into the compilation
of OpenMap.  Licensee shall own all rights, title and interest
into the Derivative Works created by Licensee (subject to the
compilation ownership by BBN).

2. BBN hereby grants to Licensee a royalty free, worldwide right
and license to use, copy, distribute and make Derivative Works of
OpenMap, and sublicensing rights of any of the foregoing in
accordance with the terms and conditions of this Agreement,
provided that you duplicate all of the original copyright notices
and associated disclaimers.

3. Licensee hereby grants to BBN a royalty free, worldwide right
and license to use, copy, distribute and make Derivative Works of
Derivative Works created by Licensee and sublicensing rights of
any of the foregoing.

4. Licensee's right to create Derivative Works in the Software is
subject to Licensee agreement to insert a prominent notice in
each changed file stating how and when you changed that file, and
provided that you do at least ONE of the following:

    a) place your modifications in the Public Domain or otherwise
       make them Freely Available, such as by posting said
       modifications to Usenet or an equivalent medium, or
       placing the modifications on a major archive site and by
       providing your modifications to the Copyright Holder.

    b) use the modified Package only within your corporation or
       organization.

    c) rename any non-standard executables so the names do not
       conflict with standard executables, which must also be
       provided, and provide a separate manual page for each
       non-standard executable that clearly documents how it
       differs from OpenMap.

    d) make other distribution arrangements with the Copyright
       Holder.

5. Licensee may distribute the programs of this Software in
object code or executable form, provided that you do at least ONE
of the following:

    a) distribute an OpenMap version of the executables and
       library files, together with instructions (in the manual
       page or equivalent) on where to get OpenMap.

    b) accompany the distribution with the machine-readable
       source code with your modifications.

    c) accompany any non-standard executables with their
       corresponding OpenMap executables, giving the non-standard
       executables non-standard names, and clearly documenting
       the differences in manual pages (or equivalent), together
       with instructions on where to get OpenMap.

    d) make other distribution arrangements with the Copyright
       Holder.

6. You may charge a reasonable copying fee for any distribution
of this Software.  You may charge any fee you choose for support
of this Software.  You may not charge a fee for this Software
itself.  However, you may distribute this Software in aggregate
with other (possibly commercial) programs as part of a larger
(possibly commercial) software distribution provided that you do
not advertise this Software as a product of your own.

7. The data and images supplied as input to or produced as output
from the Software do not automatically fall under the copyright
of this Software, but belong to whomever generated them, and may
be sold commercially, and may be aggregated with this Software.

8. BBN makes no representation about the suitability of OpenMap
for any purposes.  BBN shall have no duty or requirement to
include any Derivative Works into OpenMap.

9. Each party hereto represents and warrants that they have the
full unrestricted right to grant all rights and licenses granted
to the other party herein.

10. THIS PACKAGE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY
KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING (BUT NOT LIMITED TO)
ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, AND
WITHOUT ANY WARRANTIES AS TO NONINFRINGEMENT.

11. IN NO EVENT SHALL COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT,
SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING
FROM LOSS OF USE OF DATA OR PROFITS, WHETHER IN AN ACTION OF
CONTRACT, NEGLIGENCE OR OTHER TORTIOUS CONDUCT, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS PACKAGE.

12. Without limitation of the foregoing, You agree to commit no
act which, directly or indirectly, would violate any U.S. law,
regulation, or treaty, or any other international treaty or
agreement to which the United States adheres or with which the
United States complies, relating to the export or re-export of
any commodities, software, or technical data.
*/

if (window.Proj4js && !Proj4js.util) { Proj4js.util = {}; }

/**
 * Converts between lat/lon and MGRS coordinates. Note that this static class
 * is restricted to the WGS84 ellipsoid and does not support MGRS notations
 * for polar regions (i.e. above 84° North and below 80° South).
 *
 * If Proj4js is loaded, this will be referenced as Proj4js.util.MGRS. If used
 * standalone, it will be referenced as window.MGRS.
 *
 * @static
 */
(window.Proj4js ? Proj4js.util : window)["MGRS"] = (function() {

    /**
     * UTM zones are grouped, and assigned to one of a group of 6
     * sets.
     *
     * {int} @private
     */
    var NUM_100K_SETS = 6;

    /**
     * The column letters (for easting) of the lower left value, per
     * set.
     *
     * {string} @private
     */
    var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

    /**
     * The row letters (for northing) of the lower left value, per
     * set.
     *
     * {string} @private
     */
    var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

    var A = 65;	// A
    var I = 73;	// I
    var O = 79;	// O
    var V = 86;	// V
    var Z = 90;	// Z

	/**
	 * Conversion of lat/lon to MGRS.
	 *
	 * @param {object} ll Object literal with lat and lon properties on a
	 *     WGS84 ellipsoid.
	 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
	 *      100 m, 4 for 1000 m or 5 for 10000 m). Optional, default is 5.
	 * @return {string} the MGRS string for the given location and accuracy.
	 */
	function forward(ll, accuracy) {
	    accuracy = accuracy || 5; // default accuracy 1m
		return encode(LLtoUTM({lat: ll.lat, lon: ll.lon}), accuracy);
	}
	
	/**
	 * Conversion of MGRS to lat/lon.
	 *
	 * @param {string} mgrs MGRS string.
	 * @return {array} An array with left (longitude), bottom (latitude), right
	 *     (longitude) and top (latitude) values in WGS84, representing the
	 *     bounding box for the provided MGRS reference.
	 */
	function inverse(mgrs) {
	    var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
	    return [bbox.left, bbox.bottom, bbox.right, bbox.top];
	}

    /**
     * Conversion from degrees to radians.
     *
     * @private
     * @param {number} deg the angle in degrees.
     * @return {number} the angle in radians.
     */
    function degToRad(deg) {
        return (deg * (Math.PI / 180.0));
    }
    
    /**
     * Conversion from radians to degrees.
     *
     * @private
     * @param {number} rad the angle in radians.
     * @return {number} the angle in degrees.
     */
    function radToDeg(rad) {
        return (180.0 * (rad / Math.PI));
    }
    
	/**
     * Converts a set of Longitude and Latitude co-ordinates to UTM
     * using the WGS84 ellipsoid.
     *
     * @private
     * @param {object} ll Object literal with lat and lon properties
     *     representing the WGS84 coordinate to be converted.
     * @return {object} Object literal containing the UTM value with easting,
     *     northing, zoneNumber and zoneLetter properties, and an optional
     *     accuracy property in digits. Returns null if the conversion failed.
     */
    function LLtoUTM(ll) {
        var Lat = ll.lat;
        var Long = ll.lon;
        var a = 6378137.0;	//ellip.radius;
        var eccSquared = 0.00669438;	//ellip.eccsq;
        var k0 = 0.9996;
        var LongOrigin;
        var eccPrimeSquared;
        var N, T, C, A, M;
        var LatRad = degToRad(Lat);
        var LongRad = degToRad(Long);
        var LongOriginRad;
        var ZoneNumber;
		// (int)
        ZoneNumber = Math.floor((Long + 180) / 6) + 1;

        //Make sure the longitude 180.00 is in Zone 60
        if (Long == 180) {
            ZoneNumber = 60;
        }

        // Special zone for Norway
        if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
            ZoneNumber = 32;
        }

        // Special zones for Svalbard
        if (Lat >= 72.0 && Lat < 84.0) {
            if (Long >= 0.0 && Long < 9.0)
                ZoneNumber = 31;
            else if (Long >= 9.0 && Long < 21.0)
                ZoneNumber = 33;
            else if (Long >= 21.0 && Long < 33.0)
                ZoneNumber = 35;
            else if (Long >= 33.0 && Long < 42.0)
                ZoneNumber = 37;
        }

        LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
                                                     // in middle of
                                                     // zone
        LongOriginRad = degToRad(LongOrigin);

        eccPrimeSquared = (eccSquared) / (1 - eccSquared);

        N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
        T = Math.tan(LatRad) * Math.tan(LatRad);
        C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
        A = Math.cos(LatRad) * (LongRad - LongOriginRad);

        M = a
                * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5
                        * eccSquared * eccSquared * eccSquared / 256)
                        * LatRad
                        - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared
                                / 32 + 45 * eccSquared * eccSquared
                                * eccSquared / 1024)
                        * Math.sin(2 * LatRad)
                        + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared
                                * eccSquared * eccSquared / 1024)
                        * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared
                        * eccSquared / 3072)
                        * Math.sin(6 * LatRad));

        var UTMEasting = (k0
                * N
                * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T
                        + 72 * C - 58 * eccPrimeSquared)
                        * A * A * A * A * A / 120.0) + 500000.0);

        var UTMNorthing =  (k0 * (M + N
                * Math.tan(LatRad)
                * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A
                        / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared)
                        * A * A * A * A * A * A / 720.0)));
        if (Lat < 0.0) {
            UTMNorthing += 10000000.0; //10000000 meter offset for
                                        // southern hemisphere
        }

        return {
            northing: Math.round(UTMNorthing),
            easting: Math.round(UTMEasting),
            zoneNumber: ZoneNumber,
            zoneLetter: getLetterDesignator(Lat)
        };
    }
    
    /**
     * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
     * class where the Zone can be specified as a single string eg."60N" which
     * is then broken down into the ZoneNumber and ZoneLetter.
     *
     * @private
     * @param {object} utm An object literal with northing, easting, zoneNumber
     *     and zoneLetter properties. If an optional accuracy property is
     *     provided (in meters), a bounding box will be returned instead of
     *     latitude and longitude.
     * @return {object} An object literal containing either lat and lon values
     *     (if no accuracy was provided), or top, right, bottom and left values
     *     for the bounding box calculated according to the provided accuracy.
     *     Returns null if the conversion failed.
     */
    function UTMtoLL(utm) {

        var UTMNorthing = utm.northing;
        var UTMEasting = utm.easting;
        var zoneLetter = utm.zoneLetter;
        var zoneNumber = utm.zoneNumber;
        // check the ZoneNummber is valid
        if (zoneNumber < 0 || zoneNumber > 60) {
            return null;
        }

        var k0 = 0.9996;
        var a = 6378137.0;	//ellip.radius;
        var eccSquared = 0.00669438;	//ellip.eccsq;
        var eccPrimeSquared;
        var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
        var N1, T1, C1, R1, D, M;
        var LongOrigin;
        var mu, phi1Rad;

        // remove 500,000 meter offset for longitude
        var x = UTMEasting - 500000.0;
        var y = UTMNorthing;

        // We must know somehow if we are in the Northern or Southern
        // hemisphere, this is the only time we use the letter So even
        // if the Zone letter isn't exactly correct it should indicate
        // the hemisphere correctly
        if (zoneLetter == 'S') {
            y -= 10000000.0;// remove 10,000,000 meter offset used
            // for southern hemisphere
        }

        // There are 60 zones with zone 1 being at West -180 to -174
        LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
        // in middle of
        // zone

        eccPrimeSquared = (eccSquared) / (1 - eccSquared);

        M = y / k0;
        mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

        phi1Rad =
                mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32)
                        * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
        // double phi1 = ProjMath.radToDeg(phi1Rad);

        N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
        T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
        C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
        R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
        D = x / (N1 * k0);

        var lat =
                phi1Rad
                        - (N1 * Math.tan(phi1Rad) / R1)
                        * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90
                                * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1)
                                * D * D * D * D * D * D / 720);
        lat = radToDeg(lat);

        var lon =
                (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1)
                        * D * D * D * D * D / 120) / Math.cos(phi1Rad);
        lon = LongOrigin + radToDeg(lon);
        
        var result;
        if (utm.accuracy) {
            var topRight = UTMtoLL({
                northing: utm.northing + utm.accuracy,
                easting: utm.easting + utm.accuracy,
                zoneLetter: utm.zoneLetter,
                zoneNumber: utm.zoneNumber
            });
            result = {
                top: topRight.lat,
                right: topRight.lon,
                bottom: lat,
                left: lon
            };
        } else {
           result = {
                lat: lat,
                lon: lon
            };
        }
        return result;
    }
    
    /**
     * Calculates the MGRS letter designator for the given latitude.
     *
     * @private
     * @param {number} lat The latitude in WGS84 to get the letter designator
     *     for.
     * @return {char} The letter designator.
     */
	function getLetterDesignator(lat) {
        //This is here as an error flag to show that the Latitude is
        //outside MGRS limits
        var LetterDesignator = 'Z';

        if ((84 >= lat) && (lat >= 72))
            LetterDesignator = 'X';
        else if ((72 > lat) && (lat >= 64))
            LetterDesignator = 'W';
        else if ((64 > lat) && (lat >= 56))
            LetterDesignator = 'V';
        else if ((56 > lat) && (lat >= 48))
            LetterDesignator = 'U';
        else if ((48 > lat) && (lat >= 40))
            LetterDesignator = 'T';
        else if ((40 > lat) && (lat >= 32))
            LetterDesignator = 'S';
        else if ((32 > lat) && (lat >= 24))
            LetterDesignator = 'R';
        else if ((24 > lat) && (lat >= 16))
            LetterDesignator = 'Q';
        else if ((16 > lat) && (lat >= 8))
            LetterDesignator = 'P';
        else if ((8 > lat) && (lat >= 0))
            LetterDesignator = 'N';
        else if ((0 > lat) && (lat >= -8))
            LetterDesignator = 'M';
        else if ((-8 > lat) && (lat >= -16))
            LetterDesignator = 'L';
        else if ((-16 > lat) && (lat >= -24))
            LetterDesignator = 'K';
        else if ((-24 > lat) && (lat >= -32))
            LetterDesignator = 'J';
        else if ((-32 > lat) && (lat >= -40))
            LetterDesignator = 'H';
        else if ((-40 > lat) && (lat >= -48))
            LetterDesignator = 'G';
        else if ((-48 > lat) && (lat >= -56))
            LetterDesignator = 'F';
        else if ((-56 > lat) && (lat >= -64))
            LetterDesignator = 'E';
        else if ((-64 > lat) && (lat >= -72))
            LetterDesignator = 'D';
        else if ((-72 > lat) && (lat >= -80))
            LetterDesignator = 'C';
        return LetterDesignator;
    }

	/**
	 * Encodes a UTM location as MGRS string.
	 *
	 * @private
	 * @param {object} utm An object literal with easting, northing,
	 *     zoneLetter, zoneNumber
	 * @param {number} accuracy Accuracy in digits (1-5).
	 * @return {string} MGRS string for the given UTM location.
	 */
	function encode(utm, accuracy) {
		var seasting = "" + utm.easting,
		    snorthing = "" + utm.northing;
		
		return utm.zoneNumber + utm.zoneLetter +
            get100kID(utm.easting, utm.northing, utm.zoneNumber) +
			seasting.substr(seasting.length - 5, accuracy) +
			snorthing.substr(snorthing.length - 5, accuracy);
	}
	
	/**
     * Get the two letter 100k designator for a given UTM easting,
     * northing and zone number value.
     *
     * @private
     * @param {number} easting
     * @param {number} northing
     * @param {number} zoneNumber
     * @return the two letter 100k designator for the given UTM location.
     */
    function get100kID(easting, northing, zoneNumber) {
        var setParm = get100kSetForZone(zoneNumber);
        var setColumn = Math.floor(easting / 100000);
        var setRow = Math.floor(northing / 100000) % 20;
        return getLetter100kID(setColumn, setRow, setParm);
    }

	/**
     * Given a UTM zone number, figure out the MGRS 100K set it is in.
     *
     * @private
     * @param {number} i An UTM zone number.
     * @return {number} the 100k set the UTM zone is in.
     */
    function get100kSetForZone(i) {
        var setParm = i % NUM_100K_SETS;
        if (setParm == 0)
            setParm = NUM_100K_SETS;
		
        return setParm;
    }
    
   /**
     * Get the two-letter MGRS 100k designator given information
     * translated from the UTM northing, easting and zone number.
     *
     * @private
     * @param {number} column the column index as it relates to the MGRS
     *        100k set spreadsheet, created from the UTM easting.
     *        Values are 1-8.
     * @param {number} row the row index as it relates to the MGRS 100k set
     *        spreadsheet, created from the UTM northing value. Values
     *        are from 0-19.
     * @param {number} parm the set block, as it relates to the MGRS 100k set
     *        spreadsheet, created from the UTM zone. Values are from
     *        1-60.
     * @return two letter MGRS 100k code.
     */
    function getLetter100kID(column, row, parm) {
		// colOrigin and rowOrigin are the letters at the origin of the set
		var index = parm-1;
        var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
        var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

        // colInt and rowInt are the letters to build to return
        var colInt = colOrigin + column - 1;
        var rowInt = rowOrigin + row;
        var rollover = false;

		if ( colInt > Z ) {
            colInt = colInt - Z + A - 1;
            rollover = true;
        }

		if (colInt == I || (colOrigin < I && colInt > I)
                || ((colInt > I || colOrigin < I) && rollover)) {
            colInt++;
        }

		if (colInt == O || (colOrigin < O && colInt > O)
                || ((colInt > O || colOrigin < O) && rollover)) {
            colInt++;

            if (colInt == I) {
                colInt++;
             }
        }

	  	if (colInt > Z) {
            colInt = colInt - Z + A - 1;
        }

        if (rowInt > V) {
            rowInt = rowInt - V + A - 1;
            rollover = true;
        } else {
            rollover = false;
        }

        if( ((rowInt == I) || ((rowOrigin < I) && (rowInt > I)))
                || (((rowInt > I)||(rowOrigin < I)) && rollover)) {
            rowInt++;
        }

        if( ((rowInt == O) || ((rowOrigin < O) && (rowInt > O)))
                || (((rowInt > O)|| (rowOrigin < O)) && rollover)) {
            rowInt++;

            if (rowInt == I) {
                rowInt++;
            }
        }

        if (rowInt > V) {
            rowInt = rowInt - V + A - 1;
        }

        var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
        return twoLetter;
	}

    /**
     * Decode the UTM parameters from a MGRS string.
     *
     * @private
     * @param {string} mgrsString an UPPERCASE coordinate string is expected.
     * @return {object} An object literal with easting, northing, zoneLetter,
     *     zoneNumber and accuracy (in meters) properties.
     */
    function decode(mgrsString) {

        if (mgrsString == null || mgrsString.length == 0) {
            throw("MGRSPoint coverting from nothing");
        }

        var length = mgrsString.length;

        var hunK = null;
        var sb = "";
        var testChar;
        var i = 0;

        // get Zone number
        while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
            if (i >= 2) {
                throw("MGRSPoint bad conversion from: "
                        + mgrsString);
            }
            sb += testChar;
            i++;
        }

        var zoneNumber = parseInt(sb, 10);

        if (i == 0 || i + 3 > length) {
            // A good MGRS string has to be 4-5 digits long,
            // ##AAA/#AAA at least.
            throw("MGRSPoint bad conversion from: "
                    + mgrsString);
        }

        var zoneLetter = mgrsString.charAt(i++);

        // Should we check the zone letter here? Why not.
        if (zoneLetter <= 'A' || zoneLetter == 'B' || zoneLetter == 'Y'
                || zoneLetter >= 'Z' || zoneLetter == 'I'
                || zoneLetter == 'O') {
            throw("MGRSPoint zone letter "
                    + zoneLetter + " not handled: " + mgrsString);
        }

        hunK = mgrsString.substring(i, i += 2);

        var set = get100kSetForZone(zoneNumber);

        var east100k = getEastingFromChar(hunK.charAt(0), set);
        var north100k = getNorthingFromChar(hunK.charAt(1), set);

        // We have a bug where the northing may be 2000000 too low.
        // How
        // do we know when to roll over?

        while (north100k < getMinNorthing(zoneLetter)) {
            north100k += 2000000;
        }

        // calculate the char index for easting/northing separator
        var remainder = length - i;

        if (remainder % 2 != 0) {
            throw("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters"
                    + mgrsString);
        }

        var sep = remainder / 2;

        var sepEasting = 0.0;
        var sepNorthing = 0.0;

        if (sep > 0) {
            var accuracyBonus = 100000.0 / Math.pow(10, sep);
            var sepEastingString = mgrsString.substring(i, i + sep);
            sepEasting = parseFloat(sepEastingString) * accuracyBonus;
            var sepNorthingString = mgrsString.substring(i + sep);
            sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
        }

        easting = sepEasting + east100k;
        northing = sepNorthing + north100k;
        
        return {
            easting: easting,
            northing: northing,
            zoneLetter: zoneLetter,
            zoneNumber: zoneNumber,
            accuracy: accuracyBonus
        };
    }

    /**
     * Given the first letter from a two-letter MGRS 100k zone, and given the
     * MGRS table set for the zone number, figure out the easting value that
     * should be added to the other, secondary easting value.
     *
     * @private
     * @param {char} e The first letter from a two-letter MGRS 100´k zone.
     * @param {number} set The MGRS table set for the zone number.
     * @return {number} The easting value for the given letter and set.
     */
    function getEastingFromChar(e, set) {
        // colOrigin is the letter at the origin of the set for the
        // column
        var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
        var eastingValue = 100000.0;
        var rewindMarker = false;

        while (curCol != e.charCodeAt(0)) {
            curCol++;
            if (curCol == I)
                curCol++;
            if (curCol == O)
                curCol++;
            if (curCol > Z) {
                if (rewindMarker) {
                    throw("Bad character: " + e);
                }
                curCol = A;
                rewindMarker = true;
            }
            eastingValue += 100000.0;
        }

        return eastingValue;
    }

    /**
     * Given the second letter from a two-letter MGRS 100k zone, and given the
     * MGRS table set for the zone number, figure out the northing value that
     * should be added to the other, secondary northing value. You have to
     * remember that Northings are determined from the equator, and the vertical
     * cycle of letters mean a 2000000 additional northing meters. This happens
     * approx. every 18 degrees of latitude. This method does *NOT* count any
     * additional northings. You have to figure out how many 2000000 meters need
     * to be added for the zone letter of the MGRS coordinate.
     *
     * @private
     * @param {char} n Second letter of the MGRS 100k zone
     * @param {number} set The MGRS table set number, which is dependent on the
     *     UTM zone number.
     * @return {number} The northing value for the given letter and set.
     */
    function getNorthingFromChar(n, set) {

        if (n > 'V') {
            throw("MGRSPoint given invalid Northing "
                    + n);
        }

        // rowOrigin is the letter at the origin of the set for the
        // column
        var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
        var northingValue = 0.0;
        var rewindMarker = false;

        while (curRow != n.charCodeAt(0)) {
            curRow++;
            if (curRow == I)
                curRow++;
            if (curRow == O)
                curRow++;
            // fixing a bug making whole application hang in this loop
            // when 'n' is a wrong character
            if (curRow > V) {
                if (rewindMarker) { // making sure that this loop ends
                    throw("Bad character: " + n);
                }
                curRow = A;
                rewindMarker = true;
            }
            northingValue += 100000.0;
        }

        return northingValue;
    }

    /**
     * The function getMinNorthing returns the minimum northing value of a MGRS
     * zone.
     *
     * Ported from Geotrans' c Lattitude_Band_Value structure table.
     *
     * @private
     * @param {char} zoneLetter The MGRS zone to get the min northing for.
     * @return {number}
     */
    function getMinNorthing(zoneLetter) {
        var northing;
        switch (zoneLetter) {
        case 'C':
            northing = 1100000.0;
            break;
        case 'D':
            northing = 2000000.0;
            break;
        case 'E':
            northing = 2800000.0;
            break;
        case 'F':
            northing = 3700000.0;
            break;
        case 'G':
            northing = 4600000.0;
            break;
        case 'H':
            northing = 5500000.0;
            break;
        case 'J':
            northing = 6400000.0;
            break;
        case 'K':
            northing = 7300000.0;
            break;
        case 'L':
            northing = 8200000.0;
            break;
        case 'M':
            northing = 9100000.0;
            break;
        case 'N':
            northing = 0.0;
            break;
        case 'P':
            northing = 800000.0;
            break;
        case 'Q':
            northing = 1700000.0;
            break;
        case 'R':
            northing = 2600000.0;
            break;
        case 'S':
            northing = 3500000.0;
            break;
        case 'T':
            northing = 4400000.0;
            break;
        case 'U':
            northing = 5300000.0;
            break;
        case 'V':
            northing = 6200000.0;
            break;
        case 'W':
            northing = 7000000.0;
            break;
        case 'X':
            northing = 7900000.0;
            break;
        default:
            northing = -1.0;
        }
        if (northing >= 0.0) {
            return northing;
        } else {
            throw("Invalid zone letter: "
                    + zoneLetter);
        }

    }
    
    return {
        forward: forward,
        inverse: inverse
    };
	
})();

if (window.Proj4js && Proj4js.Point) {
    
    /**
     * Creates a Proj4js.Point instance from a MGRS reference. The point will
     * reference the center of the MGRS reference, and coordinates will be in
     * WGS84 longitude and latitude.
     *
     * Only available if Proj4js is loaded.
     *
     * @param mgrs {string} MGRS reference
     */
    Proj4js.Point.fromMGRS = function(mgrs) {
        var llbbox = Proj4js.util.MGRS.inverse(mgrs);
        return new Proj4js.Point(
            (llbbox[2] + llbbox[0]) / 2,
            (llbbox[3] + llbbox[1]) / 2
        );
    };
    
    /**
     * Converts a Proj4js.Point instance to a MGRS reference. The point
     * coordinates are expected to be in WGS84 longitude and latitude.
     *
     * Only available if Proj4js is loaded.
     *
     * @param accuracy {int} The accuracy for the MGRS reference in digits (5
     *     for 1 m, 4 for 10 m, 3 for 100 m, 4 for 1000 m or 5 for 10000 m) 
     */
    Proj4js.Point.prototype.toMGRS = function(accuracy) {
        return Proj4js.util.MGRS.forward({lon: this.x, lat: this.y}, accuracy);
    };
    
}
