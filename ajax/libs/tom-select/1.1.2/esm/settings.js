/**
* Tom Select v1.1.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import defaults from './defaults.js';
import { hash_key } from './utils.js';

function getSettings(input, settings_user) {
  var settings = Object.assign({}, defaults, settings_user);
  var attr_data = settings.dataAttr;
  var field_label = settings.labelField;
  var field_value = settings.valueField;
  var field_disabled = settings.disabledField;
  var field_optgroup = settings.optgroupField;
  var field_optgroup_label = settings.optgroupLabelField;
  var field_optgroup_value = settings.optgroupValueField;
  var tag_name = input.tagName.toLowerCase();
  var placeholder = input.getAttribute('placeholder') || input.getAttribute('data-placeholder');

  if (!placeholder && !settings.allowEmptyOption) {
    let option = input.querySelector('option[value=""]');

    if (option) {
      placeholder = option.textContent;
    }
  }

  var settings_element = {
    placeholder: placeholder,
    options: [],
    optgroups: [],
    items: [],
    maxItems: null
  };
  /**
   * Initialize from a <select> element.
   *
   */

  var init_select = () => {
    var i, n, tagName, children;
    var options = settings_element.options;
    var optionsMap = {};

    var readData = el => {
      var data = Object.assign({}, el.dataset); // get plain object from DOMStringMap

      var json = attr_data && data[attr_data];

      if (typeof json === 'string' && json.length) {
        data = Object.assign(data, JSON.parse(json));
      }

      return data;
    };

    var addOption = (option, group) => {
      var value = hash_key(option.value);
      if (!value && !settings.allowEmptyOption) return; // if the option already exists, it's probably been
      // duplicated in another optgroup. in this case, push
      // the current group to the "optgroup" property on the
      // existing option so that it's rendered in both places.

      if (optionsMap.hasOwnProperty(value)) {
        if (group) {
          var arr = optionsMap[value][field_optgroup];

          if (!arr) {
            optionsMap[value][field_optgroup] = group;
          } else if (!Array.isArray(arr)) {
            optionsMap[value][field_optgroup] = [arr, group];
          } else {
            arr.push(group);
          }
        }

        return;
      }

      var option_data = readData(option);
      option_data[field_label] = option_data[field_label] || option.textContent;
      option_data[field_value] = option_data[field_value] || value;
      option_data[field_disabled] = option_data[field_disabled] || option.disabled;
      option_data[field_optgroup] = option_data[field_optgroup] || group;
      optionsMap[value] = option_data;
      options.push(option_data);

      if (option.selected) {
        settings_element.items.push(value);
      }
    };

    var addGroup = optgroup => {
      var i, n, id, optgroup_data, options;
      id = optgroup.getAttribute('label');

      if (id) {
        optgroup_data = readData(optgroup);
        optgroup_data[field_optgroup_label] = id;
        optgroup_data[field_optgroup_value] = id;
        optgroup_data[field_disabled] = optgroup.disabled;
        settings_element.optgroups.push(optgroup_data);
      }

      var options = optgroup.children;

      for (i = 0, n = options.length; i < n; i++) {
        addOption(options[i], id);
      }
    };

    settings_element.maxItems = input.hasAttribute('multiple') ? null : 1;
    children = input.children;

    for (i = 0, n = children.length; i < n; i++) {
      tagName = children[i].tagName.toLowerCase();

      if (tagName === 'optgroup') {
        addGroup(children[i]);
      } else if (tagName === 'option') {
        addOption(children[i]);
      }
    }
  };
  /**
   * Initialize from a <input type="text"> element.
   *
   */


  var init_textbox = () => {
    var i, n, values, option;
    var data_raw = input.getAttribute(attr_data);

    if (!data_raw) {
      var value = input.value.trim() || '';
      if (!settings.allowEmptyOption && !value.length) return;
      values = value.split(settings.delimiter);

      for (i = 0, n = values.length; i < n; i++) {
        option = {};
        option[field_label] = values[i];
        option[field_value] = values[i];
        settings_element.options.push(option);
      }

      settings_element.items = values;
    } else {
      settings_element.options = JSON.parse(data_raw);

      for (i = 0, n = settings_element.options.length; i < n; i++) {
        settings_element.items.push(settings_element.options[i][field_value]);
      }
    }
  };

  if (tag_name === 'select') {
    init_select();
  } else {
    init_textbox();
  }

  return Object.assign({}, defaults, settings_element, settings_user);
}

export default getSettings;
//# sourceMappingURL=settings.js.map
