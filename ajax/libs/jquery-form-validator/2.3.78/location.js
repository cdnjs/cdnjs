(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

/**
 * jQuery Form Validator Module: Date
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * The following validators will be added by this module:
 *  - Country
 *  - US state
 *  - longitude and latitude
 *
 * @website http://formvalidator.net/#location-validators
 * @license MIT
 */
(function ($) {

  $.formUtils.registerLoadedModule('location');

  /*
   * Validate that country exists
   */
  $.formUtils.addValidator({
    name: 'country',
    validatorFunction: function (str) {
      return $.inArray(str.toLowerCase(), this.countries) > -1;
    },
    countries: ['afghanistan', 'albania', 'algeria', 'american samoa', 'andorra', 'angola', 'anguilla', 'antarctica', 'antigua and barbuda', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bermuda', 'bhutan', 'bolivia', 'bonaire', 'bosnia and herzegovina', 'botswana', 'bouvet island', 'brazil', 'british indian ocean territory', 'brunei darussalam', 'bulgaria', 'burkina faso', 'burundi', 'cabo verde', 'cambodia', 'cameroon', 'canada', 'cayman islands', 'central african republic', 'chad', 'chile', 'china', 'christmas island', 'cocos islands', 'colombia', 'comoros', 'democratic republic of the congo', 'congo', 'cook islands', 'costa rica', 'côte d\'ivoire', 'croatia', 'cuba', 'curaçao', 'cyprus', 'czechia', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'ecuador', 'egypt', 'el salvador', 'equatorial guinea', 'eritrea', 'estonia', 'ethiopia', 'falkland islands', 'faroe islands', 'fiji', 'finland', 'france', 'french guiana', 'french polynesia', 'french southern territories', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada', 'guadeloupe', 'guam', 'guatemala', 'guernsey', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'heard island and mcdonald islands', 'honduras', 'hong kong', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'isle of man', 'israel', 'italy', 'jamaica', 'japan', 'jersey', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'north korea', 'south korea', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'macao', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'martinique', 'mauritania', 'mauritius', 'mayotte', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia', 'montenegro', 'montserrat', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'new caledonia', 'new zealand', 'nicaragua', 'niger', 'nigeria', 'niue', 'norfolk island', 'northern mariana islands', 'norway', 'oman', 'pakistan', 'palau', 'palestine', 'panama', 'papua new guinea', 'paraguay', 'peru', 'philippines', 'pitcairn', 'poland', 'portugal', 'puerto rico', 'qatar', 'réunion', 'romania', 'russia', 'rwanda', 'saint barthélemy', 'saint helena', 'ascension and tristan da cunha', 'Ascension and tristan da cunha', 'saint kitts and nevis', 'saint lucia', 'saint martin', 'saint pierre and miquelon', 'saint vincent and the grenadines', 'samoa', 'san marino', 'sao tome and principe', 'saudi arabia', 'senegal', 'serbia', 'seychelles', 'sierra leone', 'singapore', 'sint maarten', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'south georgia and the south sandwich islands', 'south sudan', 'spain', 'sri lanka', 'sudan', 'suriname', 'svalbard and jan mayen', 'swaziland', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'timor-leste', 'togo', 'tokelau', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan', 'turks and caicos islands', 'tuvalu', 'uganda', 'ukraine', 'united arab emirates', 'united kingdom', 'united states minor outlying islands', 'united states', 'uruguay', 'uzbekistan', 'vanuatu', 'venezuela', 'vatican city', 'vietnam', 'virgin islands (british)', 'virgin islands (us)', 'wallis and futuna', 'western sahara', 'yemen', 'zambia', 'zimbabwe', 'åland islands'],
    errorMessage: '',
    errorMessageKey: 'badCustomVal'
  });

  /*
   * Is this a valid federate state in the US
   */
  $.formUtils.addValidator({
    name: 'federatestate',
    validatorFunction: function (str) {
      return $.inArray(str.toLowerCase(), this.states) > -1;
    },
    states: ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'district of columbia', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming'],
    errorMessage: '',
    errorMessageKey: 'badCustomVal'
  });


  $.formUtils.addValidator({
    name: 'longlat',
    validatorFunction: function (str) {
      var regexp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
      return regexp.test(str);
    },
    errorMessage: '',
    errorMessageKey: 'badCustomVal'
  });

  /**
   * @private
   * @param {Array} listItems
   * @return {Array}
   */
  var _makeSortedList = function (listItems) {
    var newList = [];
    $.each(listItems, function (i, value) {
      newList.push(value.substr(0, 1).toUpperCase() + value.substr(1, value.length));
    });
    newList.sort();
    return newList;
  };

  $.fn.suggestCountry = function (settings) {
    var countries = _makeSortedList($.formUtils.validators.validate_country.countries),
      usaIndex = $.inArray(countries, 'Usa');

    countries[usaIndex] = 'USA';
    return $.formUtils.suggest(this, countries, settings);
  };

  $.fn.suggestState = function (settings) {
    var states = _makeSortedList($.formUtils.validators.validate_federatestate.states);
    return $.formUtils.suggest(this, states, settings);
  };

})(jQuery);


}));
