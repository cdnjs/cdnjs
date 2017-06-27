// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
  Convert locations to and from short codes.

  Open Location Codes are short, 10-11 character codes that can be used instead
  of street addresses. The codes can be generated and decoded offline, and use
  a reduced character set that minimises the chance of codes including words.

  Codes are able to be shortened relative to a nearby location. This means that
  in many cases, only four to seven characters of the code are needed.
  To recover the original code, the same location is not required, as long as
  a nearby location is provided.

  Codes represent rectangular areas rather than points, and the longer the
  code, the smaller the area. A 10 character code represents a 13.5x13.5
  meter area (at the equator. An 11 character code represents approximately
  a 2.8x3.5 meter area.

  Two encoding algorithms are used. The first 10 characters are pairs of
  characters, one for latitude and one for latitude, using base 20. Each pair
  reduces the area of the code by a factor of 400. Only even code lengths are
  sensible, since an odd-numbered length would have sides in a ratio of 20:1.

  At position 11, the algorithm changes so that each character selects one
  position from a 4x5 grid. This allows single-character refinements.

  Examples:

    Encode a location, default accuracy:
    var code = OpenLocationCode.encode(47.365590, 8.524997);

    Encode a location using one stage of additional refinement:
    var code = OpenLocationCode.encode(47.365590, 8.524997, 11);

    Decode a full code:
    var coord = OpenLocationCode.decode(code);
    var msg = 'Center is ' + coord.latitudeCenter + ',' + coord.longitudeCenter;

    Attempt to trim the first characters from a code:
    var shortCode = OpenLocationCode.shorten('8FVC9G8F+6X', 47.5, 8.5);

    Recover the full code from a short code:
    var code = OpenLocationCode.recoverNearest('9G8F+6X', 47.4, 8.6);
    var code = OpenLocationCode.recoverNearest('8F+6X', 47.4, 8.6);
 */
(function (root, factory) {
  /* global define, module */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['b'], function (b) {
      return (root.returnExportsGlobal = factory(b));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('b'));
  } else {
    // Browser globals
    root.OpenLocationCode = factory();
  }
} (this, function () {
  var OpenLocationCode = {};

  // A separator used to break the code into two parts to aid memorability.
  var SEPARATOR_ = '+';

  // The number of characters to place before the separator.
  var SEPARATOR_POSITION_ = 8;

  // The character used to pad codes.
  var PADDING_CHARACTER_ = '0';

  // The character set used to encode the values.
  var CODE_ALPHABET_ = '23456789CFGHJMPQRVWX';

  // The base to use to convert numbers to/from.
  var ENCODING_BASE_ = CODE_ALPHABET_.length;

  // The maximum value for latitude in degrees.
  var LATITUDE_MAX_ = 90;

  // The maximum value for longitude in degrees.
  var LONGITUDE_MAX_ = 180;

  // Maxiumum code length using lat/lng pair encoding. The area of such a
  // code is approximately 13x13 meters (at the equator), and should be suitable
  // for identifying buildings. This excludes prefix and separator characters.
  var PAIR_CODE_LENGTH_ = 10;

  // The resolution values in degrees for each position in the lat/lng pair
  // encoding. These give the place value of each position, and therefore the
  // dimensions of the resulting area.
  var PAIR_RESOLUTIONS_ = [20.0, 1.0, .05, .0025, .000125];

  // Number of columns in the grid refinement method.
  var GRID_COLUMNS_ = 4;

  // Number of rows in the grid refinement method.
  var GRID_ROWS_ = 5;

  // Size of the initial grid in degrees.
  var GRID_SIZE_DEGREES_ = 0.000125;

  // Minimum length of a code that can be shortened.
  var MIN_TRIMMABLE_CODE_LEN_ = 6;

  /**
    Returns the OLC alphabet.
   */
  var getAlphabet = OpenLocationCode.getAlphabet = function() {
    return CODE_ALPHABET_;
  };

  /**
    Determines if a code is valid.

    To be valid, all characters must be from the Open Location Code character
    set with at most one separator. The separator can be in any even-numbered
    position up to the eighth digit.
   */
  var isValid = OpenLocationCode.isValid = function(code) {
    if (!code) {
      return false;
    }
    // The separator is required.
    if (code.indexOf(SEPARATOR_) == -1) {
      return false;
    }
    if (code.indexOf(SEPARATOR_) != code.lastIndexOf(SEPARATOR_)) {
      return false;
    }
    // Is it the only character?
    if (code.length == 1) {
      return false;
    }
    // Is it in an illegal position?
    if (code.indexOf(SEPARATOR_) > SEPARATOR_POSITION_ ||
        code.indexOf(SEPARATOR_) % 2 == 1) {
      return false;
    }
    // We can have an even number of padding characters before the separator,
    // but then it must be the final character.
    if (code.indexOf(PADDING_CHARACTER_) > -1) {
      // Not allowed to start with them!
      if (code.indexOf(PADDING_CHARACTER_) == 0) {
        return false;
      }
      // There can only be one group and it must have even length.
      var padMatch = code.match(new RegExp('(' + PADDING_CHARACTER_ + '+)', 'g'));
      if (padMatch.length > 1 || padMatch[0].length % 2 == 1 ||
          padMatch[0].length > SEPARATOR_POSITION_ - 2) {
        return false;
      }
      // If the code is long enough to end with a separator, make sure it does.
      if (code.charAt(code.length - 1) != SEPARATOR_) {
        return false;
      }
    }
    // If there are characters after the separator, make sure there isn't just
    // one of them (not legal).
    if (code.length - code.indexOf(SEPARATOR_) - 1 == 1) {
      return false;
    }

    // Strip the separator and any padding characters.
    code = code.replace(new RegExp('\\' + SEPARATOR_ + '+'), '')
        .replace(new RegExp(PADDING_CHARACTER_ + '+'), '');
    // Check the code contains only valid characters.
    for (var i = 0, len = code.length; i < len; i++) {
      var character = code.charAt(i).toUpperCase();
      if (character != SEPARATOR_ && CODE_ALPHABET_.indexOf(character) == -1) {
        return false;
      }
    }
    return true;
  };

  /**
    Determines if a code is a valid short code.

    A short Open Location Code is a sequence created by removing four or more
    digits from an Open Location Code. It must include a separator
    character.
   */
  var isShort = OpenLocationCode.isShort = function(code) {
    // Check it's valid.
    if (!isValid(code)) {
      return false;
    }
    // If there are less characters than expected before the SEPARATOR.
    if (code.indexOf(SEPARATOR_) >= 0 &&
        code.indexOf(SEPARATOR_) < SEPARATOR_POSITION_) {
      return true;
    }
    return false;
  };

  /**
    Determines if a code is a valid full Open Location Code.

    Not all possible combinations of Open Location Code characters decode to
    valid latitude and longitude values. This checks that a code is valid
    and also that the latitude and longitude values are legal. If the prefix
    character is present, it must be the first character. If the separator
    character is present, it must be after four characters.
   */
  var isFull = OpenLocationCode.isFull = function(code) {
    if (!isValid(code)) {
      return false;
    }
    // If it's short, it's not full.
    if (isShort(code)) {
      return false;
    }

    // Work out what the first latitude character indicates for latitude.
    var firstLatValue = CODE_ALPHABET_.indexOf(
        code.charAt(0).toUpperCase()) * ENCODING_BASE_;
    if (firstLatValue >= LATITUDE_MAX_ * 2) {
      // The code would decode to a latitude of >= 90 degrees.
      return false;
    }
    if (code.length > 1) {
      // Work out what the first longitude character indicates for longitude.
      var firstLngValue = CODE_ALPHABET_.indexOf(
          code.charAt(1).toUpperCase()) * ENCODING_BASE_;
      if (firstLngValue >= LONGITUDE_MAX_ * 2) {
        // The code would decode to a longitude of >= 180 degrees.
        return false;
      }
    }
    return true;
  };

  /**
    Encode a location into an Open Location Code.

    Produces a code of the specified length, or the default length if no length
    is provided.

    The length determines the accuracy of the code. The default length is
    10 characters, returning a code of approximately 13.5x13.5 meters. Longer
    codes represent smaller areas, but lengths > 14 are sub-centimetre and so
    11 or 12 are probably the limit of useful codes.

    Args:
      latitude: A latitude in signed decimal degrees. Will be clipped to the
          range -90 to 90.
      longitude: A longitude in signed decimal degrees. Will be normalised to
          the range -180 to 180.
      codeLength: The number of significant digits in the output code, not
          including any separator characters.
   */
  var encode = OpenLocationCode.encode = function(latitude,
      longitude, codeLength) {
    if (typeof codeLength == 'undefined') {
      codeLength = PAIR_CODE_LENGTH_;
    }
    if (codeLength < 2 ||
        (codeLength < SEPARATOR_POSITION_ && codeLength % 2 == 1)) {
      throw 'IllegalArgumentException: Invalid Open Location Code length';
    }
    // Ensure that latitude and longitude are valid.
    latitude = clipLatitude(latitude);
    longitude = normalizeLongitude(longitude);
    // Latitude 90 needs to be adjusted to be just less, so the returned code
    // can also be decoded.
    if (latitude == 90) {
      latitude = latitude - computeLatitudePrecision(codeLength);
    }
    var code = encodePairs(
        latitude, longitude, Math.min(codeLength, PAIR_CODE_LENGTH_));
    // If the requested length indicates we want grid refined codes.
    if (codeLength > PAIR_CODE_LENGTH_) {
      code += encodeGrid(
          latitude, longitude, codeLength - PAIR_CODE_LENGTH_);
    }
    return code;
  };

  /**
    Decodes an Open Location Code into the location coordinates.

    Returns a CodeArea object that includes the coordinates of the bounding
    box - the lower left, center and upper right.

    Args:
      code: The Open Location Code to decode.

    Returns:
      A CodeArea object that provides the latitude and longitude of two of the
      corners of the area, the center, and the length of the original code.
   */
  var decode = OpenLocationCode.decode = function(code) {
    if (!isFull(code)) {
      throw ('IllegalArgumentException: ' +
          'Passed Open Location Code is not a valid full code: ' + code);
    }
    // Strip out separator character (we've already established the code is
    // valid so the maximum is one), padding characters and convert to upper
    // case.
    code = code.replace(SEPARATOR_, '');
    code = code.replace(new RegExp(PADDING_CHARACTER_ + '+'), '');
    code = code.toUpperCase();
    // Decode the lat/lng pair component.
    var codeArea = decodePairs(code.substring(0, PAIR_CODE_LENGTH_));
    // If there is a grid refinement component, decode that.
    if (code.length <= PAIR_CODE_LENGTH_) {
      return codeArea;
    }
    var gridArea = decodeGrid(code.substring(PAIR_CODE_LENGTH_));
    return CodeArea(
      codeArea.latitudeLo + gridArea.latitudeLo,
      codeArea.longitudeLo + gridArea.longitudeLo,
      codeArea.latitudeLo + gridArea.latitudeHi,
      codeArea.longitudeLo + gridArea.longitudeHi,
      codeArea.codeLength + gridArea.codeLength);
  };

  /**
    Recover the nearest matching code to a specified location.

    Given a valid short Open Location Code this recovers the nearest matching
    full code to the specified location.

    Short codes will have characters prepended so that there are a total of
    eight characters before the separator.

    Args:
      shortCode: A valid short OLC character sequence.
      referenceLatitude: The latitude (in signed decimal degrees) to use to
          find the nearest matching full code.
      referenceLongitude: The longitude (in signed decimal degrees) to use
          to find the nearest matching full code.

    Returns:
      The nearest full Open Location Code to the reference location that matches
      the short code. Note that the returned code may not have the same
      computed characters as the reference location. This is because it returns
      the nearest match, not necessarily the match within the same cell. If the
      passed code was not a valid short code, but was a valid full code, it is
      returned unchanged.
   */
  var recoverNearest = OpenLocationCode.recoverNearest = function(
      shortCode, referenceLatitude, referenceLongitude) {
    if (!isShort(shortCode)) {
      if (isFull(shortCode)) {
        return shortCode;
      } else {
        throw 'ValueError: Passed short code is not valid: ' + shortCode;
      }
    }
    // Ensure that latitude and longitude are valid.
    referenceLatitude = clipLatitude(referenceLatitude);
    referenceLongitude = normalizeLongitude(referenceLongitude);

    // Clean up the passed code.
    shortCode = shortCode.toUpperCase();
    // Compute the number of digits we need to recover.
    var paddingLength = SEPARATOR_POSITION_ - shortCode.indexOf(SEPARATOR_);
    // The resolution (height and width) of the padded area in degrees.
    var resolution = Math.pow(20, 2 - (paddingLength / 2));
    // Distance from the center to an edge (in degrees).
    var areaToEdge = resolution / 2.0;

    // Use the reference location to pad the supplied short code and decode it.
    var codeArea = decode(
        encode(referenceLatitude, referenceLongitude).substr(0, paddingLength)
        + shortCode);
    // How many degrees latitude is the code from the reference? If it is more
    // than half the resolution, we need to move it east or west.
    var degreesDifference = codeArea.latitudeCenter - referenceLatitude;
    if (degreesDifference > areaToEdge) {
      // If the center of the short code is more than half a cell east,
      // then the best match will be one position west.
      codeArea.latitudeCenter -= resolution;
    } else if (degreesDifference < -areaToEdge) {
      // If the center of the short code is more than half a cell west,
      // then the best match will be one position east.
      codeArea.latitudeCenter += resolution;
    }

    // How many degrees longitude is the code from the reference?
    degreesDifference = codeArea.longitudeCenter - referenceLongitude;
    if (degreesDifference > areaToEdge) {
      codeArea.longitudeCenter -= resolution;
    } else if (degreesDifference < -areaToEdge) {
      codeArea.longitudeCenter += resolution;
    }

    return encode(
        codeArea.latitudeCenter, codeArea.longitudeCenter, codeArea.codeLength);
  };

  /**
    Remove characters from the start of an OLC code.

    This uses a reference location to determine how many initial characters
    can be removed from the OLC code. The number of characters that can be
    removed depends on the distance between the code center and the reference
    location.

    The minimum number of characters that will be removed is four. If more than
    four characters can be removed, the additional characters will be replaced
    with the padding character. At most eight characters will be removed.

    The reference location must be within 50% of the maximum range. This ensures
    that the shortened code will be able to be recovered using slightly different
    locations.

    Args:
      code: A full, valid code to shorten.
      latitude: A latitude, in signed decimal degrees, to use as the reference
          point.
      longitude: A longitude, in signed decimal degrees, to use as the reference
          point.

    Returns:
      Either the original code, if the reference location was not close enough,
      or the .
   */
  var shorten = OpenLocationCode.shorten = function(
      code, latitude, longitude) {
    if (!isFull(code)) {
      throw 'ValueError: Passed code is not valid and full: ' + code;
    }
    if (code.indexOf(PADDING_CHARACTER_) != -1) {
      throw 'ValueError: Cannot shorten padded codes: ' + code;
    }
    var code = code.toUpperCase();
    var codeArea = decode(code);
    if (codeArea.codeLength < MIN_TRIMMABLE_CODE_LEN_) {
      throw 'ValueError: Code length must be at least ' +
          MIN_TRIMMABLE_CODE_LEN_;
    }
    // Ensure that latitude and longitude are valid.
    latitude = clipLatitude(latitude);
    longitude = normalizeLongitude(longitude);
    // How close are the latitude and longitude to the code center.
    var range = Math.max(
        Math.abs(codeArea.latitudeCenter - latitude),
        Math.abs(codeArea.longitudeCenter - longitude));
    for (var i = PAIR_RESOLUTIONS_.length - 2; i >= 1; i--) {
      // Check if we're close enough to shorten. The range must be less than 1/2
      // the resolution to shorten at all, and we want to allow some safety, so
      // use 0.3 instead of 0.5 as a multiplier.
      if (range < (PAIR_RESOLUTIONS_[i] * 0.3)) {
        // Trim it.
        return code.substring((i + 1) * 2);
      }
    }
    return code;
  };

  /**
    Clip a latitude into the range -90 to 90.

    Args:
      latitude: A latitude in signed decimal degrees.
   */
  var clipLatitude = function(latitude) {
    return Math.min(90, Math.max(-90, latitude));
  };

  /**
    Compute the latitude precision value for a given code length. Lengths <=
    10 have the same precision for latitude and longitude, but lengths > 10
    have different precisions due to the grid method having fewer columns than
    rows.
   */
  var computeLatitudePrecision = function(codeLength) {
    if (codeLength <= 10) {
      return Math.pow(20, Math.floor(codeLength / -2 + 2));
    }
    return Math.pow(20, -3) / Math.pow(GRID_ROWS_, codeLength - 10);
  };

  /**
    Normalize a longitude into the range -180 to 180, not including 180.

    Args:
      longitude: A longitude in signed decimal degrees.
   */
  var normalizeLongitude = function(longitude) {
    while (longitude < -180) {
      longitude = longitude + 360;
    }
    while (longitude >= 180) {
      longitude = longitude - 360;
    }
    return longitude;
  };

  /**
    Encode a location into a sequence of OLC lat/lng pairs.

    This uses pairs of characters (longitude and latitude in that order) to
    represent each step in a 20x20 grid. Each code, therefore, has 1/400th
    the area of the previous code.

    Args:
      latitude: A latitude in signed decimal degrees.
      longitude: A longitude in signed decimal degrees.
      codeLength: The number of significant digits in the output code, not
          including any separator characters.
   */
  var encodePairs = function(latitude, longitude, codeLength) {
    var code = '';
    // Adjust latitude and longitude so they fall into positive ranges.
    var adjustedLatitude = latitude + LATITUDE_MAX_;
    var adjustedLongitude = longitude + LONGITUDE_MAX_;
    // Count digits - can't use string length because it may include a separator
    // character.
    var digitCount = 0;
    while (digitCount < codeLength) {
      // Provides the value of digits in this place in decimal degrees.
      var placeValue = PAIR_RESOLUTIONS_[Math.floor(digitCount / 2)];
      // Do the latitude - gets the digit for this place and subtracts that for
      // the next digit.
      var digitValue = Math.floor(adjustedLatitude / placeValue);
      adjustedLatitude -= digitValue * placeValue;
      code += CODE_ALPHABET_.charAt(digitValue);
      digitCount += 1;
      // And do the longitude - gets the digit for this place and subtracts that
      // for the next digit.
      digitValue = Math.floor(adjustedLongitude / placeValue);
      adjustedLongitude -= digitValue * placeValue;
      code += CODE_ALPHABET_.charAt(digitValue);
      digitCount += 1;
      // Should we add a separator here?
      if (digitCount == SEPARATOR_POSITION_ && digitCount < codeLength) {
        code += SEPARATOR_;
      }
    }
    if (code.length < SEPARATOR_POSITION_) {
      code = code + Array(SEPARATOR_POSITION_ - code.length + 1).join(PADDING_CHARACTER_);
    }
    if (code.length == SEPARATOR_POSITION_) {
      code = code + SEPARATOR_;
    }
    return code;
  };

  /**
    Encode a location using the grid refinement method into an OLC string.

    The grid refinement method divides the area into a grid of 4x5, and uses a
    single character to refine the area. This allows default accuracy OLC codes
    to be refined with just a single character.

    Args:
      latitude: A latitude in signed decimal degrees.
      longitude: A longitude in signed decimal degrees.
      codeLength: The number of characters required.
   */
  var encodeGrid = function(latitude, longitude, codeLength) {
    var code = '';
    var latPlaceValue = GRID_SIZE_DEGREES_;
    var lngPlaceValue = GRID_SIZE_DEGREES_;
    // Adjust latitude and longitude so they fall into positive ranges and
    // get the offset for the required places.
    var adjustedLatitude = (latitude + LATITUDE_MAX_) % latPlaceValue;
    var adjustedLongitude = (longitude + LONGITUDE_MAX_) % lngPlaceValue;
    for (var i = 0; i < codeLength; i++) {
      // Work out the row and column.
      var row = Math.floor(adjustedLatitude / (latPlaceValue / GRID_ROWS_));
      var col = Math.floor(adjustedLongitude / (lngPlaceValue / GRID_COLUMNS_));
      latPlaceValue /= GRID_ROWS_;
      lngPlaceValue /= GRID_COLUMNS_;
      adjustedLatitude -= row * latPlaceValue;
      adjustedLongitude -= col * lngPlaceValue;
      code += CODE_ALPHABET_.charAt(row * GRID_COLUMNS_ + col);
    }
    return code;
  };

  /**
    Decode an OLC code made up of lat/lng pairs.

    This decodes an OLC code made up of alternating latitude and longitude
    characters, encoded using base 20.

    Args:
      code: A valid OLC code, presumed to be full, but with the separator
      removed.
   */
  var decodePairs = function(code) {
    // Get the latitude and longitude values. These will need correcting from
    // positive ranges.
    var latitude = decodePairsSequence(code, 0);
    var longitude = decodePairsSequence(code, 1);
    // Correct the values and set them into the CodeArea object.
    return new CodeArea(
        latitude[0] - LATITUDE_MAX_,
        longitude[0] - LONGITUDE_MAX_,
        latitude[1] - LATITUDE_MAX_,
        longitude[1] - LONGITUDE_MAX_,
        code.length);
  };

  /**
    Decode either a latitude or longitude sequence.

    This decodes the latitude or longitude sequence of a lat/lng pair encoding.
    Starting at the character at position offset, every second character is
    decoded and the value returned.

    Args:
      code: A valid OLC code, presumed to be full, with the separator removed.
      offset: The character to start from.

    Returns:
      A pair of the low and high values. The low value comes from decoding the
      characters. The high value is the low value plus the resolution of the
      last position. Both values are offset into positive ranges and will need
      to be corrected before use.
   */
  var decodePairsSequence = function(code, offset) {
    var i = 0;
    var value = 0;
    while (i * 2 + offset < code.length) {
      value += CODE_ALPHABET_.indexOf(code.charAt(i * 2 + offset)) *
          PAIR_RESOLUTIONS_[i];
      i += 1;
    }
    return [value, value + PAIR_RESOLUTIONS_[i - 1]];
  };

  /**
    Decode the grid refinement portion of an OLC code.

    This decodes an OLC code using the grid refinement method.

    Args:
      code: A valid OLC code sequence that is only the grid refinement
          portion. This is the portion of a code starting at position 11.
   */
  var decodeGrid = function(code) {
    var latitudeLo = 0.0;
    var longitudeLo = 0.0;
    var latPlaceValue = GRID_SIZE_DEGREES_;
    var lngPlaceValue = GRID_SIZE_DEGREES_;
    var i = 0;
    while (i < code.length) {
      var codeIndex = CODE_ALPHABET_.indexOf(code.charAt(i));
      var row = Math.floor(codeIndex / GRID_COLUMNS_);
      var col = codeIndex % GRID_COLUMNS_;

      latPlaceValue /= GRID_ROWS_;
      lngPlaceValue /= GRID_COLUMNS_;

      latitudeLo += row * latPlaceValue;
      longitudeLo += col * lngPlaceValue;
      i += 1;
    }
    return CodeArea(
        latitudeLo, longitudeLo, latitudeLo + latPlaceValue,
        longitudeLo + lngPlaceValue, code.length);
  };

  /**
    Coordinates of a decoded Open Location Code.

    The coordinates include the latitude and longitude of the lower left and
    upper right corners and the center of the bounding box for the area the
    code represents.

    Attributes:
      latitude_lo: The latitude of the SW corner in degrees.
      longitude_lo: The longitude of the SW corner in degrees.
      latitude_hi: The latitude of the NE corner in degrees.
      longitude_hi: The longitude of the NE corner in degrees.
      latitude_center: The latitude of the center in degrees.
      longitude_center: The longitude of the center in degrees.
      code_length: The number of significant characters that were in the code.
          This excludes the separator.
   */
  var CodeArea = OpenLocationCode.CodeArea = function(
    latitudeLo, longitudeLo, latitudeHi, longitudeHi, codeLength) {
    return new OpenLocationCode.CodeArea.fn.init(
        latitudeLo, longitudeLo, latitudeHi, longitudeHi, codeLength);
  };
  CodeArea.fn = CodeArea.prototype = {
    init: function(
        latitudeLo, longitudeLo, latitudeHi, longitudeHi, codeLength) {
      this.latitudeLo = latitudeLo;
      this.longitudeLo = longitudeLo;
      this.latitudeHi = latitudeHi;
      this.longitudeHi = longitudeHi;
      this.codeLength = codeLength;
      this.latitudeCenter = Math.min(
          latitudeLo + (latitudeHi - latitudeLo) / 2, LATITUDE_MAX_);
      this.longitudeCenter = Math.min(
          longitudeLo + (longitudeHi - longitudeLo) / 2, LONGITUDE_MAX_);
    }
  };
  CodeArea.fn.init.prototype = CodeArea.fn;

  return OpenLocationCode;
}));
