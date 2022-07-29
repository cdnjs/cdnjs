/**
 * Filename: pnnl-buildingid.js
 * Author: Mark Borkum <mark.borkum@pnnl.gov>
 *
 * Copyright (c) 2018, Battelle Memorial Institute
 * All rights reserved.
 *
 * 1. Battelle Memorial Institute (hereinafter Battelle) hereby grants
 *    permission to any person or entity lawfully obtaining a copy of this
 *    software and associated documentation files (hereinafter "the Software")
 *    to redistribute and use the Software in source and binary forms, with or
 *    without modification.  Such person or entity may use, copy, modify, merge,
 *    publish, distribute, sublicense, and/or sell copies of the Software, and
 *    may permit others to do so, subject to the following conditions:
 *
 *    * Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimers.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Other than as used herein, neither the name Battelle Memorial Institute
 *      or Battelle may be used in any form whatsoever without the express
 *      written consent of Battelle.
 *
 * 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (root, factory) {
	/* global define, module */
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['open-location-code'], function ($) {
			return (root.UniqueBuildingIdentification = factory(new ($.OpenLocationCode)()));
		});
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(new (require('open-location-code').OpenLocationCode)());
	} else {
		// Browser globals
		root.UniqueBuildingIdentification = factory(root.OpenLocationCode);
	}
} (this, function (OpenLocationCode) {
	const UniqueBuildingIdentification = {};

	/**
	 * The coordinates of a decoded Unique Building Identifier (UBID).
	 *
	 * The coordinates include the latitude and longitude of the lower left and
	 * upper right corners of the Open Location Code (OLC) bounding box for the
	 * building footprint that the code represents, along with the latitude and
	 * longitude of the southwest (SW) and northeast (NE) corners of the OLC grid
	 * reference cell for the geometric center of mass (i.e., centroid) of the
	 * building footprint that the code represents.
	 *
	 * @param {number} latitudeLo The latitude of the SW corner in degrees.
	 * @param {number} longitudeLo The longitude of the SW corner in degrees.
	 * @param {number} latitudeHi The latitude of the NE corner in degrees.
	 * @param {number} longitudeHi The longitude of the NE corner in degrees.
	 * @param {OpenLocationCode.CodeArea} centerOfMass The OLC grid reference cell
	 *   for the centroid.
	 * @param {string} codeVersion The UBID code version.
	 *
	 * @constructor
	 */
	UniqueBuildingIdentification.CodeArea = function (latitudeLo, longitudeLo, latitudeHi, longitudeHi, centerOfMass, codeVersion) {
		this.latitudeLo = latitudeLo;
		this.longitudeLo = longitudeLo;
		this.latitudeHi = latitudeHi;
		this.longitudeHi = longitudeHi;
		this.centerOfMass = centerOfMass;
		this.codeVersion = codeVersion;
	};

	/**
	 * Returns a resized version of this UBID code area, where the latitude and
	 * longitude of the SW and NE corners of the OLC bounding box are moved
	 * inwards by dimensions that correspond to half of the height and width of
	 * the OLC grid reference cell for the centroid.
	 *
	 * The purpose of the resizing operation is to ensure that re-encoding a given
	 * UBID code area results in the same coordinates.
	 *
	 * @return {UniqueBuildingIdentification.CodeArea}
	 */
	UniqueBuildingIdentification.CodeArea.prototype.resize = function () {
		// Calculate the (half-)dimensions of OLC grid reference cell for the centroid.
		const halfHeight = (this.centerOfMass.latitudeHi - this.centerOfMass.latitudeLo) / 2.0;
		const halfWidth = (this.centerOfMass.longitudeHi - this.centerOfMass.longitudeLo) / 2.0;

		// Construct and return the new UBID code area.
		return new UniqueBuildingIdentification.CodeArea(this.latitudeLo + halfHeight, this.longitudeLo + halfWidth, this.latitudeHi - halfHeight, this.longitudeHi - halfWidth, this.centerOfMass, this.codeVersion);
	};

	UniqueBuildingIdentification.v3 = (function () {
		const v3 = {};

		/**
		 * The separator for OLC codes in a UBID code.
		 *
		 * @type {string}
		 */
		v3.SEPARATOR_ = '-';

		/**
		 * Regular expression for UBID codes.
		 *
		 * @type {RegExp}
		 */
		v3.RE_PATTERN_ = (function () {
			// https://stackoverflow.com/a/25114677
			const escapeRegExp = function (string) {
				return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
			};

			return new RegExp([
				'^',
				'(',
					'[', escapeRegExp('23456789CFGHJMPQRVWX'), ']{4,8}',
					escapeRegExp('+'),
					'[', escapeRegExp('23456789CFGHJMPQRVWX'), ']*',
				')',
				escapeRegExp(v3.SEPARATOR_),
				'(0|[1-9][0-9]*)',
				escapeRegExp(v3.SEPARATOR_),
				'(0|[1-9][0-9]*)',
				escapeRegExp(v3.SEPARATOR_),
				'(0|[1-9][0-9]*)',
				escapeRegExp(v3.SEPARATOR_),
				'(0|[1-9][0-9]*)',
				'$',
			].join(''));
		})();

		/**
		 * The first group of a UBID code is the OLC for the geometric center of
		 * mass (i.e., centroid) of the building footprint.
		 *
		 * @type {number}
		 */
		v3.RE_GROUP_OPENLOCATIONCODE_ = 1;

		/**
		 * The second group of the UBID code is the Chebyshev distance in OLC grid
		 * units from the OLC for the centroid of the building footprint to the
		 * northern extent of the OLC bounding box for the building footprint.
		 *
		 * @type {number}
		 */
		v3.RE_GROUP_NORTH_ = 2;

		/**
		 * The third group of the UBID code is the Chebyshev distance in OLC grid
		 * units from the OLC for the centroid of the building footprint to the
		 * eastern extent of the OLC bounding box for the building footprint.
		 *
		 * @type {number}
		 */
		v3.RE_GROUP_EAST_ = 3;

		/**
		 * The fourth group of the UBID code is the Chebyshev distance in OLC grid
		 * units from the OLC for the centroid of the building footprint to the
		 * southern extent of the OLC bounding box for the building footprint.
		 *
		 * @type {number}
		 */
		v3.RE_GROUP_SOUTH_ = 4;

		/**
		 * The fifth group of the UBID code is the Chebyshev distance in OLC grid
		 * units from the OLC for the centroid of the building footprint to the
		 * western extent of the OLC bounding box for the building footprint.
		 *
		 * @type {number}
		 */
		v3.RE_GROUP_WEST_ = 5;

		/**
		 * Returns the UBID code area for the given UBID code.
		 *
		 * @param {string} code The UBID code.
		 * @return {UniqueBuildingIdentification.CodeArea} The UBID code area.
		 * @throws {Error} If the UBID code is invalid or if the OLC for the
		 *   centroid of the building footprint is invalid.
		 */
		v3.decode = function (code) {
			if ((code === null) || (code === undefined)) {
				throw new Error('Invalid UBID');
			}

			// Attempt to match the regular expression.
			const matchData = String(code).match(v3.RE_PATTERN_);

			// If the UBID code does not match the regular expression, raise an error.
			if (matchData === null) {
				throw new Error('Invalid UBID');
			}

			// Extract the OLC for the centroid of the building footprint.
			const olc = matchData[v3.RE_GROUP_OPENLOCATIONCODE_];

			// Decode the OLC for the centroid of the building footprint.
			const centerOfMass = OpenLocationCode.decode(olc);

			// Calculate the size of the OLC for the centroid of the building
			// footprint in decimal degree units.
			const height = centerOfMass.latitudeHi - centerOfMass.latitudeLo;
			const width = centerOfMass.longitudeHi - centerOfMass.longitudeLo;

			// Calculate the size of the OLC bounding box for the building footprint,
			// assuming that the datum are Chebyshev distances.
			const latitudeHi = centerOfMass.latitudeHi + (parseInt(matchData[v3.RE_GROUP_NORTH_]) * height);
			const longitudeHi = centerOfMass.longitudeHi + (parseInt(matchData[v3.RE_GROUP_EAST_]) * width);
			const latitudeLo = centerOfMass.latitudeLo - (parseInt(matchData[v3.RE_GROUP_SOUTH_]) * height);
			const longitudeLo = centerOfMass.longitudeLo - (parseInt(matchData[v3.RE_GROUP_WEST_]) * width);

			// Construct and return the UBID code area.
			return new UniqueBuildingIdentification.CodeArea(latitudeLo, longitudeLo, latitudeHi, longitudeHi, centerOfMass, 3);
		};

		/**
		 * Returns the UBID code for the given coordinates.
		 *
		 * @param {number} latitudeLo The latitude in decimal degrees of the SW
		 *   corner of the minimal bounding box for the building footprint.
		 * @param {number} longitudeLo The longitude in decimal degrees of the SW
		 *   corner of the minimal bounding box for the building footprint.
		 * @param {number} latitudeHi The latitude in decimal degrees of the NE
		 *   corner of the minimal bounding box for the building footprint.
		 * @param {number} longitudeHi The longitude in decimal degrees of the NE
		 *   corner of the minimal bounding box for the building footprint.
		 * @param {number} latitudeCenter The latitude in decimal degrees of the
		 *   centroid of the building footprint.
		 * @param {number} longitudeCenter The longitude in decimal degrees of the
		 *   centroid of the building footprint.
		 * @param {number} codeLength The OLC code length (not including the
		 *   separator).
		 * @return {string} The UBID code.
		 * @throws {Error} If the OLC for the centroid of the building footprint
		 *   cannot be encoded (e.g., invalid code length).
		 */
		v3.encode = function (latitudeLo, longitudeLo, latitudeHi, longitudeHi, latitudeCenter, longitudeCenter, codeLength) {
			// Encode the OLCs for the NE and SW corners of the minimal bounding box
			// for the building footprint.
			const northeast_openlocationcode = OpenLocationCode.encode(latitudeHi, longitudeHi, codeLength);
			const southwest_openlocationcode = OpenLocationCode.encode(latitudeLo, longitudeLo, codeLength);

			// Encode the OLC for the centroid of the building footprint.
			const centroid_openlocationcode = OpenLocationCode.encode(latitudeCenter, longitudeCenter, codeLength);

			// Decode the OLCs for the NE and SW corners of the minimal bounding box
			// for the building footprint.
			const northeast_openlocationcode_CodeArea = OpenLocationCode.decode(northeast_openlocationcode);
			const southwest_openlocationcode_CodeArea = OpenLocationCode.decode(southwest_openlocationcode);

			// Decode the OLC for the centroid of the building footprint.
			const centroid_openlocationcode_CodeArea = OpenLocationCode.decode(centroid_openlocationcode);

			// Calculate the size of the OLC for the centroid of the building
			// footprint in decimal degree units.
			const height = centroid_openlocationcode_CodeArea.latitudeHi - centroid_openlocationcode_CodeArea.latitudeLo;
			const width = centroid_openlocationcode_CodeArea.longitudeHi - centroid_openlocationcode_CodeArea.longitudeLo;

			// Calculate the Chebyshev distances to the northern, eastern, southern
			// and western of the OLC bounding box for the building footprint.
			const delta_north = (northeast_openlocationcode_CodeArea.latitudeHi - centroid_openlocationcode_CodeArea.latitudeHi) / height;
			const delta_east = (northeast_openlocationcode_CodeArea.longitudeHi - centroid_openlocationcode_CodeArea.longitudeHi) / width;
			const delta_south = (centroid_openlocationcode_CodeArea.latitudeLo - southwest_openlocationcode_CodeArea.latitudeLo) / height;
			const delta_west = (centroid_openlocationcode_CodeArea.longitudeLo - southwest_openlocationcode_CodeArea.longitudeLo) / width;

			// Construct and return the UBID code.
			return [
				centroid_openlocationcode,
				String(Math.round(delta_north)),
				String(Math.round(delta_east)),
				String(Math.round(delta_south)),
				String(Math.round(delta_west)),
			].join(v3.SEPARATOR_);
		};

		/**
		 * Returns the UBID code for the given UBID code area.
		 *
		 * @param {UniqueBuildingIdentification.CodeArea} codeArea The UBID code
		 *   area.
		 * @return {string} The UBID code.
		 * @throws {Error} If the OLC for the centroid of the building footprint
		 *   cannot be encoded (e.g., invalid code length).
		 */
		v3.encodeCodeArea = function (codeArea) {
			if (codeArea instanceof UniqueBuildingIdentification.CodeArea) {
				return v3.encode(codeArea.latitudeLo, codeArea.longitudeLo, codeArea.latitudeHi, codeArea.longitudeHi, codeArea.centerOfMass.latitudeCenter, codeArea.centerOfMass.longitudeCenter, codeArea.centerOfMass.codeLength);
			} else {
				throw new Error('Invalid UBID code area');
			}
		};

		/**
		 * Is the given UBID code valid?
		 *
		 * @param {string} code The UBID code.
		 * @return {boolean} Returns 'true' if the UBID code is valid. Otherwise,
		 *   returns 'false'.
		 */
		v3.isValid = function (code) {
			return (String(code).match(v3.RE_PATTERN_) instanceof Array);
		};

		return v3;
	})();

	return UniqueBuildingIdentification;
}));
