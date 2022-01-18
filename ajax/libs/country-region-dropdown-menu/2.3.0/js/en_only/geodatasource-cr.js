(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        try {
            module.exports = factory(require());
        } catch (e) {
            module.exports = factory();
        }
    } else {
        root.gds = factory(root);
    }
}(this, function() {
    "use strict";

    var gdsClass = "gds-cr";
    var countryString = "Please select a country.";
    var regionString = "Please select a region.";
    var showEmptyCountryOption = true;
    var showEmptyRegionOption = true;
    var country_region = [];

    var initialise = function() {
        var countryDropDownList = document.getElementsByClassName(gdsClass);
        for (var i=0; i<countryDropDownList.length; i++) {
            generateCountryField(countryDropDownList[i]);
        }

        // Using autocomplete
        jQuery(".gds-cr-autocomplete").val("");
        var countryDropDownListAutocomplete = document.getElementsByClassName("gds-cr-autocomplete");
        for (var i=0; i<countryDropDownListAutocomplete.length; i++) {
            generateCountryFieldAutocomplete(countryDropDownListAutocomplete[i]);
        }

        // Using semantic-ui
        var countryDropDownListSemantic = document.getElementsByClassName("gds-cr-semantic");
        for (var i=0; i<countryDropDownListSemantic.length; i++) {
            generateCountryFieldSemantic(countryDropDownListSemantic[i]);
        }

        // jQuery to display country flag
        jQuery.widget("custom.iconselectmenu", jQuery.ui.selectmenu, {
            _renderItem: function(ul, item) {
                var li = jQuery("<li>"),
                    wrapper = jQuery("<div>", {text: item.label});

                if (item.disabled) {
                    li.addClass("ui-state-disabled");
                }

                jQuery("<span>", {
                    style: item.element.attr("data-style"),
                    "class": "ui-icon " + item.element.attr("data-class")
                }).appendTo(wrapper);

                return li.append(wrapper).appendTo(ul);
            }
        });

        jQuery(".gds-countryflag").iconselectmenu().iconselectmenu("menuWidget").addClass("ui-menu-icons customicons");
        jQuery(".gds-countryflag").iconselectmenu({ change: function(event) {
            var el = (event.target);
            var countryElement;
            for (var i=0; i<countryDropDownList.length; i++) {
                var ddl = countryDropDownList[i];
                if(ddl === el) {
                    countryElement = ddl;
                }
            }
            var regionID = countryElement.getAttribute("country-data-region-id");
            var regionElement = document.getElementById(regionID);
            generateRegionField(countryElement, regionElement);
        }});
    };

    var generateCountryFieldSemantic = function (countryElementSemantic) {
        var loaded = countryElementSemantic.getAttribute("data-gds-loaded");
        if (loaded === "true") {
            return;
        }

        countryElementSemantic.length = 0;
        var langCountrySemantic = countryElementSemantic.getAttribute("data-language");
        var countryStringSemantic;
        switch (langCountrySemantic) {
            case 'en':
            default:
                countryStringSemantic = "Please select a country.";
        }
        var defaultCountrySelectedValueSemantic = countryElementSemantic.getAttribute("country-data-default-value");
        var foundIndex = 0;
        var countries = '<div class="item" data-value=""><i class="flag"></i>' + countryStringSemantic + '</div>';

        translate(countryElementSemantic);
        initialiseRegion();

        for (var i=0; i<country_region.length; i++) {
            var value = country_region[i][1];
            var cc_iso = country_region[i][0];
            if (defaultCountrySelectedValueSemantic != null && (defaultCountrySelectedValueSemantic === value || defaultCountrySelectedValueSemantic == cc_iso)) {
                defaultCountrySelectedValueSemantic = value;
                foundIndex = i;
                if (showEmptyCountryOption) {
                    foundIndex++;
                }
            }
            countries += '<div class="item" data-value="' + value + '"><i class="' + cc_iso.toLowerCase() + ' flag"></i>' + value + '</div>';
        }

        jQuery('.gds-cr-semantic').html('<input type="hidden" name="gds-cr-semantic-flag" value="' + defaultCountrySelectedValueSemantic + '"> \
<i class="dropdown icon"></i> \
<div class="default text">' + countryStringSemantic + '</div> \
<div class="menu">' + countries + '</div>');
        jQuery('.ui.dropdown').dropdown();

        countryElementSemantic.selectedIndex = foundIndex;

        var regionID = countryElementSemantic.getAttribute("country-data-region-id");
        if (!regionID) {
            console.error("Missing data-region-id on country field.");
            return;
        }
        var regionElement = document.getElementById(regionID);

        if (regionElement) {
            var isRegionAutocomplete = document.getElementsByClassName(regionID+"-autocomplete");
            if (isRegionAutocomplete.length > 0) {
                jQuery("."+regionID+"-autocomplete").val("-");
                initialiseRegionFieldAutocomplete(regionElement);
            } else {
                initialiseRegionFieldSemantic(regionElement);
            }

            countryElementSemantic.onchange = function() {
                var foundIndexChange = 0;
                for (var i=0; i<country_region.length; i++) {
                    var value = country_region[i][1];
                    var cc_iso = country_region[i][0];
                    if ($( ".ui.selection.dropdown.gds-cr-semantic" ).dropdown('get value') == value) {
                        foundIndexChange = i;
                        if (showEmptyCountryOption) {
                            foundIndexChange++;
                        }
                    }
                }
                countryElementSemantic.selectedIndex = foundIndexChange;
                if (isRegionAutocomplete.length > 0) {
                    jQuery("."+regionID+"-autocomplete").val("");
                    generateRegionFieldAutocomplete(countryElementSemantic, regionElement);
                } else {
                    generateRegionFieldSemantic(countryElementSemantic, regionElement);
                }
            };

            if (defaultCountrySelectedValueSemantic !== null && countryElementSemantic.selectedIndex > 0) {
                if (isRegionAutocomplete.length > 0) {
                    jQuery("."+regionID+"-autocomplete").val("");
                    generateRegionFieldAutocomplete(countryElementSemantic, regionElement);
                } else {
                    generateRegionFieldSemantic(countryElementSemantic, regionElement);
                }
                var defaultRegionSelectedValue = regionElement.getAttribute("region-data-default-value");
                if (defaultRegionSelectedValue !== null) {
                    var index = (showEmptyCountryOption) ? countryElementSemantic.selectedIndex - 1: countryElementSemantic.selectedIndex;
                    var data = country_region[index][3];
                    if (isRegionAutocomplete.length > 0) {
                        setDefaultRegionValueAutocomplete(regionElement, data, defaultRegionSelectedValue);
                    } else {
                        setDefaultRegionValueSemantic(regionElement, data, defaultRegionSelectedValue);
                    }
                }
            } else if (showEmptyCountryOption === false) {
                if (isRegionAutocomplete.length > 0) {
                    generateRegionFieldAutocomplete(countryElementSemantic, regionElement);
                } else {
                    generateRegionFieldSemantic(countryElementSemantic, regionElement);
                }
            }
        } else {
            console.error("Region field with ID " + regionID + " not found.");
        }

        countryElementSemantic.setAttribute("data-gds-loaded", "true");
    };

    var initialiseRegionFieldSemantic = function(regionElement) {
        var customRegionBlankOptionString = regionElement.getAttribute("region-data-blank-option");
        var defaultRegionBlankOptionString = customRegionBlankOptionString ? customRegionBlankOptionString : "-";
        regionElement.length = 0;
        if (showEmptyRegionOption) {
            regionElement.options[0] = new Option(defaultRegionBlankOptionString, "");
            regionElement.selectedIndex = 0;
        }
    };

    var generateRegionFieldSemantic = function(countryElement, regionElement) {
        var langRegion = countryElement.getAttribute("data-language");
        switch (langRegion) {
            case 'en':
            default:
                regionString = "Please select a region.";
        }

        var selectedCountryIndex = (showEmptyCountryOption) ? countryElement.selectedIndex - 1 : countryElement.selectedIndex;
        var customRegionOptionString = regionElement.getAttribute("region-data-default-option");
        var defaultRegionOptionString = customRegionOptionString ? customRegionOptionString : regionString;

        if (countryElement.value == "" || selectedCountryIndex == '-1') {
            initialiseRegionFieldSemantic(regionElement);
        } else {
            regionElement.length = 0;
            if (showEmptyRegionOption) {
                regionElement.options[0] = new Option(defaultRegionOptionString, "");
            }
            var regionData = country_region[selectedCountryIndex][3];
            for (var i=0; i<regionData.regions.length; i++) {
                var value = regionData.regions[i];
                regionElement.options[regionElement.length] = new Option(regionData.regions[i], value);
            }
            regionElement.selectedIndex = 0;
        }
    };

    var setDefaultRegionValueSemantic = function(regionElement, data, defaultRegionSelectedValue) {
        for (var i=0; i<data.regions.length; i++) {
            var currVal = data.regions[i][0];
            if (currVal === defaultRegionSelectedValue) {
                regionElement.selectedIndex = (showEmptyRegionOption) ? i + 1 : i;
                break;
            }
        }
    };

    var generateCountryFieldAutocomplete = function(countryElementAutocomplete) {
        var loaded = countryElementAutocomplete.getAttribute("data-gds-loaded");
        if (loaded === "true") {
            return;
        }

        countryElementAutocomplete.length = 0;
        var langCountryAutocomplete = countryElementAutocomplete.getAttribute("data-language");
        var countryStringAutocomplete;
        switch (langCountryAutocomplete) {
            case 'en':
            default:
                countryStringAutocomplete = "Please enter a country.";
        }

        var foundIndex = 0;
        var countriesAutocomplete = [];
        countryElementAutocomplete.setAttribute("placeholder", countryStringAutocomplete);
        var defaultCountrySelectedValue = countryElementAutocomplete.getAttribute("country-data-default-value");

        translate(countryElementAutocomplete);
        initialiseRegion();

        for (var i=0; i<country_region.length; i++) {
            var value = country_region[i][1];
            var cc_iso = country_region[i][0];
            countriesAutocomplete.push(value);
            if (defaultCountrySelectedValue != null && (defaultCountrySelectedValue === value || defaultCountrySelectedValue === cc_iso)) {
                foundIndex = i;
                if (showEmptyCountryOption) {
                    foundIndex++;
                }
                jQuery(".gds-cr-autocomplete").val(value);
            }
        }

        countryElementAutocomplete.selectedIndex = foundIndex;
        jQuery(".gds-cr-autocomplete").autocomplete({
            source: countriesAutocomplete
        });

        var regionID = countryElementAutocomplete.getAttribute("country-data-region-id");
        if (!regionID) {
            console.error("Missing data-region-id on country field.");
            return;
        }
        var regionElement = document.getElementById(regionID);

        if (regionElement) {
            var isRegionAutocomplete = document.getElementsByClassName(regionID+"-autocomplete");
            if (isRegionAutocomplete.length > 0) {
                jQuery("."+regionID+"-autocomplete").val("-");
                initialiseRegionFieldAutocomplete(regionElement);
            } else {
                initialiseRegionField(regionElement);
            }

            countryElementAutocomplete.onchange = function() {
                var foundIndexChange = 0;
                for (var i=0; i<country_region.length; i++) {
                    var value = country_region[i][1];
                    if (jQuery(".gds-cr-autocomplete").val() == value) {
                        foundIndexChange = i;
                        if (showEmptyCountryOption) {
                            foundIndexChange++;
                        }
                    }
                }
                countryElementAutocomplete.selectedIndex = foundIndexChange;
                if (isRegionAutocomplete.length > 0) {
                    jQuery("."+regionID+"-autocomplete").val("");
                    generateRegionFieldAutocomplete(countryElementAutocomplete, regionElement);
                } else {
                    generateRegionField(countryElementAutocomplete, regionElement);
                }
            };

            if (defaultCountrySelectedValue !== null && countryElementAutocomplete.selectedIndex > 0) {
                if (isRegionAutocomplete.length > 0) {
                    jQuery("."+regionID+"-autocomplete").val("");
                    generateRegionFieldAutocomplete(countryElementAutocomplete, regionElement);
                } else {
                    generateRegionField(countryElementAutocomplete, regionElement);
                }
                var defaultRegionSelectedValue = regionElement.getAttribute("region-data-default-value");
                if (defaultRegionSelectedValue !== null) {
                    var index = (showEmptyCountryOption) ? countryElementAutocomplete.selectedIndex - 1: countryElementAutocomplete.selectedIndex;
                    var data = country_region[index][3];
                    if (isRegionAutocomplete.length > 0) {
                        setDefaultRegionValueAutocomplete(regionElement, data, defaultRegionSelectedValue);
                    } else {
                        setDefaultRegionValue(regionElement, data, defaultRegionSelectedValue);
                    }
                }
            } else if (showEmptyCountryOption === false) {
                if (isRegionAutocomplete.length > 0) {
                    generateRegionFieldAutocomplete(countryElementAutocomplete, regionElement);
                } else {
                    generateRegionField(countryElementAutocomplete, regionElement);
                }
            }
        } else {
            console.error("Region field with ID " + regionID + " not found.");
        }

        countryElementAutocomplete.setAttribute("data-gds-loaded", "true");
    };

    var initialiseRegionFieldAutocomplete = function(regionElement) {
        var customRegionBlankOptionString = regionElement.getAttribute("region-data-blank-option");
        var defaultRegionBlankOptionString = customRegionBlankOptionString ? customRegionBlankOptionString : "-";
        regionElement.length = 0;
        if (showEmptyRegionOption) {
            regionElement.length = 0;
            jQuery("."+regionElement.id+"-autocomplete").val(defaultRegionBlankOptionString);
            regionElement.setAttribute("disabled", true);
        }
    };

    var generateRegionFieldAutocomplete = function(countryElement, regionElement) {
        var langRegion = countryElement.getAttribute("data-language");
        switch (langRegion) {
            case 'en':
            default:
                regionString = "Please enter a region.";
        }

        var selectedCountryIndex = (showEmptyCountryOption) ? countryElement.selectedIndex - 1 : countryElement.selectedIndex;

        if (countryElement.value === "") {
            initialiseRegionFieldAutocomplete(regionElement);
        } else if (typeof country_region[selectedCountryIndex] !== 'undefined') {
            var regionsAutocomplete = [];
            regionElement.length = 0;
            regionElement.setAttribute("placeholder", regionString);
            jQuery("."+regionElement.id+"-autocomplete").val("");
            jQuery("."+regionElement.id+"-autocomplete").prop('disabled', false);

            var regionData = country_region[selectedCountryIndex][3];
            for (var i=0; i<regionData.regions.length; i++) {
                var value = regionData.regions[i];
                regionsAutocomplete.push(value[0]);
            }
            jQuery("."+regionElement.id+"-autocomplete").autocomplete({
                source: regionsAutocomplete
            });
        } else {
            initialiseRegionFieldAutocomplete(regionElement);
        }
    };

    var setDefaultRegionValueAutocomplete = function(regionElement, data, defaultRegionSelectedValue) {
        for (var i=0; i<data.regions.length; i++) {
            var currVal = data.regions[i][0];
            if (currVal === defaultRegionSelectedValue) {
                jQuery("."+regionElement.id+"-autocomplete").val(currVal);
                break;
            }
        }
    };

    var generateCountryField = function(countryElement) {
        var loaded = countryElement.getAttribute("data-gds-loaded");
        if (loaded === "true") {
            return;
        }

        countryElement.length = 0;
        var langCountry = countryElement.getAttribute("data-language");
        switch (langCountry) {
            case 'en':
            default:
                countryString = "Please select a country.";
        }
        var customCountryOptionString = countryElement.getAttribute("country-data-default-option");
        var defaultCountryOptionString = customCountryOptionString ? customCountryOptionString : countryString;
        var defaultCountrySelectedValue = countryElement.getAttribute("country-data-default-value");
        var foundIndex = 0;

        if (showEmptyCountryOption) {
            countryElement.options[0] = new Option(defaultCountryOptionString, '');
        }

        translate(countryElement);
        initialiseRegion();

        for (var i=0; i<country_region.length; i++) {
            var value = country_region[i][1];
            var cc_iso = country_region[i][0];
            (countryElement.options[countryElement.length] = new Option(country_region[i][1], value)).setAttribute("data-class", cc_iso.toLowerCase());
            if (defaultCountrySelectedValue != null && (defaultCountrySelectedValue === value || defaultCountrySelectedValue === cc_iso)) {
                foundIndex = i;
                if (showEmptyCountryOption) {
                    foundIndex++;
                }
            }
        }

        countryElement.selectedIndex = foundIndex;

        var regionID = countryElement.getAttribute("country-data-region-id");
        if (!regionID) {
            console.error("Missing data-region-id on country field.");
            return;
        }
        var regionElement = document.getElementById(regionID);

        if (regionElement) {
            var isRegionAutocomplete = document.getElementsByClassName(regionID+"-autocomplete");
            if (isRegionAutocomplete.length > 0) {
                jQuery("."+regionID+"-autocomplete").val("-");
                initialiseRegionFieldAutocomplete(regionElement);
            } else {
                initialiseRegionField(regionElement);
            }

            countryElement.onchange = function() {
                if (isRegionAutocomplete.length > 0) {
                    jQuery("."+regionID+"-autocomplete").val("");
                    generateRegionFieldAutocomplete(countryElement, regionElement);
                } else {
                    generateRegionField(countryElement, regionElement);
                }
            };

            if (defaultCountrySelectedValue !== null && countryElement.selectedIndex > 0) {
                if (isRegionAutocomplete.length > 0) {
                    jQuery("."+regionID+"-autocomplete").val("");
                    generateRegionFieldAutocomplete(countryElement, regionElement);
                } else {
                    generateRegionField(countryElement, regionElement);
                }
                var defaultRegionSelectedValue = regionElement.getAttribute("region-data-default-value");
                if (defaultRegionSelectedValue !== null) {
                    var index = (showEmptyCountryOption) ? countryElement.selectedIndex - 1: countryElement.selectedIndex;
                    var data = country_region[index][3];
                    if (isRegionAutocomplete.length > 0) {
                        setDefaultRegionValueAutocomplete(regionElement, data, defaultRegionSelectedValue);
                    } else {
                        setDefaultRegionValue(regionElement, data, defaultRegionSelectedValue);
                    }
                }
            } else if (showEmptyCountryOption === false) {
                if (isRegionAutocomplete.length > 0) {
                    generateRegionFieldAutocomplete(countryElement, regionElement);
                } else {
                    generateRegionField(countryElement, regionElement);
                }
            }
        } else {
            console.error("Region field with ID " + regionID + " not found.");
        }

        countryElement.setAttribute("data-gds-loaded", "true");
    };

    var translate = function(countryElement){
        var region_lang = countryElement.getAttribute("data-language");
        var get = new Gettext({ 'domain' : region_lang});

        //get translated country name
        var ad_country=get.gettext("Andorra");var ae_country=get.gettext("United Arab Emirates");var af_country=get.gettext("Afghanistan");var ag_country=get.gettext("Antigua and Barbuda");var ai_country=get.gettext("Anguilla");var al_country=get.gettext("Albania");var am_country=get.gettext("Armenia");var ao_country=get.gettext("Angola");var aq_country=get.gettext("Antarctica");var ar_country=get.gettext("Argentina");var as_country=get.gettext("American Samoa");var at_country=get.gettext("Austria");var au_country=get.gettext("Australia");var aw_country=get.gettext("Aruba");var ax_country=get.gettext("Aland Islands");var az_country=get.gettext("Azerbaijian");
        var ba_country=get.gettext("Bosnia and Herzegovina");var bb_country=get.gettext("Barbados");var bd_country=get.gettext("Bangladesh");var be_country=get.gettext("Belgium");var bf_country=get.gettext("Burkina Faso");var bg_country=get.gettext("Bulgaria");var bh_country=get.gettext("Bahrain");var bi_country=get.gettext("Burundi");var bj_country=get.gettext("Benin");var bl_country=get.gettext("Saint Barthelemy");var bm_country=get.gettext("Bermuda");var bn_country=get.gettext("Brunei Darussalam");var bo_country=get.gettext("Bolivia (Plurinational State of)");var bq_country=get.gettext("Bonaire, Sint Eustatius and Saba");var br_country=get.gettext("Brazil");var bs_country=get.gettext("Bahamas");var bt_country=get.gettext("Bhutan");var bw_country=get.gettext("Botswana");var by_country=get.gettext("Belarus");var bz_country=get.gettext("Belize");
        var ca_country=get.gettext("Canada");var cc_country=get.gettext("Cocos (Keeling) Islands");var cd_country=get.gettext("Congo (Democratic Republic of the)");var cf_country=get.gettext("Central African Republic");var cg_country=get.gettext("Congo");var ch_country=get.gettext("Switzerland");var ci_country=get.gettext("Cote D'ivoire");var ck_country=get.gettext("Cook Islands");var cl_country=get.gettext("Chile");var cm_country=get.gettext("Cameroon");var cn_country=get.gettext("China");var co_country=get.gettext("Colombia");var cr_country=get.gettext("Costa Rica");var cu_country=get.gettext("Cuba");var cv_country=get.gettext("Cabo Verde");var cw_country=get.gettext("Curacao");var cx_country=get.gettext("Christmas Island");var cy_country=get.gettext("Cyprus");var cz_country=get.gettext("Czechia");
        var de_country=get.gettext("Germany");var dj_country=get.gettext("Djibouti");var dk_country=get.gettext("Denmark");var dm_country=get.gettext("Dominica");var do1_country=get.gettext("Dominican Republic");var dz_country=get.gettext("Algeria");
        var ec_country=get.gettext("Ecuador");var ee_country=get.gettext("Estonia");var eg_country=get.gettext("Egypt");var eh_country=get.gettext("Western Sahara");var er_country=get.gettext("Eritrea");var es_country=get.gettext("Spain");var et_country=get.gettext("Ethiopia");
        var fi_country=get.gettext("Finland");var fj_country=get.gettext("Fiji");var fk_country=get.gettext("Falkland Islands (Malvinas)");var fm_country=get.gettext("Micronesia (Federated States of)");var fo_country=get.gettext("Faroe Islands");var fr_country=get.gettext("France");
        var ga_country=get.gettext("Gabon");var gb_country=get.gettext("United Kingdom of Great Britain and Northern Ireland");var gd_country=get.gettext("Grenada");var ge_country=get.gettext("Georgia");var gf_country=get.gettext("French Guiana");var gg_country=get.gettext("Guernsey");var gh_country=get.gettext("Ghana");var gi_country=get.gettext("Gibraltar");var gl_country=get.gettext("Greenland");var gm_country=get.gettext("Gambia");var gn_country=get.gettext("Guinea");var gp_country=get.gettext("Guadeloupe");var gq_country=get.gettext("Equatorial Guinea");var gr_country=get.gettext("Greece");var gs_country=get.gettext("South Georgia and The South Sandwich Islands");var gt_country=get.gettext("Guatemala");var gu_country=get.gettext("Guam");var gw_country=get.gettext("Guinea-Bissau");var gy_country=get.gettext("Guyana");
        var hk_country=get.gettext("Hong Kong");var hn_country=get.gettext("Honduras");var hr_country=get.gettext("Croatia");var ht_country=get.gettext("Haiti");var hu_country=get.gettext("Hungary");
        var id_country=get.gettext("Indonesia");var ie_country=get.gettext("Ireland");var il_country=get.gettext("Israel");var im_country=get.gettext("Isle of Man");var in1_country=get.gettext("India");var io_country=get.gettext("British Indian Ocean Territory");var iq_country=get.gettext("Iraq");var ir_country=get.gettext("Iran (Islamic Republic of)");var is_country=get.gettext("Iceland");var it_country=get.gettext("Italy");
        var je_country=get.gettext("Jersey");var jm_country=get.gettext("Jamaica");var jo_country=get.gettext("Jordan");var jp_country=get.gettext("Japan");
        var ke_country=get.gettext("Kenya");var kg_country=get.gettext("Kyrgyzstan");var kh_country=get.gettext("Cambodia");var ki_country=get.gettext("Kiribati");var km_country=get.gettext("Comoros");var kn_country=get.gettext("Saint Kitts and Nevis");var kp_country=get.gettext("Korea (Democratic People's Republic of)");var kr_country=get.gettext("Korea (Republic of)");var kw_country=get.gettext("Kuwait");var ky_country=get.gettext("Cayman Islands");var kz_country=get.gettext("Kazakhstan");
        var la_country=get.gettext("Lao People's Democratic Republic");var lb_country=get.gettext("Lebanon");var lc_country=get.gettext("Saint Lucia");var li_country=get.gettext("Liechtenstein");var lk_country=get.gettext("Sri Lanka");var lr_country=get.gettext("Liberia");var ls_country=get.gettext("Lesotho");var lt_country=get.gettext("Lithuania");var lu_country=get.gettext("Luxembourg");var lv_country=get.gettext("Latvia");var ly_country=get.gettext("Libya");
        var ma_country=get.gettext("Morocco");var mc_country=get.gettext("Monaco");var md_country=get.gettext("Moldova (Republic of)");var me_country=get.gettext("Montenegro");var mf_country=get.gettext("Saint Martin (French Part)");var mg_country=get.gettext("Madagascar");var mh_country=get.gettext("Marshall Islands");var mk_country=get.gettext("North Macedonia");var ml_country=get.gettext("Mali");var mm_country=get.gettext("Myanmar");var mn_country=get.gettext("Mongolia");var mo_country=get.gettext("Macao");var mp_country=get.gettext("Northern Mariana Islands");var mq_country=get.gettext("Martinique");var mr_country=get.gettext("Mauritania");var ms_country=get.gettext("Montserrat");var mt_country=get.gettext("Malta");var mu_country=get.gettext("Mauritius");var mv_country=get.gettext("Maldives");var mw_country=get.gettext("Malawi");var mx_country=get.gettext("Mexico");var my_country=get.gettext("Malaysia");var mz_country=get.gettext("Mozambique");
        var na_country=get.gettext("Namibia");var nc_country=get.gettext("New Caledonia");var ne_country=get.gettext("Niger");var nf_country=get.gettext("Norfolk Island");var ng_country=get.gettext("Nigeria");var ni_country=get.gettext("Nicaragua");var nl_country=get.gettext("Netherlands");var no_country=get.gettext("Norway");var np_country=get.gettext("Nepal");var nr_country=get.gettext("Nauru");var nu_country=get.gettext("Niue");var nz_country=get.gettext("New Zealand");
        var om_country=get.gettext("Oman");
        var pa_country=get.gettext("Panama");var pe_country=get.gettext("Peru");var pf_country=get.gettext("French Polynesia");var pg_country=get.gettext("Papua New Guinea");var ph_country=get.gettext("Philippines");var pk_country=get.gettext("Pakistan");var pl_country=get.gettext("Poland");var pm_country=get.gettext("Saint Pierre and Miquelon");var pn_country=get.gettext("Pitcairn");var pr_country=get.gettext("Puerto Rico");var ps_country=get.gettext("Palestine, State of");var pt_country=get.gettext("Portugal");var pw_country=get.gettext("Palau");var py_country=get.gettext("Paraguay");
        var qa_country=get.gettext("Qatar");
        var re_country=get.gettext("Reunion_RE");var ro_country=get.gettext("Romania_RO");var rs_country=get.gettext("Serbia");var ru_country=get.gettext("Russian Federation_RU");var rw_country=get.gettext("Rwanda");
        var sa_country=get.gettext("Saudi Arabia");var sb_country=get.gettext("Solomon Islands");var sc_country=get.gettext("Seychelles");var sd_country=get.gettext("Sudan");var se_country=get.gettext("Sweden_SE");var sg_country=get.gettext("Singapore");    var sh_country=get.gettext("Saint Helena, Ascension and Tristan Da Cunha");var si_country=get.gettext("Slovenia_SI");var sj_country=get.gettext("Svalbard and Jan Mayen");var sk_country=get.gettext("Slovakia");var sl_country=get.gettext("Sierra Leone");var sm_country=get.gettext("San Marino");var sn_country=get.gettext("Senegal");var so_country=get.gettext("Somalia_SO");var sr_country=get.gettext("Suriname");var ss_country=get.gettext("South Sudan");var st_country=get.gettext("Sao Tome and Principe");var sv_country=get.gettext("El Salvador");var sx_country=get.gettext("Sint Maarten (Dutch Part)");var sy_country=get.gettext("Syrian Arab Republic");var sz_country=get.gettext("Eswatini");
        var tc_country=get.gettext("Turks and Caicos Islands");var td_country=get.gettext("Chad");var tf_country=get.gettext("French Southern Territories");var tg_country=get.gettext("Togo");var th_country=get.gettext("Thailand");var tj_country=get.gettext("Tajikistan");var tk_country=get.gettext("Tokelau");var tl_country=get.gettext("Timor-Leste");var tm_country=get.gettext("Turkmenistan");var tn_country=get.gettext("Tunisia");var to_country=get.gettext("Tonga");var tr_country=get.gettext("Turkey");var tt_country=get.gettext("Trinidad and Tobago");var tv_country=get.gettext("Tuvalu");var tw_country=get.gettext("Taiwan (Province of China)");var tz_country=get.gettext("Tanzania, United Republic of");
        var ua_country=get.gettext("Ukraine");var ug_country=get.gettext("Uganda");var um_country=get.gettext("United States Minor Outlying Islands");var us_country=get.gettext("United States of America");var uy_country=get.gettext("Uruguay");var uz_country=get.gettext("Uzbekistan");
        var va_country=get.gettext("Holy See");var vc_country=get.gettext("Saint Vincent and The Grenadines");var ve_country=get.gettext("enezuela (Bolivarian Republic of)");var vg_country=get.gettext("Virgin Islands (British)");var vi_country=get.gettext("Virgin Islands (U.S.)");var vn_country=get.gettext("Viet Nam");var vu_country=get.gettext("Vanuatu");
        var wf_country=get.gettext("Wallis and Futuna");var ws_country=get.gettext("Samoa");
        var ye_country=get.gettext("Yemen");var yt_country=get.gettext("Mayotte");
        var za_country=get.gettext("South Africa");var zm_country=get.gettext("Zambia");var zw_country=get.gettext("Zimbabwe");;

        //region data by country
        var ad_region=["Andorra la Vella","Canillo","Encamp","Escaldes-Engordany","La Massana","Ordino","Sant Julia de Loria"];
        var ae_region=["\'Ajman","Abu Zaby","Al Fujayrah","Ash Shariqah","Dubayy","Ra's al Khaymah","Umm al Qaywayn"];
        var af_region=["Badakhshan","Badghis","Baghlan","Balkh","Bamyan","Daykundi","Farah","Faryab","Ghazni","Ghor","Helmand","Herat","Jowzjan","Kabul","Kandahar","Kapisa","Khost","Kunar","Kunduz","Laghman","Logar","Nangarhar","Nimroz","Nuristan","Paktika","Paktiya","Panjshayr","Parwan","Samangan","Sar-e Pul","Takhar","Uruzgan","Wardak","Zabul"];
        var ag_region=["Barbuda","Redonda","Saint George","Saint John","Saint Mary","Saint Paul","Saint Peter","Saint Philip"];
        var ai_region=["Anguilla"];
        var al_region=["Berat","Diber","Durres","Elbasan","Fier","Gjirokaster","Korce","Kukes","Lezhe","Shkoder","Tirane","Vlore"];
        var am_region=["Aragacotn","Ararat","Armavir","Erevan","Gegark'unik'","Kotayk'","Lori","Sirak","Syunik'","Tavus","Vayoc Jor"];
        var ao_region=["Bengo","Benguela","Bie","Cabinda","Cunene","Huambo","Huila","Kuando Kubango","Kwanza Norte","Kwanza Sul","Luanda","Lunda Norte","Lunda Sul","Malange","Moxico","Namibe","Uige","Zaire"];
        var aq_region=["Antarctica"];
        var ar_region=["Buenos Aires","Catamarca","Chaco","Chubut","Ciudad Autonoma de Buenos Aires","Cordoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquen","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucuman"];
        var as_region=["Eastern District","Western District"];
        var at_region=["Burgenland","Karnten","Niederosterreich","Oberosterreich","Salzburg","Steiermark","Tirol","Vorarlberg","Wien"];
        var au_region=["Australian Capital Territory","New South Wales","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia"];
        var aw_region=["Aruba"];
        var ax_region=["Eckeroe","Finstroem","Hammarland","Jomala","Lemland","Mariehamn","Saltvik","Sund"];
        var az_region=["Abseron","Agcabadi","Agdam","Agdas","Agstafa","Agsu","Astara","Baki","Balakan","Barda","Beylaqan","Bilasuvar","Cabrayil","Calilabad","Daskasan","Fuzuli","Gadabay","Ganca","Goranboy","Goycay","Goygol","Haciqabul","Imisli","Ismayilli","Kalbacar","Kurdamir","Lacin","Lankaran","Lerik","Masalli","Mingacevir","Naftalan","Naxcivan","Neftcala","Oguz","Qabala","Qax","Qazax","Qobustan","Quba","Qubadli","Qusar","Saatli","Sabirabad","Saki","Salyan","Samaxi","Samkir","Samux","Sirvan","Siyazan","Sumqayit","Susa","Tartar","Tovuz","Ucar","Xacmaz","Xankandi","Xizi","Xocali","Xocavand","Yardimli","Yevlax","Zangilan","Zaqatala","Zardab"];
        var ba_region=["Brcko distrikt","Federacija Bosne i Hercegovine","Republika Srpska"];
        var bb_region=["Christ Church","Saint Andrew","Saint George","Saint James","Saint John","Saint Joseph","Saint Lucy","Saint Michael","Saint Peter","Saint Philip","Saint Thomas"];
        var bd_region=["Barisal","Chittagong","Dhaka","Khulna","Rajshahi","Rangpur","Sylhet"];
        var be_region=["Antwerpen","Brabant wallon","Brussels Hoofdstedelijk Gewest","Hainaut","Liege","Limburg","Luxembourg","Namur","Oost-Vlaanderen","Vlaams-Brabant","West-Vlaanderen"];
        var bf_region=["Bale","Bam","Banwa","Bazega","Bougouriba","Boulgou","Boulkiemde","Comoe","Ganzourgou","Gnagna","Gourma","Houet","Ioba","Kadiogo","Kenedougou","Komondjari","Kompienga","Kossi","Koulpelogo","Kouritenga","Kourweogo","Leraba","Loroum","Mouhoun","Nahouri","Namentenga","Nayala","Noumbiel","Oubritenga","Oudalan","Passore","Poni","Sanguie","Sanmatenga","Seno","Sissili","Soum","Sourou","Tapoa","Tuy","Yagha","Yatenga","Ziro","Zondoma","Zoundweogo"];
        var bg_region=["Blagoevgrad","Burgas","Dobrich","Gabrovo","Haskovo","Kardzhali","Kyustendil","Lovech","Montana","Pazardzhik","Pernik","Pleven","Plovdiv","Razgrad","Ruse","Shumen","Silistra","Sliven","Smolyan","Sofia","Sofia (stolitsa)","Stara Zagora","Targovishte","Varna","Veliko Tarnovo","Vidin","Vratsa","Yambol"];
        var bh_region=["Al 'Asimah","Al Janubiyah","Al Muharraq","Ash Shamaliyah"];
        var bi_region=["Bubanza","Bujumbura Mairie","Bururi","Cankuzo","Cibitoke","Gitega","Karuzi","Kayanza","Kirundo","Makamba","Muramvya","Muyinga","Mwaro","Ngozi","Rutana","Ruyigi"];
        var bj_region=["Alibori","Atacora","Atlantique","Borgou","Collines","Couffo","Donga","Littoral","Mono","Oueme","Plateau","Zou"];
        var bl_region=["Saint Barthelemy"];
        var bm_region=["Hamilton","Saint George"];
        var bn_region=["Belait","Brunei-Muara","Temburong","Tutong"];
        var bo_region=["Chuquisaca","Cochabamba","El Beni","La Paz","Oruro","Pando","Potosi","Santa Cruz","Tarija"];
        var bq_region=["Bonaire","Saba","Sint Eustatius"];
        var br_region=["Acre","Alagoas","Amapa","Amazonas","Bahia","Ceara","Distrito Federal","Espirito Santo","Goias","Maranhao","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Para","Paraiba","Parana","Pernambuco","Piaui","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondonia","Roraima","Santa Catarina","Sao Paulo","Sergipe","Tocantins"];
        var bs_region=["Central Andros","City of Freeport","East Grand Bahama","Harbour Island","Hope Town","Long Island","New Providence","South Eleuthera"];
        var bt_region=["Bumthang","Chhukha","Dagana","Gasa","Haa","Lhuentse","Monggar","Paro","Pemagatshel","Punakha","Samdrup Jongkhar","Samtse","Thimphu","Trashi Yangtse","Trashigang","Trongsa","Tsirang","Wangdue Phodrang","Zhemgang"];
        var bw_region=["Central","Ghanzi","Kgalagadi","Kgatleng","Kweneng","North East","North West","South East","Southern"];
        var by_region=["Brestskaya voblasts'","Homyel'skaya voblasts'","Horad Minsk","Hrodzenskaya voblasts'","Mahilyowskaya voblasts'","Minskaya voblasts'","Vitsyebskaya voblasts'"];
        var bz_region=["Belize","Cayo","Corozal","Orange Walk","Stann Creek","Toledo"];
        var ca_region=["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"];
        var cc_region=["Cocos (Keeling) Islands"];
        var cd_region=["Bas-Uele","Equateur","Haut-Katanga","Haut-Lomami","Haut-Uele","Ituri","Kasai","Kasai Central","Kasai Oriental","Kinshasa","Kongo Central","Kwango","Kwilu","Lomami","Lualaba","Mai-Ndombe","Maniema","Mongala","Nord-Kivu","Nord-Ubangi","Sankuru","Sud-Kivu","Sud-Ubangi","Tanganyika","Tshopo","Tshuapa"];
        var cf_region=["Bamingui-Bangoran","Bangui","Basse-Kotto","Gribingui","Haut-Mbomou","Haute-Kotto","Kemo-Gribingui","Lobaye","Mambere-Kadei","Mbomou","Nana-Mambere","Ombella-Mpoko","Ouaka","Ouham","Ouham-Pende","Sangha","Vakaga"];
        var cg_region=["Bouenza","Brazzaville","Cuvette","Cuvette-Ouest","Lekoumou","Likouala","Niari","Plateaux","Pointe-Noire","Pool","Sangha"];
        var ch_region=["Aargau","Appenzell Ausserrhoden","Appenzell Innerrhoden","Basel-Landschaft","Basel-Stadt","Bern","Fribourg","Geneve","Glarus","Graubunden","Jura","Luzern","Neuchatel","Nidwalden","Obwalden","Sankt Gallen","Schaffhausen","Schwyz","Solothurn","Thurgau","Ticino","Uri","Valais","Vaud","Zug","Zurich"];
        var ci_region=["Abidjan","Bas-Sassandra","Comoe","Denguele","Goh-Djiboua","Lacs","Lagunes","Montagnes","Sassandra-Marahoue","Savanes","Vallee du Bandama","Woroba","Yamoussoukro","Zanzan"];
        var ck_region=["Cook Islands"];
        var cl_region=["Aisen del General Carlos Ibanez del Campo","Antofagasta","Arica y Parinacota","Atacama","Biobio","Coquimbo","La Araucania","Libertador General Bernardo O'Higgins","Los Lagos","Los Rios","Magallanes","Maule","Region Metropolitana de Santiago","Tarapaca","Valparaiso"];
        var cm_region=["Adamaoua","Centre","Est","Extreme-Nord","Littoral","Nord","Nord-Ouest","Ouest","Sud","Sud-Ouest"];
        var cn_region=["Anhui","Beijing","Chongqing","Fujian","Gansu","Guangdong","Guangxi","Guizhou","Hainan","Hebei","Heilongjiang","Henan","Hubei","Hunan","Jiangsu","Jiangxi","Jilin","Liaoning","Nei Mongol","Ningxia","Qinghai","Shaanxi","Shandong","Shanghai","Shanxi","Sichuan","Tianjin","Xinjiang","Xizang","Yunnan","Zhejiang"];
        var co_region=["Amazonas","Antioquia","Arauca","Atlantico","Bolivar","Boyaca","Caldas","Caqueta","Casanare","Cauca","Cesar","Choco","Cordoba","Cundinamarca","Distrito Capital de Bogota","Guainia","Guaviare","Huila","La Guajira","Magdalena","Meta","Narino","Norte de Santander","Putumayo","Quindio","Risaralda","San Andres, Providencia y Santa Catalina","Santander","Sucre","Tolima","Valle del Cauca","Vaupes","Vichada"];
        var cr_region=["Alajuela","Cartago","Guanacaste","Heredia","Limon","Puntarenas","San Jose"];
        var cu_region=["Artemisa","Camaguey","Ciego de Avila","Cienfuegos","Granma","Guantanamo","Holguin","Isla de la Juventud","La Habana","Las Tunas","Matanzas","Mayabeque","Pinar del Rio","Sancti Spiritus","Santiago de Cuba","Villa Clara"];
        var cv_region=["Boa Vista","Brava","Maio","Mosteiros","Paul","Porto Novo","Praia","Ribeira Brava","Ribeira Grande","Ribeira Grande de Santiago","Sal","Santa Catarina","Santa Catarina do Fogo","Santa Cruz","Sao Domingos","Sao Filipe","Sao Lourenco dos Orgaos","Sao Miguel","Sao Salvador do Mundo","Sao Vicente","Tarrafal","Tarrafal de Sao Nicolau"];
        var cw_region=["Curacao"];
        var cx_region=["Christmas Island"];
        var cy_region=["Ammochostos","Keryneia","Larnaka","Lefkosia","Lemesos","Pafos"];
        var cz_region=["Jihocesky kraj","Jihomoravsky kraj","Karlovarsky kraj","Kraj Vysocina","Kralovehradecky kraj","Liberecky kraj","Moravskoslezsky kraj","Olomoucky kraj","Pardubicky kraj","Plzensky kraj","Praha, Hlavni mesto","Stredocesky kraj","Ustecky kraj","Zlinsky kraj"];
        var de_region=["Baden-Wurttemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thuringen"];
        var dj_region=["Ali Sabieh","Arta","Dikhil","Djibouti","Obock","Tadjourah"];
        var dk_region=["Hovedstaden","Midtjylland","Nordjylland","Sjaelland","Syddanmark"];
        var dm_region=["Saint Andrew","Saint David","Saint George","Saint John","Saint Joseph","Saint Luke","Saint Mark","Saint Patrick","Saint Paul","Saint Peter"];
        var do1_region=["Azua","Baoruco","Barahona","Dajabon","Distrito Nacional (Santo Domingo)","Duarte","El Seibo","Elias Pina","Espaillat","Hato Mayor","Hermanas Mirabal","Independencia","La Altagracia","La Romana","La Vega","Maria Trinidad Sanchez","Monsenor Nouel","Monte Cristi","Monte Plata","Pedernales","Peravia","Puerto Plata","Samana","San Cristobal","San Jose de Ocoa","San Juan","San Pedro de Macoris","Sanchez Ramirez","Santiago","Santiago Rodriguez","Valverde"];
        var dz_region=["Adrar","Ain Defla","Ain Temouchent","Alger","Annaba","Batna","Bechar","Bejaia","Biskra","Blida","Bordj Bou Arreridj","Bouira","Boumerdes","Chlef","Constantine","Djelfa","El Bayadh","El Oued","El Tarf","Ghardaia","Guelma","Illizi","Jijel","Khenchela","Laghouat","M'sila","Mascara","Medea","Mila","Mostaganem","Naama","Oran","Ouargla","Oum el Bouaghi","Relizane","Saida","Setif","Sidi Bel Abbes","Skikda","Souk Ahras","Tamanrasset","Tebessa","Tiaret","Tindouf","Tipaza","Tissemsilt","Tizi Ouzou","Tlemcen"];
        var ec_region=["Azuay","Bolivar","Canar","Carchi","Chimborazo","Cotopaxi","El Oro","Esmeraldas","Galapagos","Guayas","Imbabura","Loja","Los Rios","Manabi","Morona Santiago","Napo","Orellana","Pastaza","Pichincha","Santa Elena","Santo Domingo de los Tsachilas","Sucumbios","Tungurahua","Zamora Chinchipe"];
        var ee_region=["Harjumaa","Hiiumaa","Ida-Virumaa","Jarvamaa","Jogevamaa","Laane-Virumaa","Laanemaa","Parnumaa","Polvamaa","Raplamaa","Saaremaa","Tartumaa","Valgamaa","Viljandimaa","Vorumaa"];
        var eg_region=["Ad Daqahliyah","Al Bahr al Ahmar","Al Buhayrah","Al Fayyum","Al Gharbiyah","Al Iskandariyah","Al Isma'iliyah","Al Jizah","Al Minufiyah","Al Minya","Al Qahirah","Al Qalyubiyah","Al Uqsur","Al Wadi al Jadid","As Suways","Ash Sharqiyah","Aswan","Asyut","Bani Suwayf","Bur Sa'id","Dumyat","Janub Sina'","Kafr ash Shaykh","Matruh","Qina","Shamal Sina'","Suhaj"];
        var eh_region=["Western Sahara"];
        var er_region=["Al Awsat","Al Janubi","Ansaba","Janubi al Bahri al Ahmar","Qash-Barkah","Shimali al Bahri al Ahmar"];
        var es_region=["Andalucia","Aragon","Asturias, Principado de","Canarias","Cantabria","Castilla y Leon","Castilla-La Mancha","Catalunya","Ceuta","Extremadura","Galicia","Illes Balears","La Rioja","Madrid, Comunidad de","Melilla","Murcia, Region de","Navarra, Comunidad Foral de","Pais Vasco","Valenciana, Comunidad"];
        var et_region=["Adis Abeba","Afar","Amara","Binshangul Gumuz","Dire Dawa","Gambela Hizboch","Hareri Hizb","Oromiya","Sumale","Tigray","YeDebub Biheroch Bihereseboch na Hizboch"];
        var fi_region=["Etela-Karjala","Etela-Pohjanmaa","Etela-Savo","Kainuu","Kanta-Hame","Keski-Pohjanmaa","Keski-Suomi","Kymenlaakso","Lappi","Paijat-Hame","Pirkanmaa","Pohjanmaa","Pohjois-Karjala","Pohjois-Pohjanmaa","Pohjois-Savo","Satakunta","Uusimaa","Varsinais-Suomi"];
        var fj_region=["Central","Eastern","Northern","Rotuma","Western"];
        var fk_region=["Falkland Islands (Malvinas)"];
        var fm_region=["Chuuk","Kosrae","Pohnpei","Yap"];
        var fo_region=["Eysturoy","Nordoyar","Sandoy","Streymoy","Suduroy","Vagar"];
        var fr_region=["Auvergne-Rhone-Alpes","Bourgogne-Franche-Comte","Bretagne","Centre-Val de Loire","Corse","Grand-Est","Hauts-de-France","Ile-de-France","Normandie","Nouvelle-Aquitaine","Occitanie","Pays-de-la-Loire","Provence-Alpes-Cote-d'Azur"];
        var ga_region=["Estuaire","Haut-Ogooue","Moyen-Ogooue","Ngounie","Nyanga","Ogooue-Ivindo","Ogooue-Lolo","Ogooue-Maritime","Woleu-Ntem"];
        var gb_region=["England","Northern Ireland","Scotland","Wales"];
        var gd_region=["Saint Andrew","Saint David","Saint George","Saint John","Saint Mark","Saint Patrick","Southern Grenadine Islands"];
        var ge_region=["Abkhazia","Ajaria","Guria","Imereti","K'akheti","Kvemo Kartli","Mtskheta-Mtianeti","Rach'a-Lechkhumi-Kvemo Svaneti","Samegrelo-Zemo Svaneti","Samtskhe-Javakheti","Shida Kartli","Tbilisi"];
        var gf_region=["Guyane"];
        var gg_region=["Guernsey"];
        var gh_region=["Ashanti","Brong-Ahafo","Central","Eastern","Greater Accra","Northern","Upper East","Upper West","Volta","Western"];
        var gi_region=["Gibraltar"];
        var gl_region=["Avannaata Kommunia","Kommune Kujalleq","Kommune Qeqertalik","Kommuneqarfik Sermersooq","Qeqqata Kommunia"];
        var gm_region=["Banjul","Central River","Lower River","North Bank","Upper River","Western"];
        var gn_region=["Beyla","Boffa","Boke","Conakry","Coyah","Dabola","Dalaba","Dinguiraye","Dubreka","Faranah","Forecariah","Fria","Gaoual","Guekedou","Kankan","Kerouane","Kindia","Kissidougou","Koubia","Koundara","Kouroussa","Labe","Lelouma","Lola","Macenta","Mali","Mamou","Mandiana","Nzerekore","Pita","Siguiri","Telimele","Tougue","Yomou"];
        var gp_region=["Guadeloupe"];
        var gq_region=["Annobon","Bioko Norte","Bioko Sur","Centro Sur","Kie-Ntem","Litoral","Wele-Nzas"];
        var gr_region=["Agion Oros","Anatoliki Makedonia kai Thraki","Attiki","Dytiki Ellada","Dytiki Makedonia","Ionia Nisia","Ipeiros","Kentriki Makedonia","Kriti","Notio Aigaio","Peloponnisos","Sterea Ellada","Thessalia","Voreio Aigaio"];
        var gs_region=["South Georgia and the South Sandwich Islands"];
        var gt_region=["Alta Verapaz","Baja Verapaz","Chimaltenango","Chiquimula","El Progreso","Escuintla","Guatemala","Huehuetenango","Izabal","Jalapa","Jutiapa","Peten","Quetzaltenango","Quiche","Retalhuleu","Sacatepequez","San Marcos","Santa Rosa","Solola","Suchitepequez","Totonicapan","Zacapa"];
        var gu_region=["Agana Heights","Agat","Asan-Maina","Barrigada","Chalan Pago-Ordot","Dededo","Hagatna","Inarajan","Mangilao","Merizo","Mongmong-Toto-Maite","Piti","Santa Rita","Sinajana","Talofofo","Tamuning-Tumon-Harmon","Umatac","Yigo","Yona"];
        var gw_region=["Bafata","Biombo","Bissau","Bolama","Cacheu","Gabu","Oio","Quinara","Tombali"];
        var gy_region=["Barima-Waini","Cuyuni-Mazaruni","Demerara-Mahaica","East Berbice-Corentyne","Essequibo Islands-West Demerara","Mahaica-Berbice","Pomeroon-Supenaam","Potaro-Siparuni","Upper Demerara-Berbice","Upper Takutu-Upper Essequibo"];
        var hk_region=["Hong Kong"];
        var hn_region=["Atlantida","Choluteca","Colon","Comayagua","Copan","Cortes","El Paraiso","Francisco Morazan","Gracias a Dios","Intibuca","Islas de la Bahia","La Paz","Lempira","Ocotepeque","Olancho","Santa Barbara","Valle","Yoro"];
        var hr_region=["Bjelovarsko-bilogorska zupanija","Brodsko-posavska zupanija","Dubrovacko-neretvanska zupanija","Grad Zagreb","Istarska zupanija","Karlovacka zupanija","Koprivnicko-krizevacka zupanija","Krapinsko-zagorska zupanija","Licko-senjska zupanija","Medimurska zupanija","Osjecko-baranjska zupanija","Pozesko-slavonska zupanija","Primorsko-goranska zupanija","Sibensko-kninska zupanija","Sisacko-moslavacka zupanija","Splitsko-dalmatinska zupanija","Varazdinska zupanija","Viroviticko-podravska zupanija","Vukovarsko-srijemska zupanija","Zadarska zupanija","Zagrebacka zupanija"];
        var ht_region=["Artibonite","Centre","Grande'Anse","Nippes","Nord","Nord-Est","Nord-Ouest","Ouest","Sud","Sud-Est"];
        var hu_region=["Bacs-Kiskun","Baranya","Bekes","Borsod-Abauj-Zemplen","Budapest","Csongrad","Fejer","Gyor-Moson-Sopron","Hajdu-Bihar","Heves","Jasz-Nagykun-Szolnok","Komarom-Esztergom","Nograd","Pest","Somogy","Szabolcs-Szatmar-Bereg","Tolna","Vas","Veszprem","Zala"];
        var id_region=["Aceh","Bali","Banten","Bengkulu","Gorontalo","Jakarta Raya","Jambi","Jawa Barat","Jawa Tengah","Jawa Timur","Kalimantan Barat","Kalimantan Selatan","Kalimantan Tengah","Kalimantan Timur","Kalimantan Utara","Kepulauan Bangka Belitung","Kepulauan Riau","Lampung","Maluku","Maluku Utara","Nusa Tenggara Barat","Nusa Tenggara Timur","Papua","Papua Barat","Riau","Sulawesi Barat","Sulawesi Selatan","Sulawesi Tengah","Sulawesi Tenggara","Sulawesi Utara","Sumatera Barat","Sumatera Selatan","Sumatera Utara","Yogyakarta"];
        var ie_region=["Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry","Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary","Waterford","Westmeath","Wexford","Wicklow"];
        var il_region=["HaDarom","HaMerkaz","HaTsafon","Hefa","Tel Aviv","Yerushalayim"];
        var im_region=["Isle of Man"];
        var in1_region=["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
        var io_region=["British Indian Ocean Territory"];
        var iq_region=["Al Anbar","Al Basrah","Al Muthanna","Al Qadisiyah","An Najaf","Arbil","As Sulaymaniyah","Babil","Baghdad","Dahuk","Dhi Qar","Diyala","Karbala'","Kirkuk","Maysan","Ninawa","Salah ad Din","Wasit"];
        var ir_region=["Alborz","Ardabil","Azarbayjan-e Gharbi","Azarbayjan-e Sharqi","Bushehr","Chahar Mahal va Bakhtiari","Esfahan","Fars","Gilan","Golestan","Hamadan","Hormozgan","Ilam","Kerman","Kermanshah","Khorasan-e Jonubi","Khorasan-e Razavi","Khorasan-e Shomali","Khuzestan","Kohgiluyeh va Bowyer Ahmad","Kordestan","Lorestan","Markazi","Mazandaran","Qazvin","Qom","Semnan","Sistan va Baluchestan","Tehran","Yazd","Zanjan"];
        var is_region=["Austurland","Hofudborgarsvaedi","Nordurland eystra","Nordurland vestra","Sudurland","Sudurnes","Vestfirdir","Vesturland"];
        var it_region=["Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli-Venezia Giulia","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte","Puglia","Sardegna","Sicilia","Toscana","Trentino-Alto Adige","Umbria","Valle d'Aosta","Veneto"];
        var je_region=["Jersey"];
        var jm_region=["Clarendon","Hanover","Kingston","Manchester","Portland","Saint Andrew","Saint Ann","Saint Catherine","Saint Elizabeth","Saint James","Saint Mary","Saint Thomas","Trelawny","Westmoreland"];
        var jo_region=["\'Ajlun","Al 'Aqabah","Al 'Asimah","Al Balqa'","Al Karak","Al Mafraq","At Tafilah","Az Zarqa'","Irbid","Jarash","Ma'an","Madaba"];
        var jp_region=["Aichi","Akita","Aomori","Chiba","Ehime","Fukui","Fukuoka","Fukushima","Gifu","Gunma","Hiroshima","Hokkaido","Hyogo","Ibaraki","Ishikawa","Iwate","Kagawa","Kagoshima","Kanagawa","Kochi","Kumamoto","Kyoto","Mie","Miyagi","Miyazaki","Nagano","Nagasaki","Nara","Niigata","Oita","Okayama","Okinawa","Osaka","Saga","Saitama","Shiga","Shimane","Shizuoka","Tochigi","Tokushima","Tokyo","Tottori","Toyama","Wakayama","Yamagata","Yamaguchi","Yamanashi"];
        var ke_region=["Baringo","Bomet","Bungoma","Busia","Elgeyo/Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi City","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita/Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
        var kg_region=["Batken","Bishkek","Chuy","Jalal-Abad","Naryn","Osh","Talas","Ysyk-Kol"];
        var kh_region=["Baat Dambang","Banteay Mean Chey","Kampong Chaam","Kampong Chhnang","Kampong Spueu","Kampong Thum","Kampot","Kandaal","Kaoh Kong","Kracheh","Krong Kaeb","Krong Pailin","Krong Preah Sihanouk","Mondol Kiri","Otdar Mean Chey","Phnom Penh","Pousaat","Preah Vihear","Prey Veaeng","Rotanak Kiri","Siem Reab","Stueng Traeng","Svaay Rieng","Taakaev"];
        var ki_region=["Gilbert Islands","Line Islands"];
        var km_region=["Anjouan","Grande Comore","Moheli"];
        var kn_region=["Christ Church Nichola Town","Saint Anne Sandy Point","Saint George Basseterre","Saint George Gingerland","Saint James Windward","Saint John Capisterre","Saint John Figtree","Saint Mary Cayon","Saint Paul Capisterre","Saint Paul Charlestown","Saint Peter Basseterre","Saint Thomas Lowland","Saint Thomas Middle Island","Trinity Palmetto Point"];
        var kp_region=["Chagang-do","Hamgyong-bukto","Hamgyong-namdo","Hwanghae-bukto","Hwanghae-namdo","Kangwon-do","P'yongan-bukto","P'yongan-namdo","P'yongyang","Rason","Ryanggang-do"];
        var kr_region=["Busan-gwangyeoksi","Chungcheongbuk-do","Chungcheongnam-do","Daegu-gwangyeoksi","Daejeon-gwangyeoksi","Gangwon-do","Gwangju-gwangyeoksi","Gyeonggi-do","Gyeongsangbuk-do","Gyeongsangnam-do","Incheon-gwangyeoksi","Jeju-teukbyeoljachido","Jeollabuk-do","Jeollanam-do","Seoul-teukbyeolsi","Ulsan-gwangyeoksi"];
        var kw_region=["Al 'Asimah","Al Ahmadi","Al Farwaniyah","Al Jahra'","Hawalli","Mubarak al Kabir"];
        var ky_region=["Cayman Islands"];
        var kz_region=["Almaty","Almaty oblysy","Aqmola oblysy","Aqtobe oblysy","Astana","Atyrau oblysy","Batys Qazaqstan oblysy","Bayqongyr","Mangghystau oblysy","Ongtustik Qazaqstan oblysy","Pavlodar oblysy","Qaraghandy oblysy","Qostanay oblysy","Qyzylorda oblysy","Shyghys Qazaqstan oblysy","Soltustik Qazaqstan oblysy","Zhambyl oblysy"];
        var la_region=["Attapu","Bokeo","Bolikhamxai","Champasak","Houaphan","Khammouan","Louang Namtha","Louangphabang","Oudomxai","Phongsali","Salavan","Savannakhet","Viangchan","Xaignabouli","Xekong","Xiangkhouang"];
        var lb_region=["Aakkar","Baalbek-Hermel","Beqaa","Beyrouth","Liban-Nord","Liban-Sud","Mont-Liban","Nabatiye"];
        var lc_region=["Anse la Raye","Castries","Choiseul","Dennery","Gros Islet","Laborie","Micoud","Soufriere","Vieux Fort"];
        var li_region=["Balzers","Eschen","Gamprin","Mauren","Planken","Ruggell","Schaan","Schellenberg","Triesen","Triesenberg","Vaduz"];
        var lk_region=["Central Province","Eastern Province","North Central Province","North Western Province","Northern Province","Sabaragamuwa Province","Southern Province","Uva Province","Western Province"];
        var lr_region=["Bomi","Bong","Gbarpolu","Grand Bassa","Grand Cape Mount","Grand Gedeh","Grand Kru","Lofa","Margibi","Maryland","Montserrado","Nimba","River Cess","River Gee","Sinoe"];
        var ls_region=["Berea","Butha-Buthe","Leribe","Mafeteng","Maseru","Mohale's Hoek","Mokhotlong","Qacha's Nek","Quthing","Thaba-Tseka"];
        var lt_region=["Alytaus apskritis","Kauno apskritis","Klaipedos apskritis","Marijampoles apskritis","Panevezio apskritis","Siauliu apskritis","Taurages apskritis","Telsiu apskritis","Utenos apskritis","Vilniaus apskritis"];
        var lu_region=["Diekirch","Grevenmacher","Luxembourg"];
        var lv_region=["Adazu novads","Aglonas novads","Aizkraukles novads","Aizputes novads","Alojas novads","Aluksnes novads","Babites novads","Baldones novads","Baltinavas novads","Balvu novads","Bauskas novads","Beverinas novads","Brocenu novads","Carnikavas novads","Cesu novads","Cesvaines novads","Ciblas novads","Daugavpils novads","Dobeles novads","Dundagas novads","Erglu novads","Gulbenes novads","Iecavas novads","Ikskiles novads","Incukalna novads","Jaunjelgavas novads","Jaunpiebalgas novads","Jaunpils novads","Jekabpils novads","Jelgava","Jelgavas novads","Jurmala","Kekavas novads","Kokneses novads","Kraslavas novads","Kuldigas novads","Lielvardes novads","Liepaja","Limbazu novads","Livanu novads","Lubanas novads","Ludzas novads","Madonas novads","Malpils novads","Nauksenu novads","Ogres novads","Olaines novads","Ozolnieku novads","Preilu novads","Rezeknes novads","Riebinu novads","Riga","Rojas novads","Ropazu novads","Rugaju novads","Rundales novads","Salacgrivas novads","Salaspils novads","Saldus novads","Saulkrastu novads","Sejas novads","Siguldas novads","Skrundas novads","Stopinu novads","Strencu novads","Talsu novads","Tukuma novads","Vainodes novads","Valkas novads","Valmiera","Varkavas novads","Vecumnieku novads","Ventspils novads"];
        var ly_region=["Al Butnan","Al Jabal al Akhdar","Al Jabal al Gharbi","Al Jafarah","Al Jufrah","Al Kufrah","Al Marj","Al Marqab","Al Wahat","An Nuqat al Khams","Az Zawiyah","Banghazi","Darnah","Ghat","Misratah","Murzuq","Nalut","Sabha","Surt","Tarabulus","Wadi al Hayat","Wadi ash Shati'"];
        var ma_region=["Beni-Mellal-Khenifra","Casablanca-Settat","Draa-Tafilalet","Fes- Meknes","Guelmim-Oued Noun (EH-partial)","L'Oriental","Laayoune-Sakia El Hamra (EH-partial)","Marrakech-Safi","Rabat-Sale-Kenitra","Souss-Massa","Tanger-Tetouan-Al Hoceima"];
        var mc_region=["Fontvieille","La Condamine","Monaco-Ville","Moneghetti","Monte-Carlo","Saint-Roman"];
        var md_region=["Anenii Noi","Balti","Basarabeasca","Bender","Briceni","Cahul","Calarasi","Cantemir","Causeni","Chisinau","Cimislia","Criuleni","Donduseni","Drochia","Dubasari","Edinet","Falesti","Floresti","Gagauzia, Unitatea teritoriala autonoma","Glodeni","Hincesti","Ialoveni","Leova","Nisporeni","Ocnita","Orhei","Rezina","Riscani","Singerei","Soldanesti","Soroca","Stefan Voda","Stinga Nistrului, unitatea teritoriala din","Straseni","Taraclia","Telenesti","Ungheni"];
        var me_region=["Andrijevica","Bar","Berane","Bijelo Polje","Budva","Cetinje","Danilovgrad","Herceg-Novi","Kolasin","Kotor","Mojkovac","Niksic","Plav","Pljevlja","Pluzine","Podgorica","Rozaje","Savnik","Tivat","Ulcinj","Zabljak"];
        var mf_region=["Saint Martin (French Part)"];
        var mg_region=["Antananarivo","Antsiranana","Fianarantsoa","Mahajanga","Toamasina","Toliara"];
        var mh_region=["Ailinglaplap","Ailuk","Arno","Aur","Bikini & Kili","Ebon","Enewetak & Ujelang","Jabat","Jaluit","Kwajalein","Lae","Lib","Likiep","Majuro","Maloelap","Mejit","Mili","Namdrik","Namu","Rongelap","Ujae","Utrik","Wotho","Wotje"];
        var mk_region=["Aracinovo","Berovo","Bitola","Bogdanci","Bogovinje","Bosilovo","Brvenica","Caska","Centar Zupa","Cesinovo-Oblesevo","Cucer Sandevo","Debar","Debarca","Delcevo","Demir Hisar","Demir Kapija","Dojran","Dolneni","Gevgelija","Gostivar","Gradsko","Ilinden","Jegunovce","Karbinci","Kavadarci","Kicevo","Kocani","Konce","Kratovo","Kriva Palanka","Krivogastani","Krusevo","Kumanovo","Lipkovo","Lozovo","Makedonska Kamenica","Makedonski Brod","Mavrovo i Rostusa","Mogila","Negotino","Novaci","Novo Selo","Ohrid","Pehcevo","Petrovec","Plasnica","Prilep","Probistip","Radovis","Rankovce","Resen","Rosoman","Skopje","Sopiste","Staro Nagoricane","Stip","Struga","Strumica","Studenicani","Sveti Nikole","Tearce","Tetovo","Valandovo","Vasilevo","Veles","Vevcani","Vinica","Vrapciste","Zelenikovo","Zelino","Zrnovci"];
        var ml_region=["Bamako","Gao","Kayes","Kidal","Koulikoro","Mopti","Segou","Sikasso","Tombouctou"];
        var mm_region=["Ayeyarwady","Bago","Chin","Kachin","Kayah","Kayin","Magway","Mandalay","Mon","Nay Pyi Taw","Rakhine","Sagaing","Shan","Tanintharyi","Yangon"];
        var mn_region=["Arhangay","Bayan-Olgiy","Bayanhongor","Bulgan","Darhan uul","Dornod","Dornogovi","Dundgovi","Dzavhan","Govi-Altay","Govi-Sumber","Hentiy","Hovd","Hovsgol","Omnogovi","Orhon","Ovorhangay","Selenge","Suhbaatar","Tov","Ulaanbaatar","Uvs"];
        var mo_region=["Macao"];
        var mp_region=["Northern Mariana Islands"];
        var mq_region=["Martinique"];
        var mr_region=["Adrar","Assaba","Brakna","Dakhlet Nouadhibou","Gorgol","Guidimaka","Hodh ech Chargui","Hodh el Gharbi","Inchiri","Nouakchott Nord","Tagant","Tiris Zemmour","Trarza"];
        var ms_region=["Saint Anthony","Saint Peter"];
        var mt_region=["Attard","Balzan","Birgu","Birkirkara","Birzebbuga","Bormla","Dingli","Fgura","Floriana","Fontana","Ghajnsielem","Gharb","Gharghur","Ghasri","Ghaxaq","Gudja","Gzira","Hamrun","Iklin","Isla","Kalkara","Kercem","Kirkop","Lija","Luqa","Marsa","Marsaskala","Marsaxlokk","Mdina","Mellieha","Mgarr","Mosta","Mqabba","Msida","Mtarfa","Munxar","Nadur","Naxxar","Paola","Pembroke","Pieta","Qala","Qormi","Qrendi","Rabat Gozo","Rabat Malta","Safi","Saint John","Saint Julian's","Saint Lucia's","Saint Paul's Bay","Sannat","Santa Venera","Siggiewi","Sliema","Swieqi","Ta' Xbiex","Tarxien","Valletta","Xaghra","Xewkija","Xghajra","Zabbar","Zebbug Gozo","Zejtun","Zurrieq"];
        var mu_region=["Agalega Islands","Black River","Flacq","Grand Port","Moka","Pamplemousses","Plaines Wilhems","Port Louis","Riviere du Rempart","Rodrigues Islands","Savanne"];
        var mv_region=["Alifu Alifu","Baa","Dhaalu","Gaafu Dhaalu","Gnaviyani","Haa Alifu","Haa Dhaalu","Kaafu","Laamu","Maale","Meemu","Noonu","Raa","Seenu","Shaviyani","Thaa","Vaavu"];
        var mw_region=["Balaka","Blantyre","Chikwawa","Chiradzulu","Chitipa","Dedza","Dowa","Karonga","Kasungu","Likoma","Lilongwe","Machinga","Mangochi","Mchinji","Mulanje","Mwanza","Mzimba","Neno","Nkhata Bay","Nkhotakota","Nsanje","Ntcheu","Ntchisi","Phalombe","Rumphi","Salima","Thyolo","Zomba"];
        var mx_region=["Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Ciudad de Mexico","Coahuila de Zaragoza","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","Mexico","Michoacan de Ocampo","Morelos","Nayarit","Nuevo Leon","Oaxaca","Puebla","Queretaro","Quintana Roo","San Luis Potosi","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz de Ignacio de la Llave","Yucatan","Zacatecas"];
        var my_region=["Johor","Kedah","Kelantan","Melaka","Negeri Sembilan","Pahang","Perak","Perlis","Pulau Pinang","Sabah","Sarawak","Selangor","Terengganu","Wilayah Persekutuan Kuala Lumpur","Wilayah Persekutuan Labuan","Wilayah Persekutuan Putrajaya"];
        var mz_region=["Cabo Delgado","Gaza","Inhambane","Manica","Maputo","Nampula","Niassa","Sofala","Tete","Zambezia"];
        var na_region=["Erongo","Hardap","Karas","Kavango East","Khomas","Kunene","Ohangwena","Omaheke","Omusati","Oshana","Oshikoto","Otjozondjupa","Zambezi"];
        var nc_region=["Province des iles Loyaute","Province Nord","Province Sud"];
        var ne_region=["Agadez","Diffa","Dosso","Maradi","Niamey","Tahoua","Tillaberi","Zinder"];
        var nf_region=["Norfolk Island"];
        var ng_region=["Abia","Abuja Federal Capital Territory","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
        var ni_region=["Boaco","Carazo","Chinandega","Chontales","Costa Caribe Norte","Costa Caribe Sur","Esteli","Granada","Jinotega","Leon","Madriz","Managua","Masaya","Matagalpa","Nueva Segovia","Rio San Juan","Rivas"];
        var nl_region=["Drenthe","Flevoland","Fryslan","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Utrecht","Zeeland","Zuid-Holland"];
        var no_region=["Akershus","Aust-Agder","Buskerud","Finnmark","Hedmark","Hordaland","More og Romsdal","Nord-Trondelag","Nordland","Oppland","Oslo","Ostfold","Rogaland","Sogn og Fjordane","Sor-Trondelag","Telemark","Troms","Vest-Agder","Vestfold"];
        var np_region=["Bagmati","Bheri","Dhawalagiri","Gandaki","Janakpur","Karnali","Kosi","Lumbini","Mahakali","Mechi","Narayani","Rapti","Sagarmatha","Seti"];
        var nr_region=["Aiwo","Anabar","Anetan","Anibare","Baitsi","Buada","Ewa","Ijuw","Uaboe","Yaren"];
        var nu_region=["Niue"];
        var nz_region=["Auckland","Bay of Plenty","Canterbury","Chatham Islands Territory","Gisborne","Hawke's Bay","Manawatu-Wanganui","Marlborough","Nelson","Northland","Otago","Southland","Taranaki","Tasman","Waikato","Wellington","West Coast"];
        var om_region=["Ad Dakhiliyah","Al Buraymi","Al Wusta","Az Zahirah","Janub al Batinah","Janub ash Sharqiyah","Masqat","Musandam","Shamal al Batinah","Shamal ash Sharqiyah","Zufar"];
        var pa_region=["Bocas del Toro","Chiriqui","Cocle","Colon","Darien","Embera","Guna Yala","Herrera","Los Santos","Ngobe-Bugle","Panama","Veraguas"];
        var pe_region=["Amazonas","Ancash","Apurimac","Arequipa","Ayacucho","Cajamarca","Cusco","El Callao","Huancavelica","Huanuco","Ica","Junin","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martin","Tacna","Tumbes","Ucayali"];
        var pf_region=["Iles Australes","Iles du Vent","Iles Marquises","Iles Sous-le-Vent","Iles Tuamotu-Gambier"];
        var pg_region=["Bougainville","Central","Chimbu","East New Britain","East Sepik","Eastern Highlands","Enga","Gulf","Madang","Manus","Milne Bay","Morobe","National Capital District (Port Moresby)","New Ireland","Northern","Southern Highlands","West New Britain","West Sepik","Western","Western Highlands"];
        var ph_region=["Abra","Agusan del Norte","Agusan del Sur","Aklan","Albay","Antique","Apayao","Aurora","Basilan","Bataan","Batanes","Batangas","Benguet","Biliran","Bohol","Bukidnon","Bulacan","Cagayan","Camarines Norte","Camarines Sur","Camiguin","Capiz","Catanduanes","Cavite","Cebu","Compostela Valley","Cotabato","Davao del Norte","Davao del Sur","Davao Oriental","Dinagat Islands","Eastern Samar","Guimaras","Ifugao","Ilocos Norte","Ilocos Sur","Iloilo","Isabela","Kalinga","La Union","Laguna","Lanao del Norte","Lanao del Sur","Leyte","Maguindanao","Marinduque","Masbate","Mindoro Occidental","Mindoro Oriental","Misamis Occidental","Misamis Oriental","Mountain Province","National Capital Region","Negros Occidental","Negros Oriental","Northern Samar","Nueva Ecija","Nueva Vizcaya","Palawan","Pampanga","Pangasinan","Quezon","Quirino","Rizal","Romblon","Samar","Sarangani","Siquijor","Sorsogon","South Cotabato","Southern Leyte","Sultan Kudarat","Sulu","Surigao del Norte","Surigao del Sur","Tarlac","Tawi-Tawi","Zambales","Zamboanga del Norte","Zamboanga del Sur","Zamboanga Sibugay"];
        var pk_region=["Azad Jammu and Kashmir","Balochistan","Federally Administered Tribal Areas","Gilgit-Baltistan","Islamabad","Khyber Pakhtunkhwa","Punjab","Sindh"];
        var pl_region=["Dolnoslaskie","Kujawsko-pomorskie","Lodzkie","Lubelskie","Lubuskie","Malopolskie","Mazowieckie","Opolskie","Podkarpackie","Podlaskie","Pomorskie","Slaskie","Swietokrzyskie","Warminsko-mazurskie","Wielkopolskie","Zachodniopomorskie"];
        var pm_region=["Saint Pierre and Miquelon"];
        var pn_region=["Pitcairn"];
        var pr_region=["Adjuntas","Aguada","Aguadilla","Aguas Buenas","Aibonito","Anasco","Arecibo","Arroyo","Barceloneta","Barranquitas","Bayamon","Cabo Rojo","Caguas","Camuy","Canovanas","Carolina","Catano","Cayey","Ceiba","Ciales","Cidra","Coamo","Comerio","Corozal","Culebra","Dorado","Fajardo","Florida","Guanica","Guayama","Guayanilla","Guaynabo","Gurabo","Hatillo","Hormigueros","Humacao","Isabela","Juana Diaz","Lajas","Lares","Las Marias","Las Piedras","Loiza","Luquillo","Manati","Maricao","Maunabo","Mayaguez","Moca","Morovis","Municipio de Jayuya","Municipio de Juncos","Naguabo","Naranjito","Patillas","Penuelas","Ponce","Quebradillas","Rincon","Rio Grande","Sabana Grande","Salinas","San German","San Juan","San Lorenzo","San Sebastian","Santa Isabel Municipio","Toa Alta","Toa Baja","Trujillo Alto","Utuado","Vega Alta","Vega Baja","Vieques","Villalba","Yabucoa","Yauco"];
        var ps_region=["Bethlehem","Gaza","Hebron","Jenin","Jericho and Al Aghwar","Jerusalem","Nablus","Qalqilya","Ramallah","Salfit","Tubas","Tulkarm"];
        var pt_region=["Aveiro","Beja","Braga","Braganca","Castelo Branco","Coimbra","Evora","Faro","Guarda","Leiria","Lisboa","Portalegre","Porto","Regiao Autonoma da Madeira","Regiao Autonoma dos Acores","Santarem","Setubal","Viana do Castelo","Vila Real","Viseu"];
        var pw_region=["Aimeliik","Airai","Angaur","Hatohobei","Kayangel","Koror","Melekeok","Ngaraard","Ngarchelong","Ngardmau","Ngatpang","Ngchesar","Ngeremlengui","Ngiwal","Peleliu","Sonsorol"];
        var py_region=["Alto Paraguay","Alto Parana","Amambay","Asuncion","Boqueron","Caaguazu","Caazapa","Canindeyu","Central","Concepcion","Cordillera","Guaira","Itapua","Misiones","Neembucu","Paraguari","Presidente Hayes","San Pedro"];
        var qa_region=["Ad Dawhah","Al Khawr wa adh Dhakhirah","Al Wakrah","Ar Rayyan","Ash Shamal","Az Za'ayin","Umm Salal"];
        var re_region=["Reunion"];
        var ro_region=["Alba","Arad","Arges","Bacau","Bihor","Bistrita-Nasaud","Botosani","Braila","Brasov","Bucuresti","Buzau","Calarasi","Caras-Severin","Cluj","Constanta","Covasna","Dambovita","Dolj","Galati","Giurgiu","Gorj","Harghita","Hunedoara","Ialomita","Iasi","Ilfov","Maramures","Mehedinti","Mures","Neamt","Olt","Prahova","Salaj","Satu Mare","Sibiu","Suceava","Teleorman","Timis","Tulcea","Valcea","Vaslui","Vrancea"];
        var rs_region=["Beograd","Borski okrug","Branicevski okrug","Jablanicki okrug","Juznobacki okrug","Juznobanatski okrug","Kolubarski okrug","Kosovsko-Mitrovacki okrug","Macvanski okrug","Moravicki okrug","Nisavski okrug","Pcinjski okrug","Pecki okrug","Pirotski okrug","Podunavski okrug","Pomoravski okrug","Prizrenski okrug","Rasinski okrug","Raski okrug","Severnobacki okrug","Severnobanatski okrug","Srednjebanatski okrug","Sremski okrug","Sumadijski okrug","Toplicki okrug","Zajecarski okrug","Zapadnobacki okrug","Zlatiborski okrug"];
        var ru_region=["Adygeya, Respublika","Altay, Respublika","Altayskiy kray","Amurskaya oblast'","Arkhangel'skaya oblast'","Astrakhanskaya oblast'","Bashkortostan, Respublika","Belgorodskaya oblast'","Bryanskaya oblast'","Buryatiya, Respublika","Chechenskaya Respublika","Chelyabinskaya oblast'","Chukotskiy avtonomnyy okrug","Chuvashskaya Respublika","Dagestan, Respublika","Ingushetiya, Respublika","Irkutskaya oblast'","Ivanovskaya oblast'","Kabardino-Balkarskaya Respublika","Kaliningradskaya oblast'","Kalmykiya, Respublika","Kaluzhskaya oblast'","Kamchatskiy kray","Karachayevo-Cherkesskaya Respublika","Kareliya, Respublika","Kemerovskaya oblast'","Khabarovskiy kray","Khakasiya, Respublika","Khanty-Mansiyskiy avtonomnyy okrug","Kirovskaya oblast'","Komi, Respublika","Kostromskaya oblast'","Krasnodarskiy kray","Krasnoyarskiy kray","Kurganskaya oblast'","Kurskaya oblast'","Leningradskaya oblast'","Lipetskaya oblast'","Magadanskaya oblast'","Mariy El, Respublika","Mordoviya, Respublika","Moskovskaya oblast'","Moskva","Murmanskaya oblast'","Nenetskiy avtonomnyy okrug","Nizhegorodskaya oblast'","Novgorodskaya oblast'","Novosibirskaya oblast'","Omskaya oblast'","Orenburgskaya oblast'","Orlovskaya oblast'","Penzenskaya oblast'","Permskiy kray","Primorskiy kray","Pskovskaya oblast'","Rostovskaya oblast'","Ryazanskaya oblast'","Saha, Respublika","Sakhalinskaya oblast'","Samarskaya oblast'","Sankt-Peterburg","Saratovskaya oblast'","Severnaya Osetiya, Respublika","Smolenskaya oblast'","Stavropol'skiy kray","Sverdlovskaya oblast'","Tambovskaya oblast'","Tatarstan, Respublika","Tomskaya oblast'","Tul'skaya oblast'","Tverskaya oblast'","Tyumenskaya oblast'","Tyva, Respublika","Udmurtskaya Respublika","Ul'yanovskaya oblast'","Vladimirskaya oblast'","Volgogradskaya oblast'","Vologodskaya oblast'","Voronezhskaya oblast'","Yamalo-Nenetskiy avtonomnyy okrug","Yaroslavskaya oblast'","Yevreyskaya avtonomnaya oblast'","Zabaykal'skiy kray"];
        var rw_region=["Est","Nord","Ouest","Sud","Ville de Kigali"];
        var sa_region=["\'Asir","Al Bahah","Al Hudud ash Shamaliyah","Al Jawf","Al Madinah al Munawwarah","Al Qasim","Ar Riyad","Ash Sharqiyah","Ha'il","Jazan","Makkah al Mukarramah","Najran","Tabuk"];
        var sb_region=["Central","Choiseul","Guadalcanal","Isabel","Makira-Ulawa","Malaita","Rennell and Bellona","Temotu","Western"];
        var sc_region=["Anse aux Pins","Anse Boileau","Anse Royale","Baie Lazare","Beau Vallon","Bel Ombre","Cascade","English River","Grand Anse Mahe","La Digue","Pointe Larue","Port Glaud","Takamaka"];
        var sd_region=["Blue Nile","Gedaref","Gezira","Kassala","Khartoum","North Darfur","North Kordofan","Northern","Red Sea","River Nile","Sennar","South Darfur","South Kordofan","West Darfur","White Nile"];
        var se_region=["Blekinge lan","Dalarnas lan","Gavleborgs lan","Gotlands lan","Hallands lan","Jamtlands lan","Jonkopings lan","Kalmar lan","Kronobergs lan","Norrbottens lan","Orebro lan","Ostergotlands lan","Skane lan","Sodermanlands lan","Stockholms lan","Uppsala lan","Varmlands lan","Vasterbottens lan","Vasternorrlands lan","Vastmanlands lan","Vastra Gotalands lan"];
        var sg_region=["Singapore"];
        var sh_region=["Ascension","Saint Helena","Tristan da Cunha"];
        var si_region=["Ajdovscina","Apace","Beltinci","Benedikt","Bistrica ob Sotli","Bled","Bloke","Bohinj","Borovnica","Bovec","Braslovce","Brda","Brezice","Brezovica","Cankova","Celje","Cerklje na Gorenjskem","Cerknica","Cerkno","Cirkulane","Crensovci","Crnomelj","Destrnik","Divaca","Dobje","Dobrepolje","Dobrna","Dobrova-Polhov Gradec","Dobrovnik","Domzale","Dornava","Dravograd","Duplek","Gorje","Gornja Radgona","Gornji Petrovci","Grad","Grosuplje","Hajdina","Hoce-Slivnica","Hodos","Horjul","Hrastnik","Hrpelje-Kozina","Idrija","Ig","Ilirska Bistrica","Ivancna Gorica","Izola","Jesenice","Jursinci","Kamnik","Kanal","Kidricevo","Kobarid","Kobilje","Kocevje","Komen","Komenda","Koper","Kosanjevica na Krki","Kostel","Kranj","Kranjska Gora","Krizevci","Krsko","Kungota","Kuzma","Lasko","Lenart","Lendava","Litija","Ljubljana","Ljutomer","Log-Dragomer","Logatec","Loska Dolina","Loski Potok","Lovrenc na Pohorju","Luce","Lukovica","Majsperk","Makole","Maribor","Markovci","Medvode","Menges","Metlika","Mezica","Miklavz na Dravskem Polju","Miren-Kostanjevica","Mirna Pec","Mislinja","Mokronog-Trebelno","Moravce","Mozirje","Murska Sobota","Muta","Naklo","Nazarje","Nova Gorica","Novo Mesto","Odranci","Oplotnica","Ormoz","Piran","Pivka","Podcetrtek","Podlehnik","Poljcane","Polzela","Postojna","Prebold","Preddvor","Prevalje","Ptuj","Puconci","Race-Fram","Radece","Radenci","Radlje ob Dravi","Radovljica","Ravne na Koroskem","Razkrizje","Recica ob Savinji","Rence-Vogrsko","Ribnica","Rogaska Slatina","Rogasovci","Ruse","Salovci","Semic","Sempeter-Vrtojba","Sencur","Sentilj","Sentjernej","Sentjur","Sentrupert","Sevnica","Sezana","Skocjan","Skofja Loka","Skofljica","Slovenj Gradec","Slovenska Bistrica","Slovenske Konjice","Smarje pri Jelsah","Smarjeske Toplice","Smartno ob Paki","Smartno pri Litiji","Sodrazica","Solcava","Sostanj","Starse","Store","Straza","Sveta Trojica v Slovenskih Goricah","Sveti Andraz v Slovenskih Goricah","Sveti Jurij","Sveti Jurij v Slovenskih Goricah","Sveti Tomaz","Tabor","Tisina","Tolmin","Trbovlje","Trebnje","Trnovska Vas","Trzic","Trzin","Turnisce","Velenje","Velika Polana","Velike Lasce","Verzej","Videm","Vipava","Vitanje","Vodice","Vojnik","Vransko","Vrhnika","Vuzenica","Zagorje ob Savi","Zalec","Zavrc","Zelezniki","Zetale","Ziri","Zrece","Zuzemberk"];
        var sj_region=["Svalbard and Jan Mayen"];
        var sk_region=["Banskobystricky kraj","Bratislavsky kraj","Kosicky kraj","Nitriansky kraj","Presovsky kraj","Trenciansky kraj","Trnavsky kraj","Zilinsky kraj"];
        var sl_region=["Eastern","Northern","Southern","Western Area"];
        var sm_region=["Acquaviva","Borgo Maggiore","Chiesanuova","Domagnano","Faetano","Fiorentino","Montegiardino","San Marino","Serravalle"];
        var sn_region=["Dakar","Diourbel","Fatick","Kaffrine","Kaolack","Kedougou","Kolda","Louga","Matam","Saint-Louis","Sedhiou","Tambacounda","Thies","Ziguinchor"];
        var so_region=["Awdal","Bakool","Banaadir","Bari","Bay","Galguduud","Gedo","Hiiraan","Jubbada Dhexe","Jubbada Hoose","Mudug","Nugaal","Sanaag","Shabeellaha Dhexe","Shabeellaha Hoose","Sool","Togdheer","Woqooyi Galbeed"];
        var sr_region=["Brokopondo","Commewijne","Coronie","Marowijne","Nickerie","Para","Paramaribo","Saramacca","Sipaliwini","Wanica"];
        var ss_region=["Central Equatoria","Eastern Equatoria","Jonglei","Lakes","Northern Bahr el Ghazal","Unity","Upper Nile","Warrap","Western Bahr el Ghazal","Western Equatoria"];
        var st_region=["Principe","Sao Tome"];
        var sv_region=["Ahuachapan","Cabanas","Chalatenango","Cuscatlan","La Libertad","La Paz","La Union","Morazan","San Miguel","San Salvador","San Vicente","Santa Ana","Sonsonate","Usulutan"];
        var sx_region=["Sint Maarten (Dutch Part)"];
        var sy_region=["Al Hasakah","Al Ladhiqiyah","Al Qunaytirah","Ar Raqqah","As Suwayda'","Dar'a","Dayr az Zawr","Dimashq","Halab","Hamah","Hims","Idlib","Rif Dimashq","Tartus"];
        var sz_region=["Hhohho","Lubombo","Manzini","Shiselweni"];
        var tc_region=["Turks and Caicos Islands"];
        var td_region=["Bahr el Gazel","Batha","Borkou","Chari-Baguirmi","Guera","Hadjer Lamis","Kanem","Lac","Logone-Occidental","Logone-Oriental","Mandoul","Mayo-Kebbi-Est","Mayo-Kebbi-Ouest","Moyen-Chari","Ouaddai","Salamat","Sila","Tandjile","Tibesti","Ville de Ndjamena","Wadi Fira"];
        var tf_region=["French Southern Territories"];
        var tg_region=["Centrale","Kara","Maritime","Plateaux","Savanes"];
        var th_region=["Amnat Charoen","Ang Thong","Bueng Kan","Buri Ram","Chachoengsao","Chai Nat","Chaiyaphum","Chanthaburi","Chiang Mai","Chiang Rai","Chon Buri","Chumphon","Kalasin","Kamphaeng Phet","Kanchanaburi","Khon Kaen","Krabi","Krung Thep Maha Nakhon","Lampang","Lamphun","Loei","Lop Buri","Mae Hong Son","Maha Sarakham","Mukdahan","Nakhon Nayok","Nakhon Pathom","Nakhon Phanom","Nakhon Ratchasima","Nakhon Sawan","Nakhon Si Thammarat","Nan","Narathiwat","Nong Bua Lam Phu","Nong Khai","Nonthaburi","Pathum Thani","Pattani","Phangnga","Phatthalung","Phayao","Phetchabun","Phetchaburi","Phichit","Phitsanulok","Phra Nakhon Si Ayutthaya","Phrae","Phuket","Prachin Buri","Prachuap Khiri Khan","Ranong","Ratchaburi","Rayong","Roi Et","Sa Kaeo","Sakon Nakhon","Samut Prakan","Samut Sakhon","Samut Songkhram","Saraburi","Satun","Si Sa Ket","Sing Buri","Songkhla","Sukhothai","Suphan Buri","Surat Thani","Surin","Tak","Trang","Trat","Ubon Ratchathani","Udon Thani","Uthai Thani","Uttaradit","Yala","Yasothon"];
        var tj_region=["Dushanbe","Khatlon","Kuhistoni Badakhshon","Nohiyahoi Tobei Jumhuri","Sughd"];
        var tk_region=["Tokelau"];
        var tl_region=["Aileu","Ainaro","Baucau","Bobonaro","Cova Lima","Dili","Ermera","Lautem","Liquica","Manatuto","Manufahi","Oecussi","Viqueque"];
        var tm_region=["Ahal","Balkan","Dasoguz","Lebap","Mary"];
        var tn_region=["Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","L'Ariana","La Manouba","Le Kef","Mahdia","Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"];
        var to_region=["\'Eua","Ha'apai","Niuas","Tongatapu","Vava'u"];
        var tr_region=["Adana","Adiyaman","Afyonkarahisar","Agri","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydin","Balikesir","Bartin","Batman","Bayburt","Bilecik","Bingol","Bitlis","Bolu","Burdur","Bursa","Canakkale","Cankiri","Corum","Denizli","Diyarbakir","Duzce","Edirne","Elazig","Erzincan","Erzurum","Eskisehir","Gaziantep","Giresun","Gumushane","Hakkari","Hatay","Igdir","Isparta","Istanbul","Izmir","Kahramanmaras","Karabuk","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kirikkale","Kirklareli","Kirsehir","Kocaeli","Konya","Kutahya","Malatya","Manisa","Mardin","Mersin","Mugla","Mus","Nevsehir","Nigde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Sanliurfa","Siirt","Sinop","Sirnak","Sivas","Tekirdag","Tokat","Trabzon","Tunceli","Usak","Van","Yalova","Yozgat","Zonguldak"];
        var tt_region=["Arima","Chaguanas","Couva-Tabaquite-Talparo","Diego Martin","Mayaro-Rio Claro","Penal-Debe","Point Fortin","Port of Spain","Princes Town","San Fernando","San Juan-Laventille","Sangre Grande","Siparia","Tobago","Tunapuna-Piarco"];
        var tv_region=["Funafuti","Nanumaga","Nanumea","Niutao","Nui","Nukufetau","Nukulaelae","Vaitupu"];
        var tw_region=["Changhua","Chiayi","Hsinchu","Hualien","Kaohsiung","Keelung","Kinmen","Lienchiang","Miaoli","Nantou","New Taipei","Penghu","Pingtung","Taichung","Tainan","Taipei","Taitung","Taoyuan","Yilan","Yunlin"];
        var tz_region=["Arusha","Dar es Salaam","Dodoma","Geita","Iringa","Kagera","Kaskazini Pemba","Kaskazini Unguja","Katavi","Kigoma","Kilimanjaro","Kusini Pemba","Kusini Unguja","Lindi","Manyara","Mara","Mbeya","Mjini Magharibi","Morogoro","Mtwara","Mwanza","Njombe","Pwani","Rukwa","Ruvuma","Shinyanga","Simiyu","Singida","Tabora","Tanga"];
        var ua_region=["Avtonomna Respublika Krym","Cherkaska oblast","Chernihivska oblast","Chernivetska oblast","Dnipropetrovska oblast","Donetska oblast","Ivano-Frankivska oblast","Kharkivska oblast","Khersonska oblast","Khmelnytska oblast","Kirovohradska oblast","Kyiv","Kyivska oblast","Luhanska oblast","Lvivska oblast","Mykolaivska oblast","Odeska oblast","Poltavska oblast","Rivnenska oblast","Sevastopol","Sumska oblast","Ternopilska oblast","Vinnytska oblast","Volynska oblast","Zakarpatska oblast","Zaporizka oblast","Zhytomyrska oblast"];
        var ug_region=["Abim","Adjumani","Agago","Alebtong","Amolatar","Amudat","Amuria","Amuru","Apac","Arua","Budaka","Bududa","Bugiri","Buhweju","Buikwe","Bukedea","Bukomansibi","Bukwa","Bulambuli","Buliisa","Bundibugyo","Bushenyi","Busia","Butaleja","Buvuma","Buyende","Dokolo","Gomba","Gulu","Hoima","Ibanda","Iganga","Isingiro","Jinja","Kaabong","Kabale","Kabarole","Kaberamaido","Kalangala","Kaliro","Kalungu","Kampala","Kamuli","Kamwenge","Kanungu","Kapchorwa","Kasese","Katakwi","Kayunga","Kibaale","Kiboga","Kibuku","Kiruhura","Kiryandongo","Kisoro","Kitgum","Koboko","Kole","Kotido","Kumi","Kween","Kyankwanzi","Kyegegwa","Kyenjojo","Lamwo","Lira","Luuka","Luwero","Lwengo","Lyantonde","Manafwa","Maracha","Masaka","Masindi","Mayuge","Mbale","Mbarara","Mitooma","Mityana","Moroto","Moyo","Mpigi","Mubende","Mukono","Nakapiripirit","Nakaseke","Nakasongola","Namayingo","Namutumba","Napak","Nebbi","Ngora","Ntoroko","Ntungamo","Nwoya","Otuke","Oyam","Pader","Pallisa","Rakai","Rubirizi","Rukungiri","Sembabule","Serere","Sheema","Sironko","Soroti","Tororo","Wakiso","Yumbe","Zombo"];
        var um_region=["Baker Island","Howland Island","Jarvis Island","Palmyra Atoll"];
        var us_region=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
        var uy_region=["Artigas","Canelones","Cerro Largo","Colonia","Durazno","Flores","Florida","Lavalleja","Maldonado","Montevideo","Paysandu","Rio Negro","Rivera","Rocha","Salto","San Jose","Soriano","Tacuarembo","Treinta y Tres"];
        var uz_region=["Andijon","Buxoro","Farg'ona","Jizzax","Namangan","Navoiy","Qashqadaryo","Qoraqalpog'iston Respublikasi","Samarqand","Sirdaryo","Surxondaryo","Toshkent","Xorazm"];
        var va_region=["Vatican City"];
        var vc_region=["Charlotte","Grenadines","Saint David","Saint George","Saint Patrick"];
        var ve_region=["Amazonas","Anzoategui","Apure","Aragua","Barinas","Bolivar","Carabobo","Cojedes","Delta Amacuro","Dependencias Federales","Distrito Capital","Falcon","Guarico","Lara","Merida","Miranda","Monagas","Nueva Esparta","Portuguesa","Sucre","Tachira","Trujillo","Vargas","Yaracuy","Zulia"];
        var vg_region=["Virgin Islands, British"];
        var vi_region=["Virgin Islands, U.S."];
        var vn_region=["An Giang","Ba Ria - Vung Tau","Bac Giang","Bac Kan","Bac Lieu","Bac Ninh","Ben Tre","Binh Dinh","Binh Duong","Binh Phuoc","Binh Thuan","Ca Mau","Can Tho","Cao Bang","Da Nang","Dak Lak","Dak Nong","Dien Bien","Dong Nai","Dong Thap","Gia Lai","Ha Giang","Ha Nam","Ha Noi","Ha Tinh","Hai Duong","Hai Phong","Ho Chi Minh","Hoa Binh","Hung Yen","Khanh Hoa","Kien Giang","Kon Tum","Lai Chau","Lam Dong","Lang Son","Lao Cai","Long An","Nam Dinh","Nghe An","Ninh Binh","Ninh Thuan","Phu Tho","Phu Yen","Quang Binh","Quang Nam","Quang Ngai","Quang Ninh","Quang Tri","Soc Trang","Son La","Tay Ninh","Thai Binh","Thai Nguyen","Thanh Hoa","Thua Thien-Hue","Tien Giang","Tra Vinh","Tuyen Quang","Vinh Long","Vinh Phuc","Yen Bai"];
        var vu_region=["Malampa","Penama","Sanma","Shefa","Tafea","Torba"];
        var wf_region=["Alo","Sigave","Uvea"];
        var ws_region=["A'ana","Aiga-i-le-Tai","Atua","Fa'asaleleaga","Gagaifomauga","Palauli","Satupa'itea","Tuamasaga","Va'a-o-Fonoti","Vaisigano"];
        var ye_region=["\'Adan","\'Amran","Abyan","Ad Dali'","Al Bayda'","Al Hudaydah","Al Jawf","Al Mahrah","Al Mahwit","Amanat al 'Asimah","Dhamar","Hadramawt","Hajjah","Ibb","Lahij","Ma'rib","Raymah","Sa'dah","San'a'","Shabwah","Ta'izz"];
        var yt_region=["Acoua","Bandraboua","Bandrele","Boueni","Chiconi","Chirongui","Dzaoudzi","Kani-Keli","Koungou","Mamoudzou","Mtsamboro","Ouangani","Pamandzi","Sada","Tsingoni"];
        var za_region=["Eastern Cape","Free State","Gauteng","Kwazulu-Natal","Limpopo","Mpumalanga","North-West","Northern Cape","Western Cape"];
        var zm_region=["Central","Copperbelt","Eastern","Luapula","Lusaka","North-Western","Northern","Southern","Western"];
        var zw_region=["Bulawayo","Harare","Manicaland","Mashonaland Central","Mashonaland East","Mashonaland West","Masvingo","Matabeleland North","Matabeleland South","Midlands"];

        //get total length of array
        var arr = [ad_region.length,ae_region.length,af_region.length,ag_region.length,ai_region.length,al_region.length,am_region.length,ao_region.length,aq_region.length,ar_region.length,as_region.length,at_region.length,au_region.length,aw_region.length,ax_region.length,az_region.length,ba_region.length,bb_region.length,bd_region.length,be_region.length,bf_region.length,bg_region.length,bh_region.length,bi_region.length,bj_region.length,bl_region.length,bm_region.length,bn_region.length,bo_region.length,bq_region.length,br_region.length,bs_region.length,bt_region.length,bw_region.length,by_region.length,bz_region.length,ca_region.length,cc_region.length,cd_region.length,cf_region.length,cg_region.length,ch_region.length,ci_region.length,ck_region.length,cl_region.length,cm_region.length,cn_region.length,co_region.length,cr_region.length,cu_region.length,cv_region.length,cw_region.length,cx_region.length,cy_region.length,cz_region.length,de_region.length,dj_region.length,dk_region.length,dm_region.length,do1_region.length,dz_region.length,ec_region.length,ee_region.length,eg_region.length,eh_region.length,er_region.length,es_region.length,et_region.length,fi_region.length,fj_region.length,fk_region.length,fm_region.length,fo_region.length,fr_region.length,ga_region.length,gb_region.length,gd_region.length,ge_region.length,gf_region.length,gg_region.length,gh_region.length,gi_region.length,gl_region.length,gm_region.length,gn_region.length,gp_region.length,gq_region.length,gr_region.length,gs_region.length,gt_region.length,gu_region.length,gw_region.length,gy_region.length,hk_region.length,hn_region.length,hr_region.length,ht_region.length,hu_region.length,id_region.length,ie_region.length,il_region.length,im_region.length,in1_region.length,io_region.length,iq_region.length,ir_region.length,is_region.length,it_region.length,je_region.length,jm_region.length,jo_region.length,jp_region.length,ke_region.length,kg_region.length,kh_region.length,ki_region.length,km_region.length,kn_region.length,kp_region.length,kr_region.length,kw_region.length,ky_region.length,kz_region.length,la_region.length,lb_region.length,lc_region.length,li_region.length,lk_region.length,lr_region.length,ls_region.length,lt_region.length,lu_region.length,lv_region.length,ly_region.length,ma_region.length,mc_region.length,md_region.length,me_region.length,mf_region.length,mg_region.length,mh_region.length,mk_region.length,ml_region.length,mm_region.length,mn_region.length,mo_region.length,mp_region.length,mq_region.length,mr_region.length,ms_region.length,mt_region.length,mu_region.length,mv_region.length,mw_region.length,mx_region.length,my_region.length,mz_region.length,na_region.length,nc_region.length,ne_region.length,nf_region.length,ng_region.length,ni_region.length,nl_region.length,no_region.length,np_region.length,nr_region.length,nu_region.length,nz_region.length,om_region.length,pa_region.length,pe_region.length,pf_region.length,pg_region.length,ph_region.length,pk_region.length,pl_region.length,pm_region.length,pn_region.length,pr_region.length,ps_region.length,pt_region.length,pw_region.length,py_region.length,qa_region.length,re_region.length,ro_region.length,rs_region.length,ru_region.length,rw_region.length,sa_region.length,sb_region.length,sc_region.length,sd_region.length,se_region.length,sg_region.length,sh_region.length,si_region.length,sj_region.length,sk_region.length,sl_region.length,sm_region.length,sn_region.length,so_region.length,sr_region.length,ss_region.length,st_region.length,sv_region.length,sx_region.length,sy_region.length,sz_region.length,tc_region.length,td_region.length,tf_region.length,tg_region.length,th_region.length,tj_region.length,tk_region.length,tl_region.length,tm_region.length,tn_region.length,to_region.length,tr_region.length,tt_region.length,tv_region.length,tw_region.length,tz_region.length,ua_region.length,ug_region.length,um_region.length,us_region.length,uy_region.length,uz_region.length,va_region.length,vc_region.length,ve_region.length,vg_region.length,vi_region.length,vn_region.length,vu_region.length,wf_region.length,ws_region.length,ye_region.length,yt_region.length,za_region.length,zm_region.length,zw_region.length];
        var arrlen = Math.max.apply(Math, arr);

        var ad =[];var ae =[];var af=[];var ag=[];var ai=[];var al=[];var am=[];var ao=[];var aq=[];var ar=[];var as=[];var at=[];var au=[];var aw=[];var ax=[];var az=[];
        var ba=[];var bb=[];var bd=[];var be=[];var bf=[];var bg=[];var bh=[];var bi=[];var bj=[];var bl=[]; var bm=[];var bn=[];var bo=[];var bq=[];var br=[];var bs=[];var bt=[];var bw=[];var by=[];var bz=[];
        var ca=[];var cc=[];var cd=[];var cf=[];var cg=[];var ch=[];var ci=[];var ck=[];var cl=[];var cm=[];var cn=[];var co=[];var cr=[];var cu=[];var cv=[];var cw=[];var cx=[];var cy=[];var cz=[];
        var de=[];var dj=[];var dk=[];var dm=[];var do1=[];var dz=[];
        var ec=[];var ee=[];var eg=[];var eh=[];var er=[];var es=[];var et=[];
        var fi=[];var fj=[];var fk=[];var fm=[];var fo=[];var fr=[];
        var ga=[];var gb=[];var gd=[];var ge=[];var gf=[];var gg=[];var gh=[];var gi=[];var gl=[];var gm=[];var gn=[];var gp=[];var gq=[];var gr=[];var gs=[];var gt=[];var gu=[];var gw=[];var gy=[];
        var hk=[];var hn=[];var hr=[];var ht=[];var hu=[];
        var id=[];var ie=[];var il=[];var im=[];var in1=[];var io=[];var iq=[];var ir=[];var is=[];var it=[];
        var je=[];var jm=[];var jo=[];var jp=[];
        var ke=[];var kg=[];var kh=[];var ki=[];var km=[];var kn=[];var kp=[];var kr=[];var kw=[];var ky=[];var kz=[];
        var la=[];var lb=[];var lc=[];var li=[];var lk=[];var lr=[];var ls=[];var lt=[];var lu=[];var lv=[];var ly=[];
        var ma=[];var mc=[];var md=[];var me=[];var mf=[];var mg=[];var mh=[];var mk=[];var ml=[];var mm=[];var mn=[];var mo=[];var mp=[];var mq=[];var mr=[];var ms=[];var mt=[];var mu=[];var mv=[];var mw=[];var mx=[];var my=[];var mz=[];
        var na=[];var nc=[];var ne=[];var nf=[];var ng=[];var ni=[];var nl=[];var no=[];var np=[];var nr=[];var nu=[];var nz=[];
        var om=[];
        var pa=[];var pe=[];var pf=[];var pg=[];var ph=[];var pk=[];var pl=[];var pm=[];var pn=[];var pr=[];var ps=[];var pt=[];var pw=[];var py=[];
        var qa=[];
        var re=[];var ro=[];var rs=[];var ru=[];var rw=[];
        var sa=[];var sb=[];var sc=[];var sd=[];var se=[];var sg=[];var sh=[];var si=[];var sj=[];var sk=[];var sl=[];var sm=[];var sn=[];var so=[];var sr=[];var ss=[];var st=[];var sv=[];var sx=[];var sy=[];var sz=[];
        var tc=[];var td=[];var tf=[];var tg=[];var th=[];var tj=[];var tk=[];var tl=[];var tm=[];var tn=[];var to=[];var tr=[];var tt=[];var tv=[];var tw=[];var tz=[];
        var ua=[];var ug=[];var um=[];var us=[];var uy=[];var uz=[];
        var va=[];var vc=[];var ve=[];var vg=[];var vi=[];var vn=[];var vu=[];
        var wf=[];var ws=[];
        var ye=[];var yt=[];
        var za=[];var zm=[];var zw=[];

        for (var i=0; i<arrlen; i++) {

            ad +=(get.gettext(ad_region[i])+"|");ae +=(get.gettext(ae_region[i])+"|");af +=(get.gettext(af_region[i])+"|");ag +=(get.gettext(ag_region[i])+"|");ai +=(get.gettext(ai_region[i])+"|");al +=(get.gettext(al_region[i])+"|");am +=(get.gettext(am_region[i])+"|");ao +=(get.gettext(ao_region[i])+"|");aq +=(get.gettext(aq_region[i])+"|");ar +=(get.gettext(ar_region[i])+"|");as +=(get.gettext(as_region[i])+"|");at +=(get.gettext(at_region[i])+"|");au +=(get.gettext(au_region[i])+"|");aw +=(get.gettext(aw_region[i])+"|");ax +=(get.gettext(ax_region[i])+"|");az +=(get.gettext(az_region[i])+"|");
            ba +=(get.gettext(ba_region[i])+"|");bb +=(get.gettext(bb_region[i])+"|");bd +=(get.gettext(bd_region[i])+"|");be +=(get.gettext(be_region[i])+"|");bf +=(get.gettext(bf_region[i])+"|");bg +=(get.gettext(bg_region[i])+"|");bh +=(get.gettext(bh_region[i])+"|");bi +=(get.gettext(bi_region[i])+"|");bj +=(get.gettext(bj_region[i])+"|");bl +=(get.gettext(bl_region[i])+"|");bm +=(get.gettext(bm_region[i])+"|");bn +=(get.gettext(bn_region[i])+"|");bo +=(get.gettext(bo_region[i])+"|");bq +=(get.gettext(bq_region[i])+"|");br +=(get.gettext(br_region[i])+"|");bs +=(get.gettext(bs_region[i])+"|");bt +=(get.gettext(bt_region[i])+"|");bw +=(get.gettext(bw_region[i])+"|");by +=(get.gettext(by_region[i])+"|");bz +=(get.gettext(bz_region[i])+"|");
            ca +=(get.gettext(ca_region[i])+"|");cc +=(get.gettext(cc_region[i])+"|");cd +=(get.gettext(cd_region[i])+"|");cf +=(get.gettext(cf_region[i])+"|");cg +=(get.gettext(cg_region[i])+"|");ch +=(get.gettext(ch_region[i])+"|");ci +=(get.gettext(ci_region[i])+"|");ck +=(get.gettext(ck_region[i])+"|");cl +=(get.gettext(cl_region[i])+"|");cm +=(get.gettext(cm_region[i])+"|");cn +=(get.gettext(cn_region[i])+"|");co +=(get.gettext(co_region[i])+"|");cr +=(get.gettext(cr_region[i])+"|");cu +=(get.gettext(cu_region[i])+"|");cv +=(get.gettext(cv_region[i])+"|");cw +=(get.gettext(cw_region[i])+"|");cx +=(get.gettext(cx_region[i])+"|");cy +=(get.gettext(cy_region[i])+"|");cz +=(get.gettext(cz_region[i])+"|");
            de +=(get.gettext(de_region[i])+"|");dj +=(get.gettext(dj_region[i])+"|");dk +=(get.gettext(dk_region[i])+"|");dm +=(get.gettext(dm_region[i])+"|");do1 +=(get.gettext(do1_region[i])+"|");dz +=(get.gettext(dz_region[i])+"|");
            ec +=(get.gettext(ec_region[i])+"|");ee +=(get.gettext(ee_region[i])+"|");eg +=(get.gettext(eg_region[i])+"|");eh +=(get.gettext(eh_region[i])+"|");er +=(get.gettext(er_region[i])+"|");es +=(get.gettext(es_region[i])+"|");et +=(get.gettext(et_region[i])+"|");
            fi +=(get.gettext(fi_region[i])+"|");fj +=(get.gettext(fj_region[i])+"|");fk +=(get.gettext(fk_region[i])+"|");fm +=(get.gettext(fm_region[i])+"|");fo +=(get.gettext(fo_region[i])+"|");fr +=(get.gettext(fr_region[i])+"|");
            ga +=(get.gettext(ga_region[i])+"|");gb +=(get.gettext(gb_region[i])+"|");gd +=(get.gettext(gd_region[i])+"|");ge +=(get.gettext(ge_region[i])+"|");gf +=(get.gettext(gf_region[i])+"|");gg +=(get.gettext(gg_region[i])+"|");gh +=(get.gettext(gh_region[i])+"|");gi +=(get.gettext(gi_region[i])+"|");gl +=(get.gettext(gl_region[i])+"|");gm +=(get.gettext(gm_region[i])+"|");gn +=(get.gettext(gn_region[i])+"|");gp +=(get.gettext(gp_region[i])+"|");gq +=(get.gettext(gq_region[i])+"|");gr +=(get.gettext(gr_region[i])+"|");gs +=(get.gettext(gs_region[i])+"|");gt +=(get.gettext(gt_region[i])+"|");gu +=(get.gettext(gu_region[i])+"|");gw +=(get.gettext(gw_region[i])+"|");gy +=(get.gettext(gy_region[i])+"|");
            hk +=(get.gettext(hk_region[i])+"|");hn +=(get.gettext(hn_region[i])+"|");hr +=(get.gettext(hr_region[i])+"|");ht +=(get.gettext(ht_region[i])+"|");hu +=(get.gettext(hu_region[i])+"|");
            id +=(get.gettext(id_region[i])+"|");ie +=(get.gettext(ie_region[i])+"|");il +=(get.gettext(il_region[i])+"|");im +=(get.gettext(im_region[i])+"|");in1 +=(get.gettext(in1_region[i])+"|");io +=(get.gettext(io_region[i])+"|");iq +=(get.gettext(iq_region[i])+"|");ir +=(get.gettext(ir_region[i])+"|");is +=(get.gettext(is_region[i])+"|");it +=(get.gettext(it_region[i])+"|");
            je +=(get.gettext(je_region[i])+"|");jm +=(get.gettext(jm_region[i])+"|");jo +=(get.gettext(jo_region[i])+"|");jp +=(get.gettext(jp_region[i])+"|");
            ke +=(get.gettext(ke_region[i])+"|");kg +=(get.gettext(kg_region[i])+"|");kh +=(get.gettext(kh_region[i])+"|");ki +=(get.gettext(ki_region[i])+"|");km +=(get.gettext(km_region[i])+"|");kn +=(get.gettext(kn_region[i])+"|");kp +=(get.gettext(kp_region[i])+"|");kr +=(get.gettext(kr_region[i])+"|");kw +=(get.gettext(kw_region[i])+"|");ky +=(get.gettext(ky_region[i])+"|");kz +=(get.gettext(kz_region[i])+"|");
            la +=(get.gettext(la_region[i])+"|");lb +=(get.gettext(lb_region[i])+"|");lc +=(get.gettext(lc_region[i])+"|");li +=(get.gettext(li_region[i])+"|");lk +=(get.gettext(lk_region[i])+"|");lr +=(get.gettext(lr_region[i])+"|");ls +=(get.gettext(ls_region[i])+"|");lt +=(get.gettext(lt_region[i])+"|");lu +=(get.gettext(lu_region[i])+"|");lv +=(get.gettext(lv_region[i])+"|");ly +=(get.gettext(ly_region[i])+"|");
            ma +=(get.gettext(ma_region[i])+"|");mc +=(get.gettext(mc_region[i])+"|");md +=(get.gettext(md_region[i])+"|");me +=(get.gettext(me_region[i])+"|");mf +=(get.gettext(mf_region[i])+"|");mg +=(get.gettext(mg_region[i])+"|");mh +=(get.gettext(mh_region[i])+"|");mk +=(get.gettext(mk_region[i])+"|");ml +=(get.gettext(ml_region[i])+"|");mm +=(get.gettext(mm_region[i])+"|");mn +=(get.gettext(mn_region[i])+"|");mo +=(get.gettext(mo_region[i])+"|");mp +=(get.gettext(mp_region[i])+"|");mq +=(get.gettext(mq_region[i])+"|");mr +=(get.gettext(mr_region[i])+"|");ms +=(get.gettext(ms_region[i])+"|");mt +=(get.gettext(mt_region[i])+"|");mu +=(get.gettext(mu_region[i])+"|");mv +=(get.gettext(mv_region[i])+"|");mw +=(get.gettext(mw_region[i])+"|");mx +=(get.gettext(mx_region[i])+"|");my +=(get.gettext(my_region[i])+"|");mz +=(get.gettext(mz_region[i])+"|");
            na +=(get.gettext(na_region[i])+"|");nc +=(get.gettext(nc_region[i])+"|");ne +=(get.gettext(ne_region[i])+"|");nf +=(get.gettext(nf_region[i])+"|");ng +=(get.gettext(ng_region[i])+"|");ni +=(get.gettext(ni_region[i])+"|");nl +=(get.gettext(nl_region[i])+"|");no +=(get.gettext(no_region[i])+"|");np +=(get.gettext(np_region[i])+"|");nr +=(get.gettext(nr_region[i])+"|");nu +=(get.gettext(nu_region[i])+"|");nz +=(get.gettext(nz_region[i])+"|");
            om +=(get.gettext(om_region[i])+"|");
            pa +=(get.gettext(pa_region[i])+"|");pe +=(get.gettext(pe_region[i])+"|");pf +=(get.gettext(pf_region[i])+"|");pg +=(get.gettext(pg_region[i])+"|");ph +=(get.gettext(ph_region[i])+"|");pk +=(get.gettext(pk_region[i])+"|");pl +=(get.gettext(pl_region[i])+"|");pm +=(get.gettext(pm_region[i])+"|");pn +=(get.gettext(pn_region[i])+"|");pr +=(get.gettext(pr_region[i])+"|");ps +=(get.gettext(ps_region[i])+"|");pt +=(get.gettext(pt_region[i])+"|");pw +=(get.gettext(pw_region[i])+"|");py +=(get.gettext(py_region[i])+"|");
            qa +=(get.gettext(qa_region[i])+"|");
            re +=(get.gettext(re_region[i])+"|");ro +=(get.gettext(ro_region[i])+"|");rs +=(get.gettext(rs_region[i])+"|");ru +=(get.gettext(ru_region[i])+"|");rw +=(get.gettext(rw_region[i])+"|");
            sa +=(get.gettext(sa_region[i])+"|");sb +=(get.gettext(sb_region[i])+"|");sc +=(get.gettext(sc_region[i])+"|");sd +=(get.gettext(sd_region[i])+"|");se +=(get.gettext(se_region[i])+"|");sg +=(get.gettext(sg_region[i])+"|");sh +=(get.gettext(sh_region[i])+"|");si +=(get.gettext(si_region[i])+"|");sj +=(get.gettext(sj_region[i])+"|");sk +=(get.gettext(sk_region[i])+"|");sl +=(get.gettext(sl_region[i])+"|");sm +=(get.gettext(sm_region[i])+"|");sn +=(get.gettext(sn_region[i])+"|");so +=(get.gettext(so_region[i])+"|");sr +=(get.gettext(sr_region[i])+"|");ss +=(get.gettext(ss_region[i])+"|");st +=(get.gettext(st_region[i])+"|");sv +=(get.gettext(sv_region[i])+"|");sx +=(get.gettext(sx_region[i])+"|");sy +=(get.gettext(sy_region[i])+"|");sz +=(get.gettext(sz_region[i])+"|");
            tc +=(get.gettext(tc_region[i])+"|");td +=(get.gettext(td_region[i])+"|");tf +=(get.gettext(tf_region[i])+"|");tg +=(get.gettext(tg_region[i])+"|");th +=(get.gettext(th_region[i])+"|");tj +=(get.gettext(tj_region[i])+"|");tk +=(get.gettext(tk_region[i])+"|");tl +=(get.gettext(tl_region[i])+"|");tm +=(get.gettext(tm_region[i])+"|");tn +=(get.gettext(tn_region[i])+"|");to +=(get.gettext(to_region[i])+"|");tr +=(get.gettext(tr_region[i])+"|");tt +=(get.gettext(tt_region[i])+"|");tv +=(get.gettext(tv_region[i])+"|");tw +=(get.gettext(tw_region[i])+"|");tz +=(get.gettext(tz_region[i])+"|");
            ua +=(get.gettext(ua_region[i])+"|");ug +=(get.gettext(ug_region[i])+"|");um +=(get.gettext(um_region[i])+"|");us +=(get.gettext(us_region[i])+"|");uy +=(get.gettext(uy_region[i])+"|");uz +=(get.gettext(uz_region[i])+"|");
            va +=(get.gettext(va_region[i])+"|");vc +=(get.gettext(vc_region[i])+"|");ve +=(get.gettext(ve_region[i])+"|");vg +=(get.gettext(vg_region[i])+"|");vi +=(get.gettext(vi_region[i])+"|");vn +=(get.gettext(vn_region[i])+"|");vu +=(get.gettext(vu_region[i])+"|");
            wf +=(get.gettext(wf_region[i])+"|");ws +=(get.gettext(ws_region[i])+"|");
            ye +=(get.gettext(ye_region[i])+"|");yt +=(get.gettext(yt_region[i])+"|");
            za +=(get.gettext(za_region[i])+"|");zm +=(get.gettext(zm_region[i])+"|");zw +=(get.gettext(zw_region[i])+"|");

        }

        var geodatasource_data=[["AF",af_country,af.slice(0, -(arrlen-af_region.length+1))],["AX",ax_country,ax.slice(0, -(arrlen-ax_region.length+1))],["AL",al_country,al.slice(0, -(arrlen-al_region.length+1))],["DZ",dz_country,dz.slice(0, -(arrlen-dz_region.length+1))],["AS",as_country,as.slice(0, -(arrlen-as_region.length+1))],["AD",ad_country,ad.slice(0, -(arrlen-ad_region.length+1))],["AO",ao_country,ao.slice(0, -(arrlen-ao_region.length+1))],["AI",ai_country,ai.slice(0, -(arrlen-ai_region.length+1))],["AQ",aq_country,aq.slice(0, -(arrlen-aq_region.length+1))],["AG",ag_country,ag.slice(0, -(arrlen-ag_region.length+1))],["AR",ar_country,ar.slice(0, -(arrlen-ar_region.length+1))],["AM",am_country,am.slice(0, -(arrlen-am_region.length+1))],["AW",aw_country,aw.slice(0, -(arrlen-aw_region.length+1))],["AU",au_country,au.slice(0, -(arrlen-au_region.length+1))],["AT",at_country,at.slice(0, -(arrlen-at_region.length+1))],["AZ",az_country,az.slice(0, -(arrlen-az_region.length+1))],["BS",bs_country,bs.slice(0, -(arrlen-bs_region.length+1))],["BH",bh_country,bh.slice(0, -(arrlen-bh_region.length+1))],["BD",bd_country,bd.slice(0, -(arrlen-bd_region.length+1))],["BB",bb_country,bb.slice(0, -(arrlen-bb_region.length+1))],["BY",by_country,by.slice(0, -(arrlen-by_region.length+1))],["BE",be_country,be.slice(0, -(arrlen-be_region.length+1))],["BZ",bz_country,bz.slice(0, -(arrlen-bz_region.length+1))],["BJ",bj_country,bj.slice(0, -(arrlen-bj_region.length+1))],["BM",bm_country,bm.slice(0, -(arrlen-bm_region.length+1))],["BT",bt_country,bt.slice(0, -(arrlen-bt_region.length+1))],["BO",bo_country,bo.slice(0, -(arrlen-bo_region.length+1))],["BQ",bq_country,bq.slice(0, -(arrlen-bq_region.length+1))],["BA",ba_country,ba.slice(0, -(arrlen-ba_region.length+1))],["BW",bw_country,bw.slice(0, -(arrlen-bw_region.length+1))],["BR",br_country,br.slice(0, -(arrlen-br_region.length+1))],["IO",io_country,io.slice(0, -(arrlen-io_region.length+1))],["BN",bn_country,bn.slice(0, -(arrlen-bn_region.length+1))],["BG",bg_country,bg.slice(0, -(arrlen-bg_region.length+1))],["BF",bf_country,bf.slice(0, -(arrlen-bf_region.length+1))],["BI",bi_country,bi.slice(0, -(arrlen-bi_region.length+1))],["CV",cv_country,cv.slice(0, -(arrlen-cv_region.length+1))],["KH",kh_country,kh.slice(0, -(arrlen-kh_region.length+1))],["CM",cm_country,cm.slice(0, -(arrlen-cm_region.length+1))],["CA",ca_country,ca.slice(0, -(arrlen-ca_region.length+1))],["KY",ky_country,ky.slice(0, -(arrlen-ky_region.length+1))],["CF",cf_country,cf.slice(0, -(arrlen-cf_region.length+1))],["TD",td_country,td.slice(0, -(arrlen-td_region.length+1))],["CL",cl_country,cl.slice(0, -(arrlen-cl_region.length+1))],["CN",cn_country,cn.slice(0, -(arrlen-cn_region.length+1))],["CX",cx_country,cx.slice(0, -(arrlen-cx_region.length+1))],["CC",cc_country,cc.slice(0, -(arrlen-cc_region.length+1))],["CO",co_country,co.slice(0, -(arrlen-co_region.length+1))],["KM",km_country,km.slice(0, -(arrlen-km_region.length+1))],["CG",cg_country,cg.slice(0, -(arrlen-cg_region.length+1))],["CD",cd_country,cd.slice(0, -(arrlen-cd_region.length+1))],["CK",ck_country,ck.slice(0, -(arrlen-ck_region.length+1))],["CR",cr_country,cr.slice(0, -(arrlen-cr_region.length+1))],["CI",ci_country,ci.slice(0, -(arrlen-ci_region.length+1))],["HR",hr_country,hr.slice(0, -(arrlen-hr_region.length+1))],["CU",cu_country,cu.slice(0, -(arrlen-cu_region.length+1))],["CW",cw_country,cw.slice(0, -(arrlen-cw_region.length+1))],["CY",cy_country,cy.slice(0, -(arrlen-cy_region.length+1))],["CZ",cz_country,cz.slice(0, -(arrlen-cz_region.length+1))],["DK",dk_country,dk.slice(0, -(arrlen-dk_region.length+1))],["DJ",dj_country,dj.slice(0, -(arrlen-dj_region.length+1))],["DM",dm_country,dm.slice(0, -(arrlen-dm_region.length+1))],["DO",do1_country,do1.slice(0, -(arrlen-do1_region.length+1))],["EC",ec_country,ec.slice(0, -(arrlen-ec_region.length+1))],["EG",eg_country,eg.slice(0, -(arrlen-eg_region.length+1))],["SV",sv_country,sv.slice(0, -(arrlen-sv_region.length+1))],["GQ",gq_country,gq.slice(0, -(arrlen-gq_region.length+1))],["ER",er_country,er.slice(0, -(arrlen-er_region.length+1))],["EE",ee_country,ee.slice(0, -(arrlen-ee_region.length+1))],["ET",et_country,et.slice(0, -(arrlen-et_region.length+1))],["FK",fk_country,fk.slice(0, -(arrlen-fk_region.length+1))],["FO",fo_country,fo.slice(0, -(arrlen-fo_region.length+1))],["FJ",fj_country,fj.slice(0, -(arrlen-fj_region.length+1))],["FI",fi_country,fi.slice(0, -(arrlen-fi_region.length+1))],["FR",fr_country,fr.slice(0, -(arrlen-fr_region.length+1))],["GF",gf_country,gf.slice(0, -(arrlen-gf_region.length+1))],["PF",pf_country,pf.slice(0, -(arrlen-pf_region.length+1))],["TF",tf_country,tf.slice(0, -(arrlen-tf_region.length+1))],["GA",ga_country,ga.slice(0, -(arrlen-ga_region.length+1))],["GM",gm_country,gm.slice(0, -(arrlen-gm_region.length+1))],["GE",ge_country,ge.slice(0, -(arrlen-ge_region.length+1))],["DE",de_country,de.slice(0, -(arrlen-de_region.length+1))],["GH",gh_country,gh.slice(0, -(arrlen-gh_region.length+1))],["GI",gi_country,gi.slice(0, -(arrlen-gi_region.length+1))],["GR",gr_country,gr.slice(0, -(arrlen-gr_region.length+1))],["GL",gl_country,gl.slice(0, -(arrlen-gl_region.length+1))],["GD",gd_country,gd.slice(0, -(arrlen-gd_region.length+1))],["GP",gp_country,gp.slice(0, -(arrlen-gp_region.length+1))],["GU",gu_country,gu.slice(0, -(arrlen-gu_region.length+1))],["GT",gt_country,gt.slice(0, -(arrlen-gt_region.length+1))],["GG",gg_country,gg.slice(0, -(arrlen-gg_region.length+1))],["GN",gn_country,gn.slice(0, -(arrlen-gn_region.length+1))],["GW",gw_country,gw.slice(0, -(arrlen-gw_region.length+1))],["GY",gy_country,gy.slice(0, -(arrlen-gy_region.length+1))],["HT",ht_country,ht.slice(0, -(arrlen-ht_region.length+1))],["VA",va_country,va.slice(0, -(arrlen-va_region.length+1))],["HN",hn_country,hn.slice(0, -(arrlen-hn_region.length+1))],["HK",hk_country,hk.slice(0, -(arrlen-hk_region.length+1))],["HU",hu_country,hu.slice(0, -(arrlen-hu_region.length+1))],["IS",is_country,is.slice(0, -(arrlen-is_region.length+1))],["IN",in1_country,in1.slice(0, -(arrlen-in1_region.length+1))],["ID",id_country,id.slice(0, -(arrlen-id_region.length+1))],["IR",ir_country,ir.slice(0, -(arrlen-ir_region.length+1))],["IQ",iq_country,iq.slice(0, -(arrlen-iq_region.length+1))],["IE",ie_country,ie.slice(0, -(arrlen-ie_region.length+1))],["IM",im_country,im.slice(0, -(arrlen-im_region.length+1))],["IL",il_country,il.slice(0, -(arrlen-il_region.length+1))],["IT",it_country,it.slice(0, -(arrlen-it_region.length+1))],["JM",jm_country,jm.slice(0, -(arrlen-jm_region.length+1))],["JP",jp_country,jp.slice(0, -(arrlen-jp_region.length+1))],["JE",je_country,je.slice(0, -(arrlen-je_region.length+1))],["JO",jo_country,jo.slice(0, -(arrlen-jo_region.length+1))],["KZ",kz_country,kz.slice(0, -(arrlen-kz_region.length+1))],["KE",ke_country,ke.slice(0, -(arrlen-ke_region.length+1))],["KI",ki_country,ki.slice(0, -(arrlen-ki_region.length+1))],["KP",kp_country,kp.slice(0, -(arrlen-kp_region.length+1))],["KR",kr_country,kr.slice(0, -(arrlen-kr_region.length+1))],["KW",kw_country,kw.slice(0, -(arrlen-kw_region.length+1))],["KG",kg_country,kg.slice(0, -(arrlen-kg_region.length+1))],["LA",la_country,la.slice(0, -(arrlen-la_region.length+1))],["LV",lv_country,lv.slice(0, -(arrlen-lv_region.length+1))],["LB",lb_country,lb.slice(0, -(arrlen-lb_region.length+1))],["LS",ls_country,ls.slice(0, -(arrlen-ls_region.length+1))],["LR",lr_country,lr.slice(0, -(arrlen-lr_region.length+1))],["LY",ly_country,ly.slice(0, -(arrlen-ly_region.length+1))],["LI",li_country,li.slice(0, -(arrlen-li_region.length+1))],["LT",lt_country,lt.slice(0, -(arrlen-lt_region.length+1))],["LU",lu_country,lu.slice(0, -(arrlen-lu_region.length+1))],["MO",mo_country,mo.slice(0, -(arrlen-mo_region.length+1))],["MK",mk_country,mk.slice(0, -(arrlen-mk_region.length+1))],["MG",mg_country,mg.slice(0, -(arrlen-mg_region.length+1))],["MW",mw_country,mw.slice(0, -(arrlen-mw_region.length+1))],["MY",my_country,my.slice(0, -(arrlen-my_region.length+1))],["MV",mv_country,mv.slice(0, -(arrlen-mv_region.length+1))],["ML",ml_country,ml.slice(0, -(arrlen-ml_region.length+1))],["MT",mt_country,mt.slice(0, -(arrlen-mt_region.length+1))],["MH",mh_country,mh.slice(0, -(arrlen-mh_region.length+1))],["MQ",mq_country,mq.slice(0, -(arrlen-mq_region.length+1))],["MR",mr_country,mr.slice(0, -(arrlen-mr_region.length+1))],["MU",mu_country,mu.slice(0, -(arrlen-mu_region.length+1))],["YT",yt_country,yt.slice(0, -(arrlen-yt_region.length+1))],["MX",mx_country,mx.slice(0, -(arrlen-mx_region.length+1))],["FM",fm_country,fm.slice(0, -(arrlen-fm_region.length+1))],["MD",md_country,md.slice(0, -(arrlen-md_region.length+1))],["MC",mc_country,mc.slice(0, -(arrlen-mc_region.length+1))],["MN",mn_country,mn.slice(0, -(arrlen-mn_region.length+1))],["ME",me_country,me.slice(0, -(arrlen-me_region.length+1))],["MS",ms_country,ms.slice(0, -(arrlen-ms_region.length+1))],["MA",ma_country,ma.slice(0, -(arrlen-ma_region.length+1))],["MZ",mz_country,mz.slice(0, -(arrlen-mz_region.length+1))],["MM",mm_country,mm.slice(0, -(arrlen-mm_region.length+1))],["NA",na_country,na.slice(0, -(arrlen-na_region.length+1))],["NR",nr_country,nr.slice(0, -(arrlen-nr_region.length+1))],["NP",np_country,np.slice(0, -(arrlen-np_region.length+1))],["NL",nl_country,nl.slice(0, -(arrlen-nl_region.length+1))],["NC",nc_country,nc.slice(0, -(arrlen-nc_region.length+1))],["NZ",nz_country,nz.slice(0, -(arrlen-nz_region.length+1))],["NI",ni_country,ni.slice(0, -(arrlen-ni_region.length+1))],["NE",ne_country,ne.slice(0, -(arrlen-ne_region.length+1))],["NG",ng_country,ng.slice(0, -(arrlen-ng_region.length+1))],["NU",nu_country,nu.slice(0, -(arrlen-nu_region.length+1))],["NF",nf_country,nf.slice(0, -(arrlen-nf_region.length+1))],["MP",mp_country,mp.slice(0, -(arrlen-mp_region.length+1))],["NO",no_country,no.slice(0, -(arrlen-no_region.length+1))],["OM",om_country,om.slice(0, -(arrlen-om_region.length+1))],["PK",pk_country,pk.slice(0, -(arrlen-pk_region.length+1))],["PW",pw_country,pw.slice(0, -(arrlen-pw_region.length+1))],["PS",ps_country,ps.slice(0, -(arrlen-ps_region.length+1))],["PA",pa_country,pa.slice(0, -(arrlen-pa_region.length+1))],["PG",pg_country,pg.slice(0, -(arrlen-pg_region.length+1))],["PY",py_country,py.slice(0, -(arrlen-py_region.length+1))],["PE",pe_country,pe.slice(0, -(arrlen-pe_region.length+1))],["PH",ph_country,ph.slice(0, -(arrlen-ph_region.length+1))],["PN",pn_country,pn.slice(0, -(arrlen-pn_region.length+1))],["PL",pl_country,pl.slice(0, -(arrlen-pl_region.length+1))],["PT",pt_country,pt.slice(0, -(arrlen-pt_region.length+1))],["PR",pr_country,pr.slice(0, -(arrlen-pr_region.length+1))],["QA",qa_country,qa.slice(0, -(arrlen-qa_region.length+1))],["RE",re_country,re.slice(0, -(arrlen-re_region.length+1))],["RO",ro_country,ro.slice(0, -(arrlen-ro_region.length+1))],["RU",ru_country,ru.slice(0, -(arrlen-ru_region.length+1))],["RW",rw_country,rw.slice(0, -(arrlen-rw_region.length+1))],["BL",bl_country,bl.slice(0, -(arrlen-bl_region.length+1))],["SH",sh_country,sh.slice(0, -(arrlen-sh_region.length+1))],["KN",kn_country,kn.slice(0, -(arrlen-kn_region.length+1))],["LC",lc_country,lc.slice(0, -(arrlen-lc_region.length+1))],["MF",mf_country,mf.slice(0, -(arrlen-mf_region.length+1))],["PM",pm_country,pm.slice(0, -(arrlen-pm_region.length+1))],["VC",vc_country,vc.slice(0, -(arrlen-vc_region.length+1))],["WS",ws_country,ws.slice(0, -(arrlen-ws_region.length+1))],["SM",sm_country,sm.slice(0, -(arrlen-sm_region.length+1))],["ST",st_country,st.slice(0, -(arrlen-st_region.length+1))],["SA",sa_country,sa.slice(0, -(arrlen-sa_region.length+1))],["SN",sn_country,sn.slice(0, -(arrlen-sn_region.length+1))],["RS",rs_country,rs.slice(0, -(arrlen-rs_region.length+1))],["SC",sc_country,sc.slice(0, -(arrlen-sc_region.length+1))],["SL",sl_country,sl.slice(0, -(arrlen-sl_region.length+1))],["SG",sg_country,sg.slice(0, -(arrlen-sg_region.length+1))],["SX",sx_country,sx.slice(0, -(arrlen-sx_region.length+1))],["SK",sk_country,sk.slice(0, -(arrlen-sk_region.length+1))],["SI",si_country,si.slice(0, -(arrlen-si_region.length+1))],["SB",sb_country,sb.slice(0, -(arrlen-sb_region.length+1))],["SO",so_country,so.slice(0, -(arrlen-so_region.length+1))],["ZA",za_country,za.slice(0, -(arrlen-za_region.length+1))],["GS",gs_country,gs.slice(0, -(arrlen-gs_region.length+1))],["SS",ss_country,ss.slice(0, -(arrlen-ss_region.length+1))],["ES",es_country,es.slice(0, -(arrlen-es_region.length+1))],["LK",lk_country,lk.slice(0, -(arrlen-lk_region.length+1))],["SD",sd_country,sd.slice(0, -(arrlen-sd_region.length+1))],["SR",sr_country,sr.slice(0, -(arrlen-sr_region.length+1))],["SJ",sj_country,sj.slice(0, -(arrlen-sj_region.length+1))],["SZ",sz_country,sz.slice(0, -(arrlen-sz_region.length+1))],["SE",se_country,se.slice(0, -(arrlen-se_region.length+1))],["CH",ch_country,ch.slice(0, -(arrlen-ch_region.length+1))],["SY",sy_country,sy.slice(0, -(arrlen-sy_region.length+1))],["TW",tw_country,tw.slice(0, -(arrlen-tw_region.length+1))],["TJ",tj_country,tj.slice(0, -(arrlen-tj_region.length+1))],["TZ",tz_country,tz.slice(0, -(arrlen-tz_region.length+1))],["TH",th_country,th.slice(0, -(arrlen-th_region.length+1))],["TL",tl_country,tl.slice(0, -(arrlen-tl_region.length+1))],["TG",tg_country,tg.slice(0, -(arrlen-tg_region.length+1))],["TK",tk_country,tk.slice(0, -(arrlen-tk_region.length+1))],["TO",to_country,to.slice(0, -(arrlen-to_region.length+1))],["TT",tt_country,tt.slice(0, -(arrlen-tt_region.length+1))],["TN",tn_country,tn.slice(0, -(arrlen-tn_region.length+1))],["TR",tr_country,tr.slice(0, -(arrlen-tr_region.length+1))],["TM",tm_country,tm.slice(0, -(arrlen-tm_region.length+1))],["TC",tc_country,tc.slice(0, -(arrlen-tc_region.length+1))],["TV",tv_country,tv.slice(0, -(arrlen-tv_region.length+1))],["UG",ug_country,ug.slice(0, -(arrlen-ug_region.length+1))],["UA",ua_country,ua.slice(0, -(arrlen-ua_region.length+1))],["AE",ae_country,ae.slice(0, -(arrlen-ae_region.length+1))],["GB",gb_country,gb.slice(0, -(arrlen-gb_region.length+1))],["US",us_country,us.slice(0, -(arrlen-us_region.length+1))],["UM",um_country,um.slice(0, -(arrlen-um_region.length+1))],["UY",uy_country,uy.slice(0, -(arrlen-uy_region.length+1))],["UZ",uz_country,uz.slice(0, -(arrlen-uz_region.length+1))],["VU",vu_country,vu.slice(0, -(arrlen-vu_region.length+1))],["VE",ve_country,ve.slice(0, -(arrlen-ve_region.length+1))],["VN",vn_country,vn.slice(0, -(arrlen-vn_region.length+1))],["VG",vg_country,vg.slice(0, -(arrlen-vg_region.length+1))],["VI",vi_country,vi.slice(0, -(arrlen-vi_region.length+1))],["WF",wf_country,wf.slice(0, -(arrlen-wf_region.length+1))],["EH",eh_country,eh.slice(0, -(arrlen-eh_region.length+1))],["YE",ye_country,ye.slice(0, -(arrlen-ye_region.length+1))],["ZM",zm_country,zm.slice(0, -(arrlen-zm_region.length+1))],["ZW",zw_country,zw.slice(0, -(arrlen-zw_region.length+1))]];
        country_region= geodatasource_data;
    };

    var initialiseRegion = function() {
        for (var i=0; i<country_region.length; i++) {
            var regionData = {
                regions: []
            };
            var regions = country_region[i][2].split("|");
            for (var j=0; j<regions.length; j++) {
                var parts = [];
                parts.push(regions[j]);
                regionData.regions.push(parts);
            }
            country_region[i][3] = regionData;
        }
    };

    var initialiseRegionField = function(regionElement) {
        var customRegionBlankOptionString = regionElement.getAttribute("region-data-blank-option");
        var defaultRegionBlankOptionString = customRegionBlankOptionString ? customRegionBlankOptionString : "-";
        regionElement.length = 0;
        if (showEmptyRegionOption) {
            regionElement.options[0] = new Option(defaultRegionBlankOptionString, "");
            regionElement.selectedIndex = 0;
        }
    };

    var generateRegionField = function(countryElement, regionElement) {
        var langRegion = countryElement.getAttribute("data-language");
        switch (langRegion) {
            case 'en':
            default:
                regionString = "Please select a region.";
        }

        var selectedCountryIndex = (showEmptyCountryOption) ? countryElement.selectedIndex - 1 : countryElement.selectedIndex;
        var customRegionOptionString = regionElement.getAttribute("region-data-default-option");
        var defaultRegionOptionString = customRegionOptionString ? customRegionOptionString : regionString;

        if (countryElement.value === "") {
            initialiseRegionField(regionElement);
        } else if (typeof country_region[selectedCountryIndex] !== 'undefined') {
            regionElement.length = 0;
            if (showEmptyRegionOption) {
                regionElement.options[0] = new Option(defaultRegionOptionString, "");
            }
            var regionData = country_region[selectedCountryIndex][3];
            for (var i=0; i<regionData.regions.length; i++) {
                var value = regionData.regions[i];
                regionElement.options[regionElement.length] = new Option(regionData.regions[i], value);
            }
            regionElement.selectedIndex = 0;
        }
    };

    var setDefaultRegionValue = function(regionElement, data, defaultRegionSelectedValue) {
        for (var i=0; i<data.regions.length; i++) {
            var currVal = data.regions[i][0];
            if (currVal === defaultRegionSelectedValue) {
                regionElement.selectedIndex = (showEmptyRegionOption) ? i + 1 : i;
                break;
            }
        }
    };

    /*
     * contentloaded.js
     */
    var contentLoaded = function(win, fn) {
        var done = false, top = true,
        doc = win.document,
        root = doc.documentElement,
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    };

    contentLoaded(window, initialise);

    return { init: initialise };
}));