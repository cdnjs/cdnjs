function h$1(tag) {
  return document.createElement(tag);
}

const dim$1 = h$1('div');
const dimStyle = dim$1.style;

function extractColor(color, ignoreAlpha = false) {
  if (typeof color !== 'string') return null;

  dimStyle.color = '';
  dimStyle.color = color;

  const arr = !dimStyle.color
    ? null // incorrect color
    : dimStyle.color
      .slice(dimStyle.color.indexOf('(') + 1, -1)
      .split(', ')
      .map(Number);

  if (!arr) return arr;

  if (ignoreAlpha) {
    return arr.slice(0, 3);
  }

  arr[3] = arr[3] || 1;

  return arr;
}

function strToRgb(color, ignoreAlpha = false) {
  if (!color) return undefined;

  if (color.startsWith('rgb')) return color;

  const rgba = extractColor(color, ignoreAlpha);

  return rgba ? `${rgba.length > 3 ? 'rgba' : 'rgb'}(${rgba.join(',')})` : undefined;
}

function requireChild(host, tag) {
  if (!host.querySelector(tag)) {
    host.appendChild(h$1(tag));
  }
}

function fixture(html) {
  const template = document.createElement('template');

  html = html.trim();

  template.innerHTML = html;

  return template.content.firstChild;
}

/**
 * Apply "theme"-related attribute to the element.
 * @param {NuElement} host
 * @param {String} themeName
 * @param {Boolean} bool
 */
function setThemeAttr(host, themeName, bool) {
  if (bool) {
    if (!host.getAttribute('theme')) {
      host.setAttribute('theme', themeName);
    }
  } else {
    if (host.getAttribute('theme') === themeName) {
      host.removeAttribute('theme');
    }
  }
}

function localProp(name, fallbackValue) {
  return prop(`local-${name}`, name, fallbackValue);
}

function prop(propName, fallbackPropName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `var(--${propName}${fallbackPropName ? `, var(--${fallbackPropName}${fallbackValuePart})` : fallbackValuePart})`;
}

function rgbColorProp(colorName, opacity, fallbackColorName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `rgba(var(--${colorName}-color-rgb${fallbackColorName ? `, var(--${fallbackColorName}-color-rgb, ${fallbackValuePart})` : fallbackValuePart}), ${opacity})`;
}

function colorProp(colorName, fallbackColorName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `var(--${colorName}-color${fallbackColorName ? `, var(--${fallbackColorName}${fallbackValuePart})` : fallbackValuePart})`;
}

/**
 * Required root element attribute.
 * @type {String}
 */

const ROOT_CONTEXT = ':root';

const DIRECTIONS$1 = ['top', 'right', 'bottom', 'left'];

const isTouch = matchMedia('(pointer: coarse)').matches;

const USE_SHADOW$1 = document.querySelector(':root').dataset.nuShadow != null;
const DISABLED_TRANSITION = 'all 0s ease 0s';

/**
 * Custom units dict
 * @type {Object}
 */
const CUSTOM_UNITS = {
  'r': 'var(--radius)',
  'bw': 'var(--border-width)',
  'ow': 'var(--outline-width)',
  'x': 'var(--gap)',
  'fs': 'var(--font-size)',
  'lh': 'var(--line-height)',
  'rp': 'var(--rem-pixel)',
  // global setting
  'wh': 'var(--window-height)',
};

/**
 * Unit conversion for attribute values.
 * @param {String} unit - String for conversion.
 * @returns {string|*}
 */
function convertUnit(unit) {
  if (!unit) return unit;

  return parseAttr(unit, 1).value;
}

function gridUnit(name) {
  const converter = unit(name, { convert: true });

  return (val) => {
    val = val.replace(/[\d]+pr/g, (s) => `minmax(0, ${s.replace('pr', 'fr')})`);

    return converter(val);
  };
}

/**
 * Returns simple unit handler for the attribute.
 * @param {String} name - Attribute name.
 * @param {String} [suffix] - Query suffix for styles.
 * @param {String} [multiplier] - Multiplier option.
 * @param {String} [empty] - Default value if empty value is provided.
 * @param {Boolean|String} [property] - Duplicate style as custom property.
 * @param {Boolean} [convert] - Do unit conversion for value or not.
 * @returns {null|Function}
 */
function unit(name, { suffix, empty, property, convert } = {}) {
  const propertyName = !property
    ? null
    : typeof property === 'boolean'
      ? `--local-${name}`
      : property;
  const propertyUsage = `var(${propertyName})`;

  if (suffix && property) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty) : val || empty;

      return {
        $suffix: suffix,
        [name]: propertyUsage,
        [propertyName]: val,
      };
    };
  } else if (suffix) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty) : val || empty;

      return {
        $suffix: suffix,
        [name]: val,
      };
    };
  } else if (property) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty) : val || empty;

      return {
        [name]: propertyUsage,
        [propertyName]: val,
      };
    };
  }

  return function (val) {
    if (val == null) return null;

    if (!val && !empty) return null;

    val = convert ? convertUnit(val || empty) : val || empty;

    return { [name]: val };
  };
}

const DEFAULT_MIN_SIZE = 'var(--gap)';
const DEFAULT_MAX_SIZE = '100%';

function isSizingSupport(val) {
  return CSS.supports('height', val);
}

const STRETCH = 'stretch';
const FILL_AVAILABLE = 'fill-available';
const WEBKIT_FILL_AVAILABLE = '-webkit-fill-available';
const MOZ_FILL_AVAILABLE = '-moz-fill-available';
const STRETCH_SIZE = isSizingSupport(STRETCH)
  ? STRETCH
  : isSizingSupport(FILL_AVAILABLE)
    ? FILL_AVAILABLE
    : isSizingSupport(WEBKIT_FILL_AVAILABLE)
      ? WEBKIT_FILL_AVAILABLE
      : isSizingSupport(MOZ_FILL_AVAILABLE)
        ? MOZ_FILL_AVAILABLE
        : null;
const INTRINSIC_MODS = ['max-content', 'min-content', 'fit-content', 'stretch'];

/**
 * Returns unit handler for dimensional attributes.
 * @param {String} name - Attribute name.
 * @returns {null|Object}
 */
function dimensionUnit(name) {
  const minStyle = `min-${name}`;
  const maxStyle = `max-${name}`;

  return val => {
    const styles = {
      [name]: 'auto',
      [minStyle]: 'auto',
      [maxStyle]: 'initial',
    };

    const { mods, values } = parseAttr(val, 1);

    transferMods(INTRINSIC_MODS, mods, values);

    values.forEach((v, i) => {
      if (v === 'stretch') {
        values[i] = STRETCH_SIZE || (name === 'height' ? '100vh' : '100vw');
      }
    });

    let flag = false;

    for (let mod of mods) {
      switch (mod) {
        case 'min':
          styles[minStyle] = values[0] || DEFAULT_MIN_SIZE;
          flag = true;
          break;
        case 'max':
          styles[maxStyle] = values[0] || DEFAULT_MAX_SIZE;
          flag = true;
          break;
      }
    }

    if (!flag || !mods.length) {
      if (values.length === 2) {
        styles[minStyle] = values[0];
        styles[maxStyle] = values[1];
      } else if (values.length === 3) {
        styles[minStyle] = values[0];
        styles[name] = values[1];
        styles[maxStyle] = values[2];
      } else {
        styles[name] = values[0] || 'auto';
      }
    }

    return styles;
  };
}

/**
 * Return a parent element that satisfy to provided selector.
 * @param {Element} element
 * @param {String} selector
 * @returns {undefined|Element}
 */
function getParent(element, selector) {
  const elements = [...document.querySelectorAll(selector)];

  while ((element = element.parentNode) && !elements.includes(element)) {
  }

  return element;
}

/**
 * Return a closest element that satisfy to provided selector.
 * @TODO: improve search algorithm.
 * @param {Element} element
 * @param {String} selector
 * @returns {undefined|Element}
 */
function query(element, selector) {
  const origElement = element;

  let prevElement = element;

  const closest = element.closest(selector);

  do {
    if (origElement !== element && closest === element) {
      return closest;
    }

    const found = [...element.querySelectorAll(selector)];

    if (found) {
      if (found.includes(prevElement) && prevElement !== origElement) {
        return prevElement;
      }

      const foundEl = found.find(el => el !== origElement);

      if (foundEl) return foundEl;
    }

    prevElement = element;

    element = element.parentNode || element.host;
  } while (element);
}

/**
 * Return a closest element that has provided id.
 * @param {Element} element
 * @param {String} id
 * @param {Boolean} [includeNames]
 * @returns {undefined|Element}
 */
function queryById(element, id, includeNames) {
  if (id === ':prev') {
    return element.previousElementSibling;
  } else if (id === ':next') {
    return element.nextElementSibling;
  }

  return query(element, `[nu-id="${id}"], [id="${id}"]${includeNames && !id.includes('-') ? `, [nu-${id}]` : ''}`);
}

/**
 * Tell if library run in dev mode.
 * @type {Boolean}
 */
const devMode = (() => {
  try {
    return "development" === 'development';
  } catch (e) {
    return false;
  }
})();

/**
 * Write log to console.
 * @param args
 */
function log(...args) {
  if (devMode) {
    console.log('nude:', ...args);
  }
}

/**
 * Write warning to console
 * @param args
 */
function warn$1(...args) {
  if (devMode) {
    console.warn('nude:', ...args);
  }
}

/**
 * Write error to console.
 * @param args
 */
function error(...args) {
  if (devMode) {
    console.error('nude:', ...args);

    return new Error([...args].join(' '));
  }
}

const ID_MAP = {};

/**
 * Return current id of the element and generate it if it's no presented.
 * @param {Element} element
 * @returns {String}
 */
function generateId(element) {
  if (element.nuIdGenerated) return element.id;

  element.nuIdGenerated = true;

  let name = element.id;

  name = name || element.constructor.nuTag.replace('nu-', '');

  if (name !== 'nu') {
    element.setAttribute('nu-id', name);
  }

  if (!ID_MAP[name]) {
    ID_MAP[name] = 0;
  }

  const id = (ID_MAP[name] += 1);

  element.id = id === 1 && name !== 'nu' ? `${name}` : `${name}--${id}`;

  return element.id;
}

const dim = h('div');

/**
 * Kebab to camel case conversion.
 * @param {String} str
 * @returns {String}
 */
function toCamelCase(str) {
  return str.replace(/-[a-z]/g, s => s.slice(1).toUpperCase());
}

/**
 * Dict of element`s states with their selectors.
 * @type {Object}
 */
const STATES_MAP = {
  // hover: ':hover',
  'focus-within': ':focus-within',
  themed: '[theme]',
  special: '[special]',
  success: '[success]',
  danger: '[danger]',
  warning: '[warning]',
  clear: '[clear]',
  disabled: '[disabled]',
  inline: '[inline]',
  even: ':nth-child(even)',
  odd: ':nth-child(odd)',
  empty: ':empty',
  autofill: ':-webkit-autofill',
  checked: '[is-pressed]',
  selected: '[is-pressed]',
  multiple: '[multiple]',
  // FOCUS_VISIBLE_SUPPORT ? ':focus-visible' : '[is-focus-visible]'
  // Always use polyfill to avoid inconsistency in behavior
  'focus-visible': '[is-focus-visible]',
};
const ROOT_STATES_MAP = {
  dev: '[data-nu-dev]',
  dark: '[data-nu-scheme-is="dark"]',
  light: '[data-nu-scheme-is="light"]',
  'high-contrast': '[data-nu-contrast-is="high"]',
  'low-contrast': '[data-nu-contrast-is="low"]',
};

function getStateSelector(name, isRoot = false) {
  if (name.startsWith('role-')) {
    return `[role="${name.slice(5)}"]`;
  }

  return isRoot ? (ROOT_STATES_MAP[name] || `[data-nu-${name}]`) : (STATES_MAP[name] || `[is-${name}]`);
}

function getCombinations(array) {
  let result = [];
  let f = function (prefix = [], array) {
    for (let i = 0; i < array.length; i++) {
      result.push([...prefix, array[i]]);
      f([...prefix, array[i]], array.slice(i + 1));
    }
  };

  f('', array);

  return result;
}

const CONTEXT_START_MAP = {
  'parent': '[nu]',
  'any': '[nu]',
  'root': ':root',
  'host': USE_SHADOW$1 ? ':host(' : '[is-host]',
};
const CONTEXT_END_MAP = {
  'parent': '>',
  'any': '',
  'root': '',
  'host': USE_SHADOW$1 ? ')' : '',
};

/**
 * Extract state values from single value.
 * Example: color="blue :active[red]"
 * Example output: [{ value: 'blue' }, { $suffix: '[is-active]', value: 'red' }}]
 * @param {String} attrValue
 * @returns {Object[]}
 */
function splitStates(attrValue) {
  const zone = parseAttrStates(attrValue)[0];
  const context = zone.context;
  const isRoot = context === 'root';

  let contextStart, contextEnd;

  if (context) {
    contextStart = CONTEXT_START_MAP[context] || (context.startsWith('#') ? `[nu-id="${context.replace('#', '')}"]` : `[nu-${context}]`);
    contextEnd = CONTEXT_END_MAP[context] || '';
  }

  let baseValue;

  let stateMaps = Object.entries(zone.states)
    .map(([state, value]) => {
      if (!state) {
        baseValue = value;
      }

      if (isTouch && state.match(/hover(?=($|:))/)) return;

      return {
        states: !state ? [] : state.split(':'),
        notStates: [],
        value,
      };
    }).filter(m => m);

  // create mutually exclusive selectors
  for (let i = 0; i < stateMaps.length; i++) {
    for (let j = i + 1; j < stateMaps.length; j++) {
      const map1 = stateMaps[i];
      const map2 = stateMaps[j];

      const diffStates1 = map2.states.filter(s => !map1.states.includes(s));
      const diffStates2 = map1.states.filter(s => !map2.states.includes(s));

      map1.notStates.push(...diffStates1);
      map2.notStates.push(...diffStates2);

      map1.notStates = Array.from(new Set(map1.notStates));
      map2.notStates = Array.from(new Set(map2.notStates));
    }
  }

  // add missing states to fulfill their values
  const allStatesSet = new Set;

  stateMaps.forEach(map => map.states.forEach(state => allStatesSet.add(state)));

  const allStates = Array.from(allStatesSet);

  const allCombinations = getCombinations(allStates).concat([]);

  allCombinations.forEach(states => {
    const notStates = allStates.filter(state => !states.includes(state));

    const similarMap = stateMaps.find((otherMap, j) => {
      return JSON.stringify(otherMap.states.sort()) === JSON.stringify(states.sort())
        && JSON.stringify(otherMap.notStates.sort()) === JSON.stringify(notStates.sort());
    });

    if (similarMap) return;

    stateMaps.push({
      states: [...states],
      notStates: [...notStates],
      value: baseValue,
    });
  });

  stateMaps = stateMaps.map(stateMap => {
    let $prefix, $suffix, $states, value = stateMap.value;

    $states = stateMap.states.map(s => getStateSelector(s, isRoot)).join('')
      + stateMap.notStates.map(s => `:not(${getStateSelector(s, isRoot)})`).join('');

    if (context && (stateMap.states.length || stateMap.notStates.length)) {
      $prefix = `${contextStart}${$states}${contextEnd}`;
    } else {
      $suffix = $states;
    }

    return {
      $prefix,
      $suffix,
      value,
    };
  });

  return stateMaps;
}

/**
 * Calculate the style that needs to be applied based on corresponding attribute.
 * @param {String} name - Attribute name.
 * @param {String} value - Original attribute value.
 * @param {Object} attrs - Map of attribute handlers.
 * @param {Object} defaults - Default values of attributes. (see static getter nuStyles)
 * @returns {String|Object|Array}
 */
function computeStyles(name, value, attrs, defaults) {
  if (value == null) return;

  name = name.replace(/^@/, '--');

  const isProp = name.startsWith('--');

  if (name !== 'before' && name !== 'after') {
    value = value.trim();
  }

  // Style splitter for states system
  if (value.match(/^\^/) || value.includes(':')) {
    // split values between states
    const states = splitStates(value);

    const allStyles = states.reduce((arr, state) => {
      const styles = (computeStyles(name, state.value, attrs, defaults) || []).map(stls => {
        /**
         * @TODO: review that function
         */
        if (state.$suffix) {
          stls.$suffix = `${state.$suffix}${stls.$suffix || ''}`;
        }

        if (state.$prefix) {
          stls.$prefix = `${stls.$prefix || ''}${state.$prefix}`;
        }

        return stls;
      });

      if (styles.length) {
        arr.push(...styles);
      }

      return arr;
    }, []);

    return allStyles;
  }

  const attrValue = isProp ? (val) => {
    return [{
      [name]: parseAttr(val).value,
    }];
  } : attrs[name];

  if (!attrValue) return null;

  switch (typeof attrValue) {
    case 'string':
      return [{ [attrValue]: value ? parseAttr(value, 2).value : 'initial' }];
    case 'function':
      const styles = attrValue(value, defaults);

      if (!styles) return null;

      // normalize to array and clone incoming styles
      return (Array.isArray(styles) ? styles : [styles]).map(stls => {
        return { ...stls };
      });
    default:
      return null;
  }
}

function parseAllValues(value) {
  const zones = parseAttrStates(value);

  return zones
    .reduce((list, zone) => {
      Object.values(zone.states).forEach(val => {
        if (!list.includes(val)) {
          list.push(val);
        }
      });

      return list;
    }, []);
}

function svgElement(svgText) {
  dim.innerHTML = svgText;

  const svgNode = dim.querySelector('svg');

  if (svgNode) {
    dim.removeChild(svgNode);

    return svgNode;
  }
}

const TASKS = [];
const TASK_EVENT = 'nude:task';

function setImmediate(callback) {
  TASKS.push(callback);

  window.postMessage(TASK_EVENT, '*');
}

window.addEventListener('message', function (event) {
  if (event.data !== TASK_EVENT) return;

  for (let task of TASKS) {
    task();
  }

  TASKS.splice(0);
});

function extractMods(val, modList) {
  const arr = val.split(/\s+/g);
  const mods = [];

  const value = arr.filter(mod => {
    if (modList.includes(mod)) {
      mods.push(mod);

      return false;
    }

    return true;
  }).join(' ');

  return { value, mods };
}

function stripCalc(val) {
  val = val.trim();

  val = val.startsWith('calc(') ? val.slice(5, -1) : val;

  return val.replace(/calc\(([^)]+)\)/g, (s, s1) => s1);
}

function extractStyleFuncs(val) {
  return val.split(/\s+(?![^(.]+\))/);
}

function fixPosition(element) {
  element.style.removeProperty('--transform');

  const { x, width } = element.getBoundingClientRect();
  const maxW = window.innerWidth;

  if (x + width > maxW) {
    const offset = -parseInt(x + width - maxW + 1);

    element.style.setProperty('--transform', `translate(${offset}px, 0)`);

    if (!element.hasAttribute('transform')) {
      element.setAttribute('transform', '');
    }
  } else if (x < 0) {
    const offset = -x;

    element.style.setProperty('--transform', `translate(${offset}px, 0)`);

    if (!element.hasAttribute('transform')) {
      element.setAttribute('transform', '');
    }
  }
}

function intersection(arr1, arr2) {
  return arr1.filter(i => arr2.includes(i));
}

function isResponsiveAttr(value) {
  if (!value) return false;

  return value.includes('|');
}

const ATTR_REGEXP = /('[^'|]*')|([a-z]+\()|(#[a-z0-9.-]{2,}(?![a-f0-9\[-]))|(--[a-z0-9-]+|@[a-z0-9-]+)|([a-z][a-z0-9-]*)|(([0-9]+(?![0-9.])|[0-9-.]{2,}|[0-9-]{2,}|[0-9.-]{3,})([a-z%]{0,3}))|([*\/+-])|([()])|(,)/ig;

const ATTR_CACHE = new Map;
const ATTR_CACHE_AUTOCALC = new Map;
const ATTR_CACHE_REM = new Map;
const ATTR_CACHE_IGNORE_COLOR = new Map;
const MAX_CACHE = 10000;
const ATTR_CACHE_MODE_MAP = [
  ATTR_CACHE_AUTOCALC,
  ATTR_CACHE_REM,
  ATTR_CACHE,
  ATTR_CACHE_IGNORE_COLOR,
];

const IGNORE_MODS = ['auto', 'max-content', 'min-content', 'none', 'subgrid', 'initial'];
const PREPARE_REGEXP = /calc\((\d*)\)/ig;
const CUSTOM_PROPS_REGEX = /(^|var\(|)--([a-z0-9-]+)/ig;
const COLOR_FUNCS = ['rgb', 'rgba', 'hsl', 'hsla'];

const CUSTOM_FUNCS = {};

let CUSTOM_FUNCS_REGEX;

function convertCustomProperties(val) {
  return val
    .replace(/@\(/, 'var(')
    .replace(/@[a-z0-9-]+/g, s => `var(--${s.slice(1)})`)
    .replace(CUSTOM_PROPS_REGEX, (s, s1, s2) => s1 === 'var(' ? s : `${s1}var(--${s2})`);
}

function convertCustomFuncs(str, options) {
  if (!CUSTOM_FUNCS_REGEX) {
    const customFuncs = Object.keys(CUSTOM_FUNCS);

    if (customFuncs.length) {
      CUSTOM_FUNCS_REGEX = new RegExp(`(^|[\\s])(${customFuncs.join('|')})\\(([^)]+)\\)`, 'g');
    } else {
      CUSTOM_FUNCS_REGEX = true; // ignore
    }
  }

  return CUSTOM_FUNCS_REGEX === true ? str : str.replace(CUSTOM_FUNCS_REGEX, (s, s1, s2, s3) => `${s1}${CUSTOM_FUNCS[s2](s3, options)}`);
}

function prepareParsedValue(val) {
  return val.trim().replace(PREPARE_REGEXP, (s, inner) => inner);
}

/**
 *
 * @param {String} value
 * @param {Number} mode
 * @returns {Object<String,String|Array>}
 */
function parseAttr(value, mode = 0) {
  const CACHE = ATTR_CACHE_MODE_MAP[mode];

  if (!CACHE.has(value)) {
    if (CACHE.size > MAX_CACHE) {
      CACHE.clear();
    }

    const mods = [];
    const all = [];
    const values = [];
    const insertRem = mode === 1;
    const autoCalc = mode !== 2;

    let currentValue = '';
    let calc = -1;
    let counter = 0;
    let parsedValue = '';
    let color = '';
    let currentFunc = '';
    let usedFunc = '';
    let token;

    ATTR_REGEXP.lastIndex = 0;

    value = convertCustomFuncs(value, { explicitColor: true });
    value = value.replace(/@\(/g, 'var(--');

    while (token = ATTR_REGEXP.exec(value)) {
      let [s, quoted, func, hashColor, prop, mod, unit, unitVal, unitMetric, operator, bracket, comma] = token; // lgtm [js/unused-local-variable]

      if (quoted) {
        currentValue += `${quoted} `;
      } else if (func) {
        currentFunc = func.slice(0, -1);
        currentValue += func;
        counter++;
      } else if (hashColor) {
        // currentValue += `${hashColor} `;
        if (mode === 3) {
          color = hashColor;
        } else {
          color = parseColor(hashColor, false, true).color;
        }
      } else if (mod) {
        // ignore mods inside brackets
        if (counter || IGNORE_MODS.includes(mod)) {
          currentValue += `${mod} `;
        } else {
          mods.push(mod);
          all.push(mod);
          parsedValue += `${mod} `;
        }
      } else if (bracket) {
        if (bracket === '(') {
          if (!~calc) {
            calc = counter;
            currentValue += 'calc';
          }

          counter++;
        }

        if (bracket === ')' && counter) {
          currentValue = currentValue.trim();

          if (counter > 0) {
            counter--;
          }

          if (counter === calc) {
            calc = -1;
          }
        }

        if (bracket === ')' && !counter) {
          usedFunc = currentFunc;
          currentFunc = '';
        }

        currentValue += `${bracket}${bracket === ')' ? ' ' : ''}`;
      } else if (operator) {
        if (!~calc && autoCalc) {
          if (currentValue) {
            if (currentValue.includes('(')) {
              const index = currentValue.lastIndexOf('(');

              currentValue = `${currentValue.slice(0, index)}(calc(${currentValue.slice(index + 1)}`;

              calc = counter;
              counter++;
            }
          } else if (values.length) {
            parsedValue = parsedValue.slice(0, parsedValue.length - values[values.length - 1].length - 1);

            let tmp = values.splice(values.length - 1, 1)[0];

            all.splice(values.length - 1, 1);

            if (tmp) {
              if (tmp.startsWith('calc(')) {
                tmp = tmp.slice(4);
              }

              calc = counter;
              counter++;
              currentValue = `calc((${tmp}) `;
            }
          }
        }

        currentValue += `${operator} `;
      } else if (unit) {
        if (unitMetric && CUSTOM_UNITS[unitMetric]) {
          let add = customUnit(unitVal, unitMetric);

          if (!~calc && add.startsWith('(')) {
            currentValue += 'calc';
          }

          currentValue += `${add} `;
        } else if (insertRem && !unitMetric && !counter) {
          currentValue += `${unit}rem `;
        } else {
          currentValue += `${unit} `;
        }
      } else if (prop) {
        prop = prop.replace('@', '--');
        if (currentFunc !== 'var') {
          currentValue += `var(${prop}) `;
        } else {
          currentValue += `${prop} `;
        }
      } else if (comma) {
        if (~calc) {
          calc = -1;
          counter--;
          currentValue = `${currentValue.trim()}), `;
        } else {
          currentValue = `${currentValue.trim()}, `;
        }
      }

      if (currentValue && !counter) {
        let prepared = prepareParsedValue(currentValue);

        if (COLOR_FUNCS.includes(usedFunc)) {
          color = prepared;
        } else if (prepared.startsWith('color(')) {
          prepared = prepared.slice(6, -1);

          color = parseColor(prepared).color;
        } else {
          if (prepared !== ',') {
            values.push(prepared);
            all.push(prepared);
          }

          parsedValue += `${prepared} `;
        }

        currentValue = '';
      }
    }

    if (counter) {
      let prepared = prepareParsedValue(`${currentValue.trim()}${')'.repeat(counter)}`);

      if (prepared.startsWith('color(')) {
        prepared = prepared.slice(6, -1);

        color = parseColor(prepared).color;
      } else {
        if (prepared !== ',') {
          values.push(prepared);
          all.push(prepared);
        }

        parsedValue += prepared;
      }
    }

    CACHE.set(value, {
      values,
      mods,
      all,
      value: `${parsedValue} ${color}`.trim(),
      color,
    });
  }

  return CACHE.get(value);
}

function filterMods(mods, allowedMods) {
  return mods.filter(mod => allowedMods.includes(mod));
}

// const STATE_TYPE_REGEXP = /\[[^\]]*\|/;
const STATE_REGEXP = /(\|)|(\[)|(])|(\^((#|)[a-z][a-z0-9-]*|))|:([a-z0-9:.-]+)(?=\[)|('[^']*'|[(@#a-z0-9,.-][^'\]\[|:]*(?!:))/gi;

function requireZone(zones, index, parent = '') {
  while (zones[index] == null) {
    const prevZone = zones[index - 1];

    if (prevZone && !zones[index - 1].touched) {
      const prevPrevZone = zones[index - 2];

      if (prevPrevZone) {
        zones[index - 1] = { ...prevPrevZone, states: { ...prevPrevZone.states } };
      }
    }

    zones.push({
      parent,
      states: {
        '': '', // base state is always presented
      },
      touched: false,
    });
  }

  return zones[index];
}

/**
 * Parse state information from raw attribute value.
 * @param val
 * @returns {[]}
 */
function parseAttrStates(val) {
  let currentState = '';
  let zones = [];
  let zoneIndex = 0;
  let stateZoneIndex = 0;
  let opened = false;
  let responsiveState = false;
  let zone;
  let currentContext;
  let token;
  let orOperator = false;

  STATE_REGEXP.lastIndex = 0;

  function requireState() {
    if (!zone.states[currentState]) {
      zone.states[currentState] = '';
    }
  }

  while (token = STATE_REGEXP.exec(val)) {
    let [s, delimiter, open, close, rawContext, context, hash, state, value] = token; // lgtm [js/unused-local-variable]

    zone = requireZone(zones, zoneIndex);
    currentContext = zone.context;

    if (opened) {
      if (responsiveState) {
        zone = requireZone(zones, stateZoneIndex, currentContext);
      } else {
        zone = requireZone(zones, zoneIndex, currentContext);
      }
    }

    if (rawContext) {
      zone.context = context || 'parent';
      zone.rawContext = rawContext;
      zone.touched = true;
    } else if (delimiter) {
      if (opened) {
        if (zoneIndex) {
          warn$1('incorrect state', JSON.stringify(val));
        }

        responsiveState = true;
        stateZoneIndex++;
      } else {
        zoneIndex++;
      }
    } else if (open) {
      opened = true;

      requireState();
    } else if (close) {
      opened = false;

      currentState = '';
      stateZoneIndex = 0;

      requireState();
    } else if (state) {
      currentState = state;

      if (state.includes('.')) {
        orOperator = true;
      }

      requireState();
    } else if (value) {
      if (zone.states[currentState]) {
        zone.states[currentState] = `${zone.states[currentState]}${value}`.trim();
      } else {
        zone.states[currentState] = value.trim();
      }
      zone.touched = true;
    }
  }

  if (orOperator) {
    zones.forEach((zone) => {
      Object.entries(zone.states)
        .forEach(([state, value]) => {
          if (!state.includes('.')) return;

          const combinations = getCombinations(state.split('.'));

          combinations.forEach((comb) => {
            const state = comb.join(':');

            if (zone.states[state] == null) {
              zone.states[state] = value;
            }
          });

          delete zone.states[state];
        });
    });
  }

  // restore responsive values
  // zones.forEach((zone, zoneIndex) => {
  //   if (!zoneIndex) return;
  //
  //   Object.entries(zone.states).forEach(([state, value]) => {
  //     const prevZone = zones[zoneIndex - 1];
  //
  //     if (!value && prevZone && prevZone.states[state] != null) {
  //       zone.states[state] = prevZone.states[state];
  //     }
  //   });
  // });

  return zones;
}

function normalizeAttrStates(val, firstValueOnly = false) {
  let zones = Array.isArray(val) ? val : parseAttrStates(val);

  if (firstValueOnly) {
    zones = zones.slice(0, 1);
  }

  return zones.map((zone, zoneIndex) => {
    return `${zone.rawContext || ''} ${
      Object.entries(zone.states).map(([state, value]) => {
        if (state) {
          value = `:${state}[${value}]`;
        } else if (!value && zoneIndex) {
          value = zones[zoneIndex - 1].states[''];
        }

        return value;
      }).join(' ')
    }`.trim();
  }).join('|');
}

function getFloatFromAttr(value, defaultValue = 0) {
  let num = parseFloat(value);

  if (num == null || num !== num) num = defaultValue;

  return num;
}

function getTwoFloatsFromAttr(value, defaultValue = 0) {
  if (!value) return [defaultValue, defaultValue];

  value = value.trim().split(/\s+/);

  return [
    getFloatFromAttr(value[0], defaultValue),
    getFloatFromAttr(value[1] || value[0], defaultValue),
  ];
}

function setBoolAttr(el, name, val) {
  if (val != null && val !== false) {
    el.setAttribute(name, '');
  } else {
    el.removeAttribute(name);
  }
}

function setAttr(el, name, value) {
  if (value != null && value !== false) {
    el.setAttribute(name, value === true ? '' : value);
  } else {
    el.removeAttribute(name);
  }
}

const COLOR_NAME_LIST = [
  'text',
  'bg',
  'border',
  'mark',
  'outline',
  'subtle',
  'text-soft',
  'text-strong',
  'shadow',
  'special',
  'special-text',
  'special-bg',
  'special-shadow',
  'dark',
  'light',
  'input',
  'diff', // additional
  'local', // additional
  'inherit', // inherit color from parent
  'current', // current color
];

/**
 *
 * @param {String} val
 * @param {Boolean} ignoreError
 * @param {Boolean} [shortSyntax]
 * @return {{color}|{color: string, name: *, opacity: *}|{}|{color: string, name: string, opacity: (number|number)}|{color: string, name: *}}
 */
function parseColor(val, ignoreError = false, shortSyntax = false) {
  val = val.trim();

  if (!val) return {};

  if (val.startsWith('#')) {
    val = val.slice(1);

    const tmp = val.split('.');

    let opacity = 100;

    if (tmp.length > 0) {
      opacity = Number(tmp[1]);

      if (opacity !== opacity) {
        opacity = 100;
      }
    }

    const name = tmp[0];

    let color;

    if (name === 'current') {
      color = 'currentColor';
    } else {
      if (opacity > 100) {
        opacity = 100;
      } else if (opacity < 0) {
        opacity = 0;
      }

      color = opacity !== 100
        ? rgbColorProp(name, Math.round(opacity) / 100)
        : colorProp(name, null, strToRgb(`#${name}`));
    }

    return {
      color,
      name,
      opacity: opacity != null ? opacity : 100,
    };
  }

  let { values, mods, color } = parseAttr(val, 0);

  let name, opacity;

  if (color) {
    return { color: (!color.startsWith('var(') ? strToRgb(color) : color) || color };
  }

  values.forEach(token => {
    if (token.match(/^((var|rgb|rgba|hsl|hsla)\(|#[0-9a-f]{3,6})/)) {
      color = !token.startsWith('var') ? strToRgb(token) : token;
    } else if (token.endsWith('%')) {
      opacity = parseInt(token);
    }
  });

  mods.forEach(mod => {
    if (COLOR_NAME_LIST.includes(mod)) {
      name = mod;
    } else if (mod === 'transparent' || mod === 'clear') {
      color = 'transparent';
    }
  });

  if (color) {
    return { color };
  }

  name = name || mods[0];

  if (!name) {
    if (!ignoreError && devMode) {
      warn$1('incorrect color value:', val);
    }

    return {};
  }

  if (!opacity) {
    let color;

    if (name === 'current') {
      color = 'currentColor';
    } else if (name === 'inherit') {
      color = 'inherit';
    } else {
      color = `var(--${name}-color)`;
    }

    return {
      name,
      color,
    };
  }

  return {
    color: rgbColorProp(name, Math.round(opacity) / 100),
    name,
    opacity,
  };
}

function isDefined(tag) {
  return !!customElements.get(tag);
}

/**
 * Reset scroll on the element.
 * @param el {NuElement}
 * @param affectChildren
 */
function resetScroll(el, affectChildren = false) {
  if (el.scrollTop) {
    el.scrollTop = 0;
  }

  if (el.scrollLeft) {
    el.scrollLeft = 0;
  }

  if (affectChildren) {
    [...deepQueryAll(el, '[overflow]')]
      .forEach(resetScroll);
  }
}

function deepQuery(element, selector) {
  if (element.nuShadow) {
    const shadowEl = deepQuery(element.nuShadow, selector);

    if (shadowEl) {
      return shadowEl;
    }
  }

  const el = element.querySelector(selector);

  if (el) return el;

  let foundEl;

  return [...element.querySelectorAll('[shadow-root]')]
    .find(shadowEl => {
      const root = shadowEl.nuShadow;

      foundEl = deepQuery(root, selector);

      return root && foundEl;
    }) && foundEl;
}

function deepQueryAll(element, selector) {
  const found = [];

  if (element.nuShadow) {
    found.push(...deepQueryAll(element.nuShadow, selector));
  }

  found.push(...element.querySelectorAll(selector));

  [...element.querySelectorAll('[shadow-root]')]
    .forEach(shadowEl => {
      const root = shadowEl.nuShadow;

      if (root) {
        found.push(...deepQueryAll(root, selector));
      }
    });

  return found;
}

function queryChildren(element, selector) {
  const children = [...element.querySelectorAll(selector)];

  return children.filter(el => el.parentNode === element);
}

function isValidDate(date) {
  return !date || !date.getTime || !isNan(date.getTime());
}

function isNan(val) {
  return val !== val;
}

function requestIdleCallback(cb) {
  const ric = window.requestIdleCallback;

  return ric
    ? ric(cb)
    : setTimeout(cb, 100);
}

function asyncDebounce(cb, context) {
  const timers = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (timers[key]) {
      return;
    }

    cb.apply(context, args);

    timers[key] = setTimeout(() => {
      delete timers[key];
    }, 0);
  };
}

function h(tag) {
  return document.createElement(tag);
}

function extractModule(promise) {
  return promise.then(module => module.default || module);
}

// export function debugProp(instance, prop) {
//   Object.assign(instance, {
//     set [prop](val) {
//       try {
//         throw '';
//       } catch (e) {
//         console.error('prop changed', instance, {
//           [prop]: value,
//         });
//       }
//
//       this[`_${prop}`] = val;
//     },
//     get [prop]() {
//       return this[`_${prop}`];
//     }
//   });
// }

const NO_VALUES = ['n', 'no', 'false'];
const YES_VALUES = ['y', 'yes', 'true'];

/**
 * Check for "no" value.
 * @param {string} value - original attribute value.
 * @return {boolean}
 */
function isNoValue(value) {
  return NO_VALUES.includes(value);
}

/**
 * Check for "yes" value.
 * @param {string} value - original attribute value.
 * @return {boolean}
 */
function isYesValue(value) {
  return YES_VALUES && YES_VALUES.includes(value);
}

/**
 * Check for "no" value in modifiers.
 * @param mods {Array<String>} - original attribute value.
 * @return {boolean}
 */
function hasNegativeMod(mods) {
  return mods != null && !!NO_VALUES.find(val => mods.includes(val));
}

/**
 * Set timeout based on local transition time.
 * @param host {NuElement}
 * @param cb {Function}
 * @param [transitionName] {String} - Prop name of transition time.
 */
function setTransitionTimeout(host, cb, transitionName) {
  const style = getComputedStyle(host);
  const styleValue = (transitionName && style.getPropertyValue(`--${transitionName}`).trim()) || style.getPropertyValue('--transition').trim();
  const transition = style.transition;
  const time = transition !== DISABLED_TRANSITION ? parseTime(styleValue) : 0;

  if (!time) {
    cb();
  } else {
    setTimeout(() => {
      setTimeout(cb, time);
    }, 0);
  }
}

/**
 * Parse time in milliseconds from style value.
 * @param value {String}
 * @return {Number}
 */
function parseTime(value) {
  const multiplier = value.match(/\ds$/) ? 1000 : 1;
  return parseFloat(value) * multiplier;
}

function getRealHeight(el) {
  Object.assign(el.style, {
    position: 'absolute',
    height: 'initial',
    maxHeight: 'initial',
  });

  const height = el.offsetHeight;

  Object.assign(el.style, {
    position: '',
    height: '',
    maxHeight: '',
  });

  return height;
}

function getType(value) {
  if (typeof value === 'boolean') {
    return 'bool';
  } else if (typeof value === 'string') {
    return 'text';
  } else if (typeof value === 'number') {
    return 'num';
  } else if (value instanceof Date) {
    return 'date';
  } else if (Array.isArray(value) && value[0] instanceof Date && value[1] instanceof Date) {
    return 'daterange';
  }
}

function isEqual(val1, val2) {
  const type1 = getType(val1);
  const type2 = getType(val2);

  if (type1 !== type2) {
    return false;
  } else if (type1 === 'date') {
    return val1.getTime() === val2.getTime();
  } else if (type1 === 'daterange') {
    return val1[0].getTime() === val2[0].getTime()
      && val1[1].getTime() === val2[1].getTime();
  } else {
    return val1 === val2;
  }
}

// @see https://stackoverflow.com/questions/45408920/plain-javascript-scrollintoview-inside-div
function scrollParentToChild(parent, child) {
  // Where is the parent on page
  const parentRect = parent.getBoundingClientRect();
  // What can you see?
  const parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth
  };

  // Where is the child
  const childRect = child.getBoundingClientRect();
  // Is the child viewable?
  const isViewable = (childRect.top >= parentRect.top) && (childRect.top <= parentRect.top + parentViewableArea.height - childRect.height);

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // scroll by offset relative to parent
    parent.scrollTop = (childRect.top + parent.scrollTop) - parentRect.top - (parentRect.height / 2) + (childRect.height / 2);
  }
}

function isFocusable(el) {
  const tabindex = el.getAttribute('tabindex');

  return tabindex && !el.hasAttribute('disabled');
}

/**
 * Set ARIA reference to other elements.
 * @param el
 * @param attr {String}
 * @param [value] {String}
 */
function setAriaRef(el, attr, value) {
  value = value || el.getAttribute(attr) || '';

  const innerRef = getInnerRef(el, attr);

  if (innerRef) {
    value = `${innerRef} ${value}`;
  }

  log('set aria ref', attr, value, innerRef);

  const ariaValue = value.split(/\s+/g).map((id) => {
    let link;

    link = queryById(el, id, true);

    if (!link) return '';

    return generateId(link);
  }).join(' ');

  if (ariaValue.trim()) {
    setAria(el, attr, ariaValue);
  }
}

function getInnerRef(el, name) {
  return el.nuRefs && el.nuRefs[name];
}

/**
 * Set inner ref.
 * @param el
 * @param name {String}
 * @param value {String}
 */
function setInnerRef(el, name, value) {
  if (!el.nuRefs) {
    el.nuRefs = {};
  }

  el.nuRefs[name] = value;
}

function removeInnerRef(el, name) {
  if (el.nuRefs) {
    delete el.nuRefs[name];
  }
}

/**
 * Set aria attribute.
 * @param el
 * @param {String} name
 * @param {Boolean|String|Number} value
 */
function setAria(el, name, value) {
  if (typeof value === 'boolean') {
    value = value ? 'true' : 'false';
  }

  if (value == null) {
    (el.nuRef || el).removeAttribute(`aria-${name}`);
  } else {
    (el.nuRef || el).setAttribute(`aria-${name}`, value);
  }
}

const POINT_REGEX = /([\d.]+)/;

/**
 * Decrease responsive point value.
 * @param {String} val
 * @return {String}
 */
function decPoint(val) {
  return val.replace(POINT_REGEX, (num) => `${Number(num) - 0.01}`);
}

const PARAMS_REGEXP = /(-|)([a-z][a-z0-9-]*|#[a-z0-9-.]+)(\((.*?)\)|)(?=(\s|$))/g;

/**
 * Parse params from string like: `param1 param2()`
 * It is used in behaviors and [text] style.
 * @param {String} value - string to parse
 * @param {Object} params - default params. MUTABLE!
 * @return {Object}
 */
function parseParams(value, params = {}) {
  let token;

  while (token = PARAMS_REGEXP.exec(value)) {
    let [s, disable, param, s2, value] = token; // lgtm [js/unused-local-variable]

    if (param.startsWith('#')) {
      params.color = parseColor(param, false, true).color;

      continue;
    }

    param = toCamelCase(param);

    if (disable) {
      delete params[param];
    } else {
      if (isYesValue(value)) {
        value = true;
      } else if (isNoValue(value)) {
        value = false;
      }

      params[param] = value != null ? value : true;
    }
  }

  return params;
}

function customUnit(value, unit) {
  const converter = CUSTOM_UNITS[unit];

  if (typeof converter === 'function') {
    return converter(value);
  }

  if (value === '1' || value === 1) {
    return converter;
  }

  return `(${value} * ${converter})`;
}

function transferMods(mods, from, to) {
  mods.forEach(mod => {
    if (from.includes(mod)) {
      to.push(mod);
      from.splice(from.indexOf(mod), 1);
    }
  });
}

function roundNumToFixed(num, fix = 0) {
  num = Number(num);

  if (isNan(num)) return num;

  return Number(Number(num).toFixed(fix));
}

const ROOT = document.querySelector(':root');

const DARK = 'dark';
const LIGHT = 'light';
const MORE = 'more';
const NORMAL = 'no-preference';
const SCHEMES = [DARK, LIGHT];
const CONTRASTS = [MORE, NORMAL];

function observeContext(data) {
  if (data.find(record => !record.attributeName.endsWith('-is'))) {
    setLocale();
    setOutline();
    setScheme();
    setContrast();
  }
}

const CONTEXT = {
  $shadowRoot: null,
  $parentShadowRoot: null,
};

function setLocale() {
  const value = ROOT.getAttribute('lang') || navigator.language || navigator.languages[0] || 'en';

  setRootContext('locale', value);
}

const schemeMedia = matchMedia('(prefers-color-scheme: dark)');
const contrastMedia = matchMedia('(prefers-contrast: more)');

let globalScheme = schemeMedia.matches ? DARK : LIGHT;
let globalContrast = contrastMedia.matches ? MORE : NORMAL;

function addMediaListener(media, listener) {
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', listener);
  } else if (typeof media.addListener === 'function') {
    media.addListener(listener);
  }
}

addMediaListener(schemeMedia, (_media) => {
  globalScheme = _media.matches ? DARK : LIGHT;

  setScheme();
});

addMediaListener(contrastMedia, (_media) => {
  globalContrast = _media.matches ? MORE : NORMAL;

  setContrast();
});

function setScheme() {
  const setting = ROOT.dataset.nuScheme;

  ROOT.dataset.nuSchemeIs = (setting !== 'auto' && SCHEMES.includes(setting) && setting)
    || globalScheme;
}

function setContrast() {
  const setting = ROOT.dataset.nuContrast;

  ROOT.dataset.nuContrastIs = (setting !== 'auto' && CONTRASTS.includes(setting) && setting)
    || globalContrast;
}

// let outlineStyleTag;

function setOutline() {
  // if (outlineStyleTag && outlineStyleTag.parentNode) {
  //   outlineStyleTag.parentNode.removeChild(outlineStyleTag);
  // }

  const showOutline = ROOT.dataset.nuOutline != null;

  if (showOutline) {
    deepQueryAll(ROOT, '[is-host]')
      .forEach(host => {
        host.nuSetMod('outline', showOutline);
      });
  }

  setRootContext('outline', showOutline);
}

function setRootContext(name, value) {
  if (value == null) {
    if (!(name in CONTEXT)) return;

    delete CONTEXT[name];
  } else {
    if (JSON.stringify(CONTEXT[name]) === JSON.stringify(value)) return;

    CONTEXT[name] = value;
  }

  verifyRoot(name);
}

const verifyRoot = asyncDebounce((name) => {
  log('root context verification');

  requestIdleCallback(() => {
    deepQueryAll(ROOT, '[nu]')
      .forEach(el => el.nuContextChanged(name));
  });
});

function initContext() {
  setLocale();
  setOutline();
  setScheme();
  setContrast();

  const observer = new MutationObserver((data) => observeContext(data));

  observer.observe(ROOT, {
    characterData: false,
    attributes: true,
    childList: false,
    subtree: false
  });
}

const SCROLLBAR_SUPPORT = CSS.supports('scrollbar-width', 'thin');

function scrollbarAttr(val) {
  if (val == null) return null;

  if (val === 'none'.slice(0, Math.max(val.length, 1))) {
    return [{
      $suffix: '::-webkit-scrollbar',
      display: 'none',
    }].concat(SCROLLBAR_SUPPORT ? [{
      'scrollbar-width': 'none',
    }] : []);
  }

  return [
    {
      $suffix: ':not([special])',
      '--local-scrollbar-thumb-color': 'var(--scrollbar-thumb-color, rgba(var(--text-color-rgb), .5))',
      '--local-scrollbar-border-color': 'var(--scrollbar-border-color, var(--border-width))',
      '--local-scrollbar-bg-color': 'var(--scrollbar-bg-color, var(--diff-color, var(--local-bg-color)))',
    },
    {
      $suffix: '[special]',
      '--local-scrollbar-thumb-color': 'var(--scrollbar-thumb-color, rgba(var(--white-color-rgb), .6))',
      '--local-scrollbar-border-color': 'var(--scrollbar-border-color, rgba(var(--dark-color-rgb), .8))',
      '--local-scrollbar-bg-color': 'var(--scrollbar-bg-color, var(--dark-color))',
    },
    {
      $suffix: '::-webkit-scrollbar',
      width: 'var(--gap)',
      height: 'var(--gap)',
    },
    {
      $suffix: '::-webkit-scrollbar-track',
      'background-color': 'var(--local-scrollbar-bg-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-thumb',
      'background-color': 'var(--local-scrollbar-thumb-color)',
      'border-radius': 'var(--radius)',
      border: 'var(--border-width) solid var(--local-scrollbar-border-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-corner',
      'background-color': 'transparent',
    }
  ].concat(SCROLLBAR_SUPPORT ? [{
    'scrollbar-width': 'thin',
    'scrollbar-color': 'var(--local-scrollbar-bg-color) var(--local-scrollbar-thumb-color)',
  }] : []);
}

const DATASET = ROOT.dataset;
const SCHEME_OPTIONS = ['auto', 'light', 'dark'];
const CONTRAST_OPTIONS = ['auto', 'no-preference', 'more'];
const ICONS_OPTIONS = ['feather', 'eva', 'ion', 'no'];
const BEHAVIORS_OPTIONS = ['auto', 'no', 'manual'];

const preventInit = DATASET.nuPrevent != null;
const behaviorOption = BEHAVIORS_OPTIONS.includes(DATASET.nuBehaviors)
  ? DATASET.nuBehaviors
  : 'auto';

function scheme(val) {
  let currentScheme = DATASET.nuScheme || 'auto';

  if (!SCHEME_OPTIONS.includes(currentScheme)) {
    currentScheme = 'auto';
  }

  if (val == null) {
    return currentScheme;
  }

  if (SCHEME_OPTIONS.includes(val)) {
    DATASET.nuScheme = val;
  }
}

function contrast (val) {
  let currentContrast = DATASET.nuContrast || 'auto';

  if (!CONTRAST_OPTIONS.includes(currentContrast)) {
    currentContrast = 'auto';
  }

  if (val == null) {
    return currentContrast;
  }

  if (CONTRAST_OPTIONS.includes(val)) {
    DATASET.nuContrast = val;
  }
}

function reduceMotion(bool) {
  if (bool == null) return DATASET.nuReduceMotion != null;

  if (bool) {
    DATASET.nuReduceMotion = '';
  } else {
    delete DATASET.nuReduceMotion;
  }
}

const USE_SHADOW = isYesValue(DATASET.nuShadow);
const USE_HIDDEN_STYLES = DATASET.nuStyles === 'hidden';
const ICONS_PROVIDER = ICONS_OPTIONS.includes(DATASET.nuIcons) ? DATASET.nuIcons : 'ion';
const SCROLLBAR = DATASET.nuScrollbar != null;

setRootContext('scheme', scheme());
setRootContext('contrast', contrast());
setRootContext('reduceMotion', scheme());
setRootContext('allowShadow', USE_SHADOW);
setRootContext('iconsProvider', ICONS_PROVIDER);

if (!reduceMotion()) {
  reduceMotion(true);

  requestIdleCallback(() => {
    reduceMotion(false);
  });
}

if (devMode) {
  DATASET.nuDev = '';
}

/**
 * Workaround over non-consistent 100vh value on mobile devices.
 */
function setWindowHeight() {
  ROOT.style.setProperty('--window-height', `${window.innerHeight / 100}px`);
}

window.addEventListener('resize', setWindowHeight, { passive: true });

setWindowHeight();

const STYLE_MAP$1 = {};
const HEAD = document.head;
const STYLE = h$1('style');
const RULE_SETS = {};

STYLE.dataset.numl = '';

HEAD.appendChild(STYLE);

const SHEET = STYLE.sheet;

// [...document.querySelectorAll('style[data-nu-name]')]
//   .forEach(element => {
//     const name = element.dataset.nuName.replace(/&quot;/g, '"');
//
//     if (!name.includes('#')) {
//       STYLE_MAP[name] = {
//         element: element,
//         css: element.textContent,
//         selector: name,
//       };
//     }
//   });

function getRootNode(root) {
  return root || HEAD;
}

function getSheet(root) {
  if (!root) return SHEET;

  if (root.nuSheet) {
    return root.nuSheet;
  }

  const style = h$1('style');

  root.appendChild(style);

  style.dataset.numl = '';

  root.nuSheet = style.sheet;

  return root.nuSheet;
}

/**
 * Insert a set of rules into style sheet.
 * @param {String} css
 * @param {CSSStyleSheet} sheet
 * @param {String} id
 * @return {CSSRule}
 */
function insertRule(css, sheet, id) {
  css = css || '';

  if (devMode) {
    css = beautifyCSS(css);
  }

  const index = sheet.insertRule(css);
  const rule = sheet.cssRules[index];

  if (id) {
    rule.nuId = id;
  }

  return rule;
}

/**
 * Insert CSS Rule Set.
 * @param {String} id
 * @param {Array<String>} arr
 * @param {Undefined|ShadowRoot} [root]
 * @param {Boolean} [force]
 */
function insertRuleSet(id, arr, root, force = false) {
  if (id && hasRuleSet(id, root)) {
    if (force) {
      removeRuleSet(id, root);
    } else {
      return;
    }
  }

  const ruleMap = getRuleMap(root);

  const ruleSet = ruleMap[id] = {
    raw: arr,
    rules: [],
  };

  if (!root) {
    RULE_SETS[id] = ruleSet;
  }

  if (USE_HIDDEN_STYLES) {
    const sheet = getSheet(root);

    for (let i = 0; i < arr.length; i++) {
      const rule = arr[i];

      const cssRule = insertRule(rule, sheet, id);

      ruleSet.rules.push(cssRule);
    }
  } else {
    const rootNode = getRootNode(root);
    const style = h$1('style');

    style.dataset.numl = id || '';

    ruleSet.element = style;

    style.appendChild(document.createTextNode(arr.join('\n')));

    rootNode.appendChild(style);
  }
}

function removeRuleSet(id, root) {
  const ruleMap = getRuleMap(root);

  if (USE_HIDDEN_STYLES) {
    const sheet = getSheet(root);

    while (removeRule(id, sheet)) {}
  } else {
    const ruleSet = ruleMap[id];

    if (ruleSet) {
      const element = ruleSet.element;

      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }


  if (!root) {
    delete ruleMap[name];
  }
}

/**
 * Remove the CSS rule from a style sheet.
 * @param {String} id
 * @param {CSSStyleSheet} sheet
 * @return {boolean}
 */
function removeRule(id, sheet) {
  const rules = sheet.cssRules;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule.nuId === id) {
      sheet.deleteRule(i);
      return true;
    }
  }

  return false;
}

function attrsQuery(attrs) {
  return Object.keys(attrs)
    .reduce((query, attr) => {
      const val = attrs[attr];

      return `${query}${val != null ? `[${attr}="${val}"]` : `:not([${attr}])`}`
    }, '');
}

function stylesString(styles) {
  if (devMode) {
    Object.keys(styles)
      .forEach(style => {
        if (style.startsWith('$')) return;
        if (!styles[style]) return;

        const value = String(styles[style]);

        if (value
          && !style.startsWith('-')
          && !CSS.supports(style, value.replace('!important', ''))
          && !value.endsWith('-reverse')) {
          warn$1('unsupported style detected:', `{ ${style}: ${value}; }`);
        }
      });
  }

  return Object.keys(styles)
    .reduce((string, style) => !style.startsWith('$') ? `${string}${styles[style] ? `${style}:${styles[style]}` : ''};` : string, '');
}

function generateCSS(query, styles, universal = false) {
  if (!styles || !styles.length) return [];

  const isHost = query.startsWith(':host');

  if (isHost) {
    query = query.replace(':host', '');
  }

  return styles.reduce((arr, map) => {
    let queries = [query];

    const $prefix = map.$prefix;
    const $suffix = map.$suffix;

    if (isHost && ($prefix || !$suffix)) return arr;

    // multiple suffixes and prefixes
    [$suffix, $prefix]
      .forEach((add, addIndex) => {
        if (!add) return;

        const multiple = ~add.indexOf(',');
        const list = multiple && add.split(',');
        [...queries].forEach((query, queryIndex) => {
          if (multiple) {
            queries[queryIndex] = addIndex ? `${list[0]} ${query}` : `${query}${list[0]}`;

            list.forEach((ad, adIndex) => {
              if (adIndex) { // skip first suffix
                queries.push(addIndex ? `${ad} ${query}` : `${query}${ad}`);
              }
            });
          } else {
            queries[queryIndex] = addIndex ? `${add} ${query}` : `${query}${add}`;
          }
        });
      });

    if (isHost) {
      for (let i = 0; i < queries.length; i++) {
        const qry = queries[i];

        if (!qry) continue;

        if (qry.includes('>')) {
          const tmp = qry.split('>');

          queries[i] = `:host(${tmp[0].trim()})>${tmp[1]}`;
        } else {
          queries[i] = `:host(${qry})`;
        }
      }
    }

    if (universal) {
      arr.push(`${queries.join(',')}{${stylesString(map)}}`);

      return arr;
    }

    const css = queries.length ? `${queries.join(',')}{${stylesString(map)}}` : '';

    if (css) {
      arr.push(css);
    }

    return arr;
  }, []);
}

/**
 * Remove CSS rules by element ID. Like garbage collector of deleted elements.
 * @param {String} id - id of the element.
 * @param {String} [namespace] - Remove all rules in namespace. Used for themes.
 */
function removeRulesById(id, namespace) {
  log('clean css rules by element id', id);

  const regex = new RegExp(`${namespace ? `${namespace}:` : ''}#${id}${!namespace ? '(?![a-z0-9-])' : ''}`, 'i');

  const keys = Object.keys(RULE_SETS)
    .filter(ruleId => {
      if (namespace) {
        return ruleId.match(regex);
      }

      return ruleId.split('"')
        .find((s, i) =>  i % 2 === 0 && s.match(regex));
    });

  keys.forEach(key => {
    removeRuleSet(key);
    log('css removed:', key);
  });
}

function getRuleMap(root) {
  let styleMap = RULE_SETS;

  if (root) {
    if (!root.nuRuleMap) {
      root.nuRuleMap = {};
    }

    styleMap = root.nuRuleMap;
  }

  return styleMap;
}

function hasRuleSet(id, root) {
  let ruleMap = getRuleMap(root);

  return !!ruleMap[id];
}

function transferCSS(id, root) {
  const ruleMap = getRuleMap(); // get document rule map
  const ruleSet = ruleMap[id];

  if (!ruleSet) return;

  const css = ruleSet.raw;

  log('transfer styles to the shadow root:', JSON.stringify(id), root);

  return insertRuleSet(id, css, root);
}

/**
 * Very fast css beautification without parsing.
 * Do not support media queries
 * Use in Dev Mode only!
 * @param {Array|String} css
 * @returns {Array|String}
 */
function beautifyCSS(css) {
  if (Array.isArray(css)) {
    return css.map(beautifyCSS);
  }

  let flag = false;

  return css.replace(/[{;}](?!$)/g, s => s + '\n')
    .split(/\n/g)
    .map(s => s.trim())
    .filter(s => s)
    .map(s => {
      if (!s.includes('{') && !s.includes('}') && flag) {
        if (s.includes(':')) {
          s = s.replace(/:(?!\s)(?!not\()(?!:)/, ': ');
          return `  ${s}`;
        }

        return `    ${s}`;
      }

      if (s.includes('{')) {
        flag = true;
      } else if (s.includes('}')) {
        flag = false;
      }

      return s;
    }).join('\n');
}

// export function splitIntoRules(css) {
//   if (Array.isArray(css)) return css;
//
//   const arr = css.split('}').map(s => `${s}}`);
//
//   return arr.slice(0, -1);
// }

/* System font stack is used https://css-tricks.com/snippets/css/system-font-stack/ */

const globalRules = [`
:root {
  font-size: 16px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  --rem-pixel: calc(1rem / 16);

  --radius: 0.5rem;
  --gap: 0.5rem;
  --border-width: 1px;
  --outline-width: calc(1rem / 16 * 3);
  --transition: 0.08s;
  --ph-animation-time: 1.4s;
  --ph-animation-size: calc(((90rem * 2) + 100vw) / 3);
  --progressbar-animation-time: .8s;
  --spin-animation-time: .8s;
  --inline-offset: -.15em;
  --transition-enabler: 1;
  --icon-size: 1.5em;
  --disabled-opacity: .5;
  --leaf-sharp-radius: 0;

  --font-size: 1rem;
  --line-height: 1.5rem;
  --font-weight: 400;
  --text-font-weight: var(--font-weight);
  --light-font-weight: 200;
  --normal-font-weight: 400;
  --bold-font-weight: 600;
  --semi-bold-font-weight: 500;
  --heading-font-weight: 700;
  --font-weight-step: 200;

  --system-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Avenir Next", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  --font: var(--system-font);
  --base-monospace-font: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --monospace-font: var(--base-monospace-font);

  --clear-color: transparent;
  --system-black-color: rgba(0, 0, 0, 1);
  --system-black-color-rgb: 0, 0, 0;
  --system-white-color: rgba(255, 255, 255, 1);
  --system-white-color-rgb: 255, 255, 255;

  --invalid-color: transparent;

  --xxs: .25rem;
  --xs: .5rem;
  --sm: .75rem;
  --md: 1rem;
  --lg: 1.5rem;
  --xl: 2rem;
  --xxl: 3rem;
}`,

`:root:not([data-nu-prevent-reset]) body {
  line-height: 1rem;
}`,

`:root:not([data-nu-prevent-reset]) body > *:not([size]) {
  line-height: 1.5rem;
}`,

`.nu-defaults, :root:not([data-nu-prevent-reset]) body {
  margin: 0;
  padding: 0;
  font-family: var(--font);
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(--subtle-color);
  font-weight: var(--normal-font-weight);
  word-spacing: calc(1rem / 8);
  min-height: 100vh;
  text-align: left;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  transition: background-color calc(var(--transition-enabler) * var(--transition)) linear;
}`,

`.nu-defaults:not(body) {
  line-height: 1.5rem;
}`,

`@media (prefers-color-scheme: dark) {
  :root:not([data-nu-scheme="light"]) .nu-dark-invert {
    filter: invert(100%) hue-rotate(180deg);
  }
}`,

`@media (prefers-color-scheme: dark) {
  :root:not([data-nu-scheme="light"]) .nu-dark-dim, :root:not([data-nu-scheme="light"]) nu-img {
    filter: brightness(0.95);
  }
}`,

`:root[data-nu-scheme="dark"] .nu-dark-invert {
  filter: invert(95%) hue-rotate(180deg);
}`,

`:root[data-nu-scheme="dark"] .nu-dark-dim, :root[data-nu-scheme="dark"] nu-img {
  filter: brightness(0.95);
}`,

`@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-enabler: 0;
  }
}`,

`:root[data-nu-reduce-motion] {
  --transition-enabler: 0;
}`,

`:root[data-nu-outline] [nu], :root[data-nu-outline] [nu-contents] > * {
  outline: var(--border-width, 1px) solid var(--outline-color) !important;
}`,

`:root:not([data-nu-outline]) [nu], :root:not([data-nu-outline]) [nu-contents] > * {
  outline: none !important;
}`,

`[nu-hidden] {
  display: none !important;
}`,

`.ionicon-fill-none {
  fill: none;
}`,

`.ionicon-stroke-width {
  --local-stroke-width: var(--icon-stroke-width, 2px);
  stroke-width: calc(var(--local-stroke-width) * 16);
}`,

...(SCROLLBAR ? generateCSS('body', scrollbarAttr('yes'), false) : [])];

insertRuleSet('global', globalRules);

function f(a) {
  var c = [], b = Math.pow(a + 16, 3) / 1560896;
  b = b > g ? b : a / k;
  for (var d = 0; 3 > d;) {
    var e = d++, h = l[e][0], w = l[e][1];
    e = l[e][2];
    for (var x = 0; 2 > x;) {
      var y = x++, z = (632260 * e - 126452 * w) * b + 126452 * y;
      c.push({
        b: (284517 * h - 94839 * e) * b / z,
        a: ((838422 * e + 769860 * w + 731718 * h) * a * b - 769860 * y * a) / z
      });
    }
  }
  return c
}

function m(a) {
  a = f(a);
  for (var c = Infinity, b = 0; b < a.length;) {
    var d = a[b];
    ++b;
    c = Math.min(c, Math.abs(d.a) / Math.sqrt(Math.pow(d.b, 2) + 1));
  }
  return c
}

function n(a, c) {
  c = c / 360 * Math.PI * 2;
  a = f(a);
  for (var b = Infinity, d = 0; d < a.length;) {
    var e = a[d];
    ++d;
    e = e.a / (Math.sin(c) - e.b * Math.cos(c));
    0 <= e && (b = Math.min(b, e));
  }
  return b
}

function p(a, c) {
  for (var b = 0, d = 0, e = a.length; d < e;) {
    var h = d++;
    b += a[h] * c[h];
  }
  return b
}

function q(a) {
  return .0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, .4166666666666667) - .055
}

function r(a) {
  return .04045 < a ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92
}

function t(a) {
  return [q(p(l[0], a)), q(p(l[1], a)), q(p(l[2], a))]
}

function u(a) {
  a = [r(a[0]), r(a[1]), r(a[2])];
  return [p(v[0], a), p(v[1], a), p(v[2], a)]
}

function A(a) {
  var c = a[0], b = a[1];
  a = c + 15 * b + 3 * a[2];
  0 != a ? (c = 4 * c / a, a = 9 * b / a) : a = c = NaN;
  b = b <= g ? b / B * k : 116 * Math.pow(b / B, .3333333333333333) - 16;
  return 0 == b ? [0, 0, 0] : [b, 13 * b * (c - C), 13 * b * (a - D)]
}

function E(a) {
  var c = a[0];
  if (0 == c) return [0, 0, 0];
  var b = a[1] / (13 * c) + C;
  a = a[2] / (13 * c) + D;
  c = 8 >= c ? B * c / k : B * Math.pow((c + 16) / 116, 3);
  b = 0 - 9 * c * b / ((b - 4) * a - b * a);
  return [b, c, (9 * c - 15 * a * c - a * b) / (3 * a)]
}

function F(a) {
  var c = a[0], b = a[1], d = a[2];
  a = Math.sqrt(b * b + d * d);
  1E-8 > a ? b = 0 : (b = 180 * Math.atan2(d, b) / Math.PI, 0 > b && (b = 360 + b));
  return [c, a, b]
}

function G(a) {
  var c = a[1], b = a[2] / 360 * 2 * Math.PI;
  return [a[0], Math.cos(b) * c, Math.sin(b) * c]
}

function H(a) {
  var c = a[0], b = a[1];
  a = a[2];
  if (99.9999999 < a) return [100, 0, c];
  if (1E-8 > a) return [0, 0, c];
  b = n(a, c) / 100 * b;
  return [a, b, c]
}

function I(a) {
  var c = a[0], b = a[1];
  a = a[2];
  if (99.9999999 < c) return [a, 0, 100];
  if (1E-8 > c) return [a, 0, 0];
  var d = n(c, a);
  return [a, b / d * 100, c]
}

function J(a) {
  var c = a[0], b = a[1];
  a = a[2];
  if (99.9999999 < a) return [100, 0, c];
  if (1E-8 > a) return [0, 0, c];
  b = m(a) / 100 * b;
  return [a, b, c]
}

function O(a) {
  return t(E(G(a)))
}

function P(a) {
  return F(A(u(a)))
}

function Q(a) {
  return O(H(a))
}

function R(a) {
  return I(P(a))
}

function S(a) {
  return O(J(a))
}

const l = [[3.240969941904521, -1.537383177570093, -.498610760293], [-.96924363628087, 1.87596750150772, .041555057407175], [.055630079696993, -.20397695888897, 1.056971514242878]],
  v = [[.41239079926595, .35758433938387, .18048078840183], [.21263900587151, .71516867876775, .072192315360733], [.019330818715591, .11919477979462, .95053215224966]],
  B = 1, C = .19783000664283, D = .46831999493879, k = 903.2962962, g = .0088564516;

const hsluvToRgb = (hsl) => Q(hsl).map(n => n * 255);
const rgbToHsluv = (rgb) => R(rgb.map(n => n / 255));
const hpluvToRgb = (hpl) => S(hpl).map(n => n * 255);
const hpluvToHsluv = (hpl) => R(S(hpl));

function hslToRgb(hsl) {
  return hsluvToRgb(hsl).map(n => Math.round(n));
}

function hplToRgb(hpl) {
  return hpluvToRgb(hpl).map(n => Math.round(n));
}

function rgbToHsl(rgb) {
  return rgbToHsluv(rgb.slice(0, 3));
}

function hslToRgbaStr(hsl) {
  return `rgba(${hslToRgb(hsl).join(',')}, ${hsl[3] || 1})`;
}

function hplToRgbaStr(hsl) {
  return `rgba(${hplToRgb(hsl).join(',')}, ${hsl[3] || 1})`;
}

function setPrecision(num, fixed = 2) {
  return Number((num).toFixed(fixed));
}
const FROM_RELATIVE = [];
const TO_RELATIVE_MAP = {};
const FROM_RELATIVE_MAP = {};
const TO_RELATIVE_CACHE = {};
const FROM_RELATIVE_CACHE = {};

function getContrastRatio(hslA, hslB) {
  const a = Array.isArray(hslA) ? toRelative(hslA[2]) / 100 : hslA;
  const b = Array.isArray(hslB) ? toRelative(hslB[2]) / 100 : hslB;
  const l1 = Math.max(a, b);
  const l2 = Math.min(a, b);

  return (l1 + 0.05) / (l2 + 0.05);
}

const getRelativeLuminance = (function () {
  const rc = 0.2126;
  const gc = 0.7152;
  const bc = 0.0722;
  const lowc = 1 / 12.92;

  function adjustGamma(_) {
    return Math.pow((_ + 0.055) / 1.055, 2.4);
  }

  return function getRelativeLuminance(rgb) {
    const rsrgb = rgb[0] / 255;
    const gsrgb = rgb[1] / 255;
    const bsrgb = rgb[2] / 255;

    const r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb);
    const g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb);
    const b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

    return (r * rc + g * gc + b * bc) * 100;
  };
})();

function mix(hslA, hslB, pow = 0.5) {
  return hslA.map((c, i) => {
    if (!i) {
      if (hslA[1] < 0.01) {
        return hslB[0];
      } else if (hslB[1] < 0.01) {
        return hslA[0];
      }

      const max = Math.max(hslB[0]);
      const min = Math.min(hslA[0]);
      const change = (max - min) > 180;
      const maxN = change ? min + 360 : max;
      const minN = change ? max : min;
      const powN = ((hslB[0] === max) ^ change) ? pow : (1 - pow);
      const value = minN + (maxN - minN) * powN;

      return value % 360;
    } else {
      return (hslB[i] - c) * pow + c;
    }
  });
}

function findContrastColor(hsl, refL = 1, ratio = 4.5, dir) {
  hsl = [...hsl];

  const l1 = toRelative(refL);
  const l2 = getLuminanceByRatio(l1, ratio, dir);

  if (l2 == null) return null; // can't be found

  hsl[2] = fromRelative(l2);

  return hsl;
}

function findContrastLightness(refL = 1, ratio = 4.5, dir) {
  if (ratio === 1) return refL;

  const l1 = toRelative(refL);
  const l2 = getLuminanceByRatio(l1, ratio, dir);

  if (l2 == null) return null; // can't be found

  return fromRelative(l2);
}

rgbToHsl([32, 32, 32])[2];

function getLuminanceByRatio(l1, ratio = 4.5, dir) {
  ratio += 0.04; // compensation for error (RGB rounding)

  l1 = l1 / 100;

  ratio = (dir ? 1 / ratio : ratio);

  let l2 = (l1 + 0.05) * ratio - 0.05;

  if (dir == null && (l2 > 1 || l2 < 0)) {
    l2 = (l1 + 0.05) / ratio - 0.05;
  }

  if (l2 > 1 || l2 < 0) {
    return null; // can't be found
  }

  return l2 * 100;
}

for (let i = 1; i <= 255; i += .25) {
  const clr = [i, i, i];
  const hslL = rgbToHsluv(clr)[2];
  const relL = getRelativeLuminance(clr);
  FROM_RELATIVE.push(relL);

  TO_RELATIVE_MAP[hslL] = relL;
  FROM_RELATIVE_MAP[relL] = hslL;
}

function findClosest(val, arr) {
  let closest = arr[0];
  let closestValue = Math.abs(arr[0] - val);
  let secondClosest;

  for (let i = 1; i < arr.length; i++) {
    let currentValue = Math.abs(arr[i] - val);
    if (currentValue < closestValue) {
      closestValue = currentValue;
      closest = arr[i];
    }
  }

  secondClosest = arr[arr.indexOf(closest) + (val > closest ? 1 : -1)];

  return [closest, secondClosest];
}

function toRelative(l) {
  l = setPrecision(l);

  if (TO_RELATIVE_CACHE[l]) {
    return TO_RELATIVE_CACHE[l];
  }

  const rgb = hsluvToRgb([0, 0, l]);

  const value = getRelativeLuminance(rgb);

  TO_RELATIVE_CACHE[l] = value;

  return value;
}

// export function toRelative(l) {
//   if (TO_RELATIVE_CACHE[l]) {
//     return TO_RELATIVE_CACHE[l];
//   }
//
//   l = Math.max(Math.min(l, 100), 0);
//
//   if (l === 0) return 0;
//   if (l === 100) return 100;
//
//   const closest = findClosest(l, TO_RELATIVE);
//   const closeMin = Math.min(...closest);
//   const closeMax = Math.max(...closest);
//   const min = TO_RELATIVE_MAP[closeMin];
//   const max = TO_RELATIVE_MAP[closeMax];
//
//   const ratio = Math.pow((l - closeMin) * (closeMax - closeMin), 1 / 4);
//
//   const value = (max - min) * ratio + min;
//
//   TO_RELATIVE_CACHE[l] = value;
//
//   return value;
// }

function fromRelative(l, exp = 4) {
  l = setPrecision(l);

  if (FROM_RELATIVE_CACHE[l]) {
    return FROM_RELATIVE_CACHE[l];
  }

  l = Math.max(Math.min(l, 100), 0);

  if (l === 0) return 0;
  if (l === 100) return 100;

  const closest = findClosest(l, FROM_RELATIVE);
  const closeMin = Math.min(...closest);
  const closeMax = Math.max(...closest);
  const min = FROM_RELATIVE_MAP[closeMin];
  const max = FROM_RELATIVE_MAP[closeMax];

  const ratio = Math.pow((l - closeMin) * (closeMax - closeMin), 1 / exp);

  const value = (max - min) * ratio + min;

  FROM_RELATIVE_CACHE[l] = value;

  return value;
}

function setOpacity(hsl, opacity) {
  const hslNew = [...hsl.slice(0, 3)];

  hslNew.push(opacity);

  return hslNew;
}

function setPastelSaturation(hsl, saturation = 100) {
  const hpl = [...hsl];

  hpl[1] = saturation;

  const converted = hpluvToHsluv(hpl);

  return hsl.length > 3 ? [...converted, hsl[3]] : converted;
}

function setSaturation(hsl, saturation = 100, pastel = false) {
  const newHsl = [...hsl];

  if (saturation != null) {
    newHsl[1] = saturation;
  }

  newHsl[1] = (pastel ? hpluvToHsluv(newHsl) : newHsl)[1];

  // return saturationFix([...hsl], newSaturation);

  return newHsl;
}

function getOptimalSaturation(hue, baseSaturation) {
  const hsl = hpluvToHsluv([hue, 100, 50]);
  const max = hsl[1];

  if (baseSaturation == null) {
    return (100 + max) / 2;
  }

  if (baseSaturation > max) {
    return ((baseSaturation - max) / 125 * baseSaturation) + max;
  }

  return baseSaturation;
}

function getTheBrightest(hslA, hslB) {
  return hslA[2] > hslB[2] ? [...hslA] : [...hslB];
}

function getSaturationRatio(hue, saturation, pastel) {
  if (pastel) {
    const pastelSaturation = setPastelSaturation([hue, 50, 50])[1];
    const referenceSaturation = pastelSaturation * saturation / 100;

    return referenceSaturation / 100;
  } else {
    return saturation / 100;
  }
}

function rgbaStrToRgbValues(rgba) {
  return rgba.slice(5,-1).split(',').slice(0,3).join(',');
}

const THEME_ATTR = 'theme';

const THEME_PROPS_LIST = [
  // theme props
  'text-color',
  'bg-color',
  'border-color',
  'mark-color',
  'outline-color',
  'subtle-color',
  'text-soft-color',
  'text-strong-color',
  'shadow-color',
  'special-color',
  'special-text-color',
  'special-bg-color',
  'special-mark-color',
  'special-shadow-color',
  'dark-color',
  'light-color',
  'input-color',
];
const normalTextLightness = 19.87;
const contrastTextLightness = 12.25;
const darkTextLightness = 88.82;
const darkContrastTextLightness = 94.45;
const normalBaseTextColor = [0, 0, 19.87];
const contrastBaseTextColor = [0, 0, 12.25];
const darkNormalBaseTextColor = [0, 0, 88.82];
const darkContrastBaseTextColor = [0, 0, 94.45];
const baseBgColor = [0, 0, 100];
const normalMinLightness = 12.25;
const contrastMinLightness = 12.25;
const darkNormanBaseBgColor = [0, 0, normalMinLightness];
const darkContrastBaseBgColor = [0, 0, contrastMinLightness];

function createThemeConfig(config = {}) {
  return Object.assign({}, {
    hue: 262,
    saturation: getOptimalSaturation(config.hue || 262),
    pastel: false,
    name: 'main',
    type: 'main',
    contrast: 'normal',
    lightness: 'normal',
    $context: document.body,
    mods: '',
    lazy: true,
  }, config);
}

const RGB_COLORS = ['text', 'bg', 'subtle', 'special', 'special-text', 'special-bg', 'shadow', 'special-shadow', 'outline', 'dark', 'light'];

/**
 * Get minimal possible contrast ratio between text and foreground.
 * @param type {String}
 * @param highContrast {Boolean}
 * @param darkScheme {Boolean}
 * @returns {Number}
 */
function getMinContrast(type = 'normal', highContrast, darkScheme) {
  if (highContrast) {
    return type === 'strong'
      ? 8.5
      : (type === 'soft'
        ? 4.5
        : 7);
  } else {
    return type === 'strong'
      ? 7
      : (type === 'soft'
        ? (darkScheme ? 3.75 : 3)
        : 4.5);
  }
}

const BG_OFFSET = {
  normal: 9,
  dim: 5,
  bold: 16,
};

/**
 * Get background lightness by params.
 * @param [type] {String}
 * @param [highContrast] {Boolean}
 * @param [darkScheme] {Boolean}
 * @returns {Number}
 */
function getBgLightness(type = 'normal', highContrast, darkScheme) {
  if (darkScheme) {
    return (highContrast ? contrastMinLightness : normalMinLightness) + BG_OFFSET[type] - 2;
  } else {
    return 100 - BG_OFFSET[type];
  }
}

function getBaseTextColor(hue, saturation, highContrast, darkScheme) {
  saturation /= darkScheme ? 4 : 2;

  if (darkScheme) {
    return [hue, saturation, highContrast ? darkContrastTextLightness : darkTextLightness];
  } else {
    return [hue, saturation, highContrast ? contrastTextLightness : normalTextLightness];
  }
}

function getBaseBgColor(highContrast, darkScheme) {
  if (darkScheme) {
    return highContrast ? darkContrastBaseBgColor : darkNormanBaseBgColor;
  } else {
    return baseBgColor;
  }
}

const SPECIAL_CONTRAST_MAP = {
  3: 2.5,
  4.5: 3.5,
  7: 5.5,
};

/**
 * Generate theme with specific params
 * @param hue {Number} – Reference hue
 * @param saturation {Number} – Reference saturation
 * @param pastel {Boolean} – Use pastel palette
 * @param [type] {String} – [main] | tint | tone | swap | special
 * @param [contrast] {String} – [normal] | strong | soft
 * @param [lightness] {String} – [normal] | dim | bold
 * @param [darkScheme] {Boolean} - true | false
 * @param [highContrast] {Boolean} - true | false
 */
function generateTheme({ hue, saturation, pastel, type, contrast, lightness, darkScheme, highContrast }) {
  const originalSaturation = saturation;

  if (darkScheme) {
    saturation = getOptimalSaturation(hue, saturation);
  }

  const theme = {};
  const minContrast = getMinContrast(contrast, highContrast, darkScheme);
  const specialContrast = minContrast * (1 - (darkScheme ? 0 : (getSaturationRatio(hue, saturation, pastel) / 4.5)));
  const softContrast = Math.max(minContrast * .8, darkScheme ? 3.75 : 3);
  // const strongContrast = Math.min(minContrast / .8, 7);
  const tonedBgLightness = getBgLightness(lightness, highContrast, darkScheme);
  const textColor = getBaseTextColor(hue, saturation, highContrast, darkScheme);
  const bgColor = getBaseBgColor(highContrast, darkScheme);
  const borderContrastModifier = contrast === 'strong' ? 1.5 : 0;

  const originalContrast = theme['special-text'] = getTheBrightest(textColor, bgColor);
  const originalSpecial = theme['special-bg'] = setSaturation([hue, saturation, findContrastLightness(theme['special-text'][2], type === 'tone' || type === 'swap' ? minContrast : specialContrast)], saturation, pastel);
  // themes with same hue should have outline color with consistent setPastelSaturation saturation

  if (type === 'main' || type === 'tint') {
    theme.subtle = setSaturation([hue, saturation, bgColor[2] + (darkScheme ? 2 : -2)], saturation * (darkScheme ? .5 : 1), true);

    if (darkScheme) {
      theme.input = [0, 0, bgColor[2] - 2];
    } else {
      theme.input = [...bgColor];
    }
  }

  switch (type || 'tint') {
    case 'tint':
      theme.bg = bgColor;
      theme.text = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], minContrast)], saturation, pastel);
      theme['text-strong'] = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], 7)], saturation, pastel);
      break;
    case 'tone':
      theme.bg = setSaturation([hue, saturation, tonedBgLightness], saturation, true);
      theme.text = setSaturation([hue, saturation, findContrastLightness(tonedBgLightness, minContrast)], saturation, pastel);
      theme['text-strong'] = setSaturation([hue, saturation, findContrastLightness(tonedBgLightness, 7)], saturation, pastel);
      theme.input = [...bgColor];
      break;
    case 'swap':
      theme.bg = setSaturation([hue, saturation, findContrastLightness(tonedBgLightness, minContrast)], saturation, pastel);
      theme.text = setSaturation([hue, saturation, tonedBgLightness], saturation, true);
      // theme.border = setSaturation(findContrastColor(mix(originalSpecial, originalContrast, darkScheme ? 0 : .7), theme.bg[2], (highContrast ? 4.5 : 3) + borderContrastModifier, darkScheme), darkScheme ? 100 : saturation * .75);
      theme['special-bg'] = setSaturation([theme.text[0], saturation, findContrastLightness(theme.bg[2], darkScheme ? SPECIAL_CONTRAST_MAP[minContrast] : minContrast)], saturation, true);
      theme['special-text'] = setSaturation([theme.bg[0], theme.bg[1], findContrastLightness(theme['special-bg'][2], minContrast)], saturation, pastel);
      theme.special = [...bgColor];
      theme['text-soft'] = highContrast ? [...theme.text] : setSaturation([hue, saturation, findContrastLightness(theme.bg[2], minContrast, darkScheme)], saturation, true);
      theme['text-strong'] = [...bgColor];
      break;
    case 'special':
      theme.text = getTheBrightest(textColor, bgColor);
      theme.bg = setSaturation([hue, saturation, findContrastLightness(theme.text[2], minContrast)], saturation, pastel);
      theme.border = setPastelSaturation(findContrastColor(originalSpecial, theme.bg[2], (highContrast ? 4.5 : 2.5) + borderContrastModifier), saturation * .75);
      [theme['special-text'], theme['special-bg']] = [theme['special-bg'], theme['special-text']];
      theme['special-text'] = setSaturation([hue, saturation, findContrastLightness(originalContrast[2], minContrast)], saturation, pastel);
      theme.special = [...originalContrast];
      theme['text-soft'] = [...theme.text];
      theme['text-strong'] = [...theme.text];
      break;
    case 'main':
      theme.bg = bgColor;
      theme.text = textColor;
      theme['text-soft'] = [theme.text[0], theme.text[1] / 2, highContrast ?  theme.text[2] : findContrastLightness(tonedBgLightness, 7)];
      theme['text-strong'] = [0, 0, findContrastLightness(tonedBgLightness, 7)];
  }

  theme.dark = setPastelSaturation(originalSpecial, Math.min(saturation * (darkScheme ? 1.2 : 1), 100));
  theme.dark[2] = darkScheme ? 22 : 30;
  theme.light = [hue, saturation, (darkScheme ? (highContrast ? darkContrastTextLightness : darkTextLightness) : 100) - 4 ];
  theme.outline = setPastelSaturation(mix(theme['special-text'], theme['special-bg']));
  theme.outline[1] = getOptimalSaturation(hue, Math.max(saturation, 75));

  if (type === 'main') {
    theme.border = setPastelSaturation(findContrastColor(originalSpecial, theme.bg[2], (highContrast ? 2 : 1.2) + borderContrastModifier), saturation / (highContrast ? 2 : 1));
  } else {
    theme.border = setPastelSaturation([
      hue,
      saturation,
      (highContrast ? (theme.text[2] * 2 + theme.bg[2]) : (theme.text[2] + theme.bg[2] * 2)) / 3,
    ], originalSaturation);

    if (!theme.subtle) {
      theme.subtle = [theme.bg[0], theme.bg[1], theme.bg[2] + (theme.bg[2] < theme.text[2] ? -2 : 2)];
    }

    theme.input = theme.input || [theme.bg[0], theme.bg[1], theme.bg[2] + (theme.bg[2] < theme.text[2] ? -8 : 6)];
  }

  if (type === 'main') {
    theme.special = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], specialContrast)], saturation, pastel);
  } else if (!theme.special) {
    const contrastLightness = findContrastLightness(theme.bg[2], specialContrast, darkScheme);
    theme.special = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
  }

  // in soft variant it's impossible to reduce contrast for headings
  if (!theme['text-soft']) {
    if (highContrast) {
      theme['text-soft'] = [...theme.text];
    } else {
      const contrastLightness = findContrastLightness(theme.bg[2], softContrast, !darkScheme);
      theme['text-soft'] = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
    }
  }

  theme.mark = setOpacity([...theme.special], highContrast ? 0.16 : .08);
  theme['special-mark'] = setOpacity([...theme['special-text']], highContrast ? 0.16 : .08);

  const shadowSaturation = saturation * (type === 'main' ? .66 : 1);
  const shadowContrastRatio = 1.8 * (highContrast ? 1.5 : 1);
  const specialShadowContrastRatio = (type === 'special' || (!darkScheme && type === 'swap') ? 1.5 : 1) * shadowContrastRatio * (darkScheme ? 1.5 : 1);
  const shadowLightness = findContrastLightness(theme.bg[2], shadowContrastRatio, true);
  const specialShadowLightness = findContrastLightness(theme['special-bg'][2], specialShadowContrastRatio, true);

  theme.shadow = (type !== 'swap' && type !== 'special' ? setPastelSaturation : setSaturation)([originalSpecial[0], shadowSaturation, shadowLightness, 1], shadowSaturation);
  theme['special-shadow'] = setPastelSaturation([originalSpecial[0], saturation, specialShadowLightness, 1], originalSaturation);

  return theme;
}

function themeToProps(name, theme) {
  const prefix = name ? `--${name}-` : '--';

  const map = Object.keys(theme).reduce((map, color) => {
    if (!Array.isArray(theme[color])) {
      const key = `${prefix}${color}`;

      map[key] = theme[color];
    } else {
      const key = `${prefix}${color}-color`;
      const hsl = theme[color];

      map[key] = hslToRgbaStr(hsl);
    }

    return map;
  }, {});

  RGB_COLORS.forEach(clr => {
    map[`${prefix}${clr}-color-rgb`] = rgbaStrToRgbValues(map[`${prefix}${clr}-color`]);
  });

  return map;
}

const CONTRAST_MODS = [
  'strong',
  'soft',
];
const LIGHTNESS_MODS = [
  'dim',
  'bold',
];
const THEME_TYPE_MODS = [
  'tint',
  'tone',
  'swap',
  'special',
];
const ALL_THEME_MODS = [
  ...CONTRAST_MODS,
  ...LIGHTNESS_MODS,
  ...THEME_TYPE_MODS,
];

function incorrectTheme(prop, value) {
  log(`incorrect '${prop}' value in theme attribute`, value);
}

function parseThemeAttr(attr) {
  let { value, mods } = extractMods(attr, ALL_THEME_MODS);
  let contrast, lightness, type;

  const contrastMods = intersection(mods, CONTRAST_MODS);

  if (devMode && contrastMods.length > 2) {
    incorrectTheme('contrast', attr);
    return;
  } else if (contrastMods.length === 1) {
    contrast = contrastMods[0];
  } else {
    contrast = 'normal';
  }

  const lightnessMods = intersection(mods, LIGHTNESS_MODS);

  if (devMode && lightnessMods.length > 2) {
    incorrectTheme('lightness', attr);
    return;
  } else if (lightnessMods.length === 1) {
    lightness = lightnessMods[0];
  } else {
    lightness = 'normal';
  }

  const typeMods = intersection(mods, THEME_TYPE_MODS);

  if (devMode && typeMods.length > 2) {
    incorrectTheme('type', attr);
    return;
  } else if (typeMods.length === 1) {
    type = typeMods[0];
  }

  if (value.length && !value.match(/^[a-z0-9-]+$/i)) {
    incorrectTheme('name', attr);
  }

  if (!type) {
    type = 'main';
  }

  if (!value) {
    value = 'main';
  }

  return {
    name: value,
    type,
    contrast,
    lightness,
  };
}

function composeThemeName({ name, type, contrast, lightness }) {
  let themeName = name;
  let suffix = '';

  type = type || 'main';

  if (type !== 'main') {
    suffix += type[0] + type[1];
  }

  if (suffix || contrast !== 'normal') {
    suffix += contrast[0] + contrast[1];
  }

  if (suffix || lightness !== 'normal') {
    suffix += lightness[0];
  }

  if (suffix) {
    themeName += `-${suffix}`;
  }

  return themeName;
}

/**
 * Declare theme on element.
 * @param el – Element to remove theme
 * @param name {String} – Name of theme
 * @param hue {Number} – Reference hue of theme
 * @param saturation {Number} – Reference saturation of theme
 * @param pastel {Boolean} - Use pastel palette
 * @param defaultMods {String} – List of default modifiers
 */
function declareTheme(el, name, hue, saturation, pastel, defaultMods) {
  log('declare theme', { element: el, name, hue, saturation, pastel, defaultMods });

  if (devMode && !el.nuContext) {
    log('element context not found');
    return;
  }

  const isGlobal = el === document.body;
  const key = `theme:${name}`;
  const theme = applyDefaultMods(BASE_THEME, defaultMods);

  const contextTheme = {
    mods: defaultMods,
    ...theme,
    hue,
    saturation,
    pastel,
    name,
    $context: el,
  };

  if (!isGlobal) {
    generateId(el);

    if (!el.hasAttribute('theme') && name === 'main') {
      el.setAttribute('theme', 'main');
    }

    el.nuSetContext(key, contextTheme);
  }

  applyTheme(el, {
    ...theme,
    name,
    hue,
    saturation,
    pastel,
  }, name);
}

/**
 * Apply default mods to theme.
 * @param theme
 * @param defaultMods {String}
 */
function applyDefaultMods(theme, defaultMods) {
  theme = { ...theme };

  const { mods } = extractMods(defaultMods, ALL_THEME_MODS);
  const lightnessMod = mods.find(mod => LIGHTNESS_MODS.includes(mod));
  const contrastMod = mods.find(mod => CONTRAST_MODS.includes(mod));
  const typeMod = mods.find(mod => THEME_TYPE_MODS.includes(mod));

  if (lightnessMod) {
    if (theme.lightness === 'normal') {
      theme.lightness = lightnessMod;
    } else if (theme.lightness !== lightnessMod) {
      theme.lightness = 'normal';
    }
  }

  if (contrastMod) {
    if (theme.contrast === 'normal') {
      theme.contrast = contrastMod;
    } else if (theme.contrast !== contrastMod) {
      theme.contrast = 'normal';
    }
  }

  if (typeMod) {
    theme.type = typeMod;
  }

  theme.mods = `${theme.type !== 'main' ? theme.type : ''} ${theme.lightness !== 'normal' ? theme.lightness : ''} ${theme.contrast !== 'normal' ? theme.contrast : ''}`;

  return theme;
}

/**
 * Remove declaration of theme on element.
 * @param el – Element to remove theme
 * @param name {String} – Name of theme
 * @param customProps {Array<String>} – All custom properties of theme
 */
function removeTheme(el, name, customProps) {
  if (devMode && !el.nuContext) {
    log('element context not found');
    return;
  }

  const key = `theme:${name}`;

  Object.keys(el.nuContext)
    .forEach(prop => {
      if (prop.startsWith(key)) {
        delete el.nuContext[prop];
        removeRulesById(el.nuUniqId, prop);
      }
    });
}

function applyTheme(element, { name, hue, saturation, pastel, type, contrast, lightness }, themeName) {
  const lightNormalTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness,
  });
  const lightContrastTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness, highContrast: true,
  });
  const darkNormalTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness, darkScheme: true,
  });
  const darkContrastTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness, highContrast: true, darkScheme: true,
  });

  themeName = themeName || composeThemeName({ name, type, contrast, lightness });
  const lightNormalProps = stylesString(themeToProps(themeName, lightNormalTheme));
  const lightContrastProps = stylesString(themeToProps(themeName, lightContrastTheme));
  const darkNormalProps = stylesString(themeToProps(themeName, darkNormalTheme));
  const darkContrastProps = stylesString(themeToProps(themeName, darkContrastTheme));

  log('apply theme', { element, themeName, hue, saturation, pastel, type, contrast, lightness });

  const baseQuery = element === document.body ? 'body' : `#${element.nuUniqId}`;
  const ruleSetId = `theme:${themeName}:${baseQuery}`;

  // const prefersContrastSupport = matchMedia('(prefers-contrast)').matches;

  const cssRules = generateSchemeCSS(baseQuery, [lightNormalProps, lightContrastProps, darkNormalProps, darkContrastProps]);

  insertRuleSet(
    ruleSetId,
    cssRules,
    null,
    true,
  );

  if (themeName === name) return;

  const theme = {
    name,
    hue,
    saturation,
    pastel,
    type,
    contrast,
    lightness,
    $context: element
  };

  if (element.nuSetContext) {
    element.nuSetContext(`theme:${themeName}`, theme);
  } else {
    CONTEXT[`theme:${themeName}`] = theme;
  }
}

function generateSchemeCSS(query, [lightNormalProps, lightContrastProps, darkNormalProps, darkContrastProps]) {
  const cssRules = [];

  cssRules.push(
    `html[data-nu-scheme-is="light"][data-nu-contrast-is="no-preference"] ${query} {${lightNormalProps}}`,
    `html[data-nu-scheme-is="dark"][data-nu-contrast-is="no-preference"] ${query} {${darkNormalProps}}`,
    `html[data-nu-scheme-is="light"][data-nu-contrast-is="more"] ${query} {${lightContrastProps}}`,
    `html[data-nu-scheme-is="dark"][data-nu-contrast-is="more"] ${query} {${darkContrastProps}}`,
  );

  return cssRules;
}

function hueFromString(str) {
  if (str.match(/^(#|(rgb|rgba|hsl)\()/)) {
    const extColor = extractColor(str);

    return rgbToHsl(extColor)[0];
  }

  return str.split('').reduce((sum, ch) => sum + ch.charCodeAt(0) * 69, 0) % 360;
}

const COLORS = {};
const LIGHT_MAX_CONTRAST = getContrastRatio(baseBgColor, normalBaseTextColor);
const LIGHT_HIGH_MAX_CONTRAST = getContrastRatio(baseBgColor, contrastBaseTextColor);
const DARK_MAX_CONTRAST = getContrastRatio(darkNormanBaseBgColor, darkNormalBaseTextColor);
const DARK_HIGH_MAX_CONTRAST = getContrastRatio(darkContrastBaseBgColor, darkContrastBaseTextColor);

function convertContrast(contrast, darkScheme, highContrast) {
  let maxContrast;

  switch (contrast) {
    case 'auto':
      return highContrast ? 7 : 4.5;
    case 'high':
      return highContrast ? 8.5 : 7;
    case 'low':
      return highContrast ? 4.5 : 3;
  }

  if (darkScheme) {
    if (highContrast) {
      maxContrast = DARK_HIGH_MAX_CONTRAST;
    } else {
      maxContrast = DARK_MAX_CONTRAST;
    }
  } else {
    if (highContrast) {
      maxContrast = LIGHT_HIGH_MAX_CONTRAST;
    } else {
      maxContrast = LIGHT_MAX_CONTRAST;
    }
  }

  if (highContrast && contrast) {
    contrast = 100 - ((100 - contrast) * (1 - (contrast / 100) * .85));
  }

  let relativeContrast = ((maxContrast - 1) * contrast / 100) + 1;

  if (relativeContrast > maxContrast) {
    relativeContrast = maxContrast;
  }

  return relativeContrast;
}

/**
 *
 * @param {{saturation: number, special: boolean, pastel: boolean, contrast: <string,number>, alpha: number, hue: number}} color
 * @param {String|Boolean} [name]
 * @return {String|{prop:string, light: string, lightContrast: string, dark: string, darkContrast: string }}
 */
function requireHue(color, name) {
  let { hue, saturation, contrast, alpha, special, pastel } = color;

  const prop = name ? `--${name}-color` : `--h-${hue}-s-${saturation}-c-${contrast}-a-${(alpha)}${pastel ? '-p' : ''}${special ? '-s' : ''}-color`
    .replace(/\s/g, '').replace(/\./g, '-');
  const rgbProp = `${prop}-rgb`;
  const onlyReturn = name === false;
  const darkSaturation = getOptimalSaturation(hue, saturation);

  // convert alpha to decimal value
  alpha /= 100;

  if (!COLORS[prop] || name) {
    const light = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness(baseBgColor[2], convertContrast(contrast)), alpha]);
    const lightContrast = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness(baseBgColor[2], convertContrast(contrast, false, true)), alpha]);
    const dark = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, darkSaturation, findContrastLightness((!special ? darkNormanBaseBgColor : darkNormalBaseTextColor)[2], convertContrast(contrast, true), special), alpha]);
    const darkContrast = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, darkSaturation, findContrastLightness((!special ? darkContrastBaseBgColor : darkContrastBaseTextColor)[2], convertContrast(contrast, true, true), special), alpha]);

    const props = [light, lightContrast, dark, darkContrast]
      .map(value => `${prop}: ${value};${rgbProp ? `${rgbProp}: ${rgbaStrToRgbValues(value)}` : ''}`);

    if (!onlyReturn) {
      COLORS[prop] = props;

      const cssRules = generateSchemeCSS('body', props);

      insertRuleSet(prop, cssRules, null, !!name);
    } else {
      return {
        prop,
        light,
        lightContrast,
        dark,
        darkContrast,
      };
    }
  }

  return prop;
}

const CONTRAST_MODES = ['auto', 'low', 'high'];

/**
 *
 * @param {String} val
 * @return {{saturation: number, special: boolean, pastel: boolean, contrast: string, alpha: number, hue: number}|undefined}
 */
function parseHue(val) {
  val = val.replace(',', ' ');

  let { all: values } = parseAttr(val, 2);

  // copy values
  values = [...values];

  let contrast = 'auto';
  let special = false;
  let pastel = false;
  let modContrast = false;

  for (let i = 0; i < values.length;) {
    const value = values[i];

    if (CONTRAST_MODES.includes(value)) {
      contrast = value;
      modContrast = true;
    } else {
      switch (value) {
        case 's':
        case 'special':
          special = true;
          break;
        case 'p':
        case 'pastel':
          pastel = true;
          break;
        default:
          i += 1;
          continue;
      }
    }

    values.splice(i, 1);
  }

  if (!values[0]) {
    if (devMode) {
      warn$1('hue(): 1 argument required.');
    }

    return;
  }

  const hue = parseInt(values[0]);

  if (isNaN(hue) || hue < 0 || hue > 359) {
    if (devMode) {
      warn$1('hue(): incorrect first `hue` argument. Should be an integer between 0 and 359. Provided value:', JSON.stringify(values[0]));
    }

    return;
  }

  let alpha = 100;
  let saturation = 100;

  if (values[1] != null) {
    const tmpSat = parseInt(values[1]);

    if (!isNaN(tmpSat) || tmpSat < 0 || tmpSat > 100) {
      saturation = tmpSat;
    } else if (devMode) {
      warn$1('hue(): incorrect second `saturation` value. Should be an integer between 0 and 100. Provided value:', JSON.stringify(values[1]));
    }
  }

  const alphaIndex = modContrast ? 2 : 3;

  if (!modContrast && values[2] != null) {
    const tmpCont = roundNumToFixed(parseInt(values[2]), 1);

    if (!isNaN(tmpCont)) {
      contrast = tmpCont;
    } else if (devMode) {
      warn$1('hue(): incorrect third `contrast` value. Should be an integer between 0 and 100 or one of the following shorthands: `auto`, `low`, and `high`. Provided value:', JSON.stringify(values[2]));
    }
  }

  if (values[alphaIndex] != null) {
    const tmpAlpha = roundNumToFixed(parseInt(values[alphaIndex]), 1);

    if (!isNaN(tmpAlpha)) {
      alpha = tmpAlpha;
    } else if (devMode) {
      warn$1('hue(): incorrect fourth `alpha` value. Should be a percent value between 0% and 100%. Provided value:', JSON.stringify(values[alphaIndex]));
    }
  }

  return { hue, saturation, contrast, alpha, special, pastel };
}

function parseHSL(val) {
  const values = val.split(',');

  return [...values.slice(0, 3).map(i => parseInt(i)), parseFloat(values[3])];
}

Object.assign(CUSTOM_FUNCS, {
  hue(val, { explicitColor } = {}) {
    const parsedHue = parseHue(val);

    if (!parsedHue) return 'var(--invalid-color)';

    return `${explicitColor ? 'color(' : ''}var(${requireHue(parsedHue)})${explicitColor ? ')' : ''}`;
  },
  hsluv(val) {
    return hslToRgbaStr(parseHSL(val));
  },
  hpluv(val) {
    return hplToRgbaStr(parseHSL(val));
  },
});

[
  ['white', '0'],
  ['grey', 'auto'],
  ['grey-text', 'auto'],
  ['darkgrey', 'high'],
  ['lightgrey', 'low'],
  ['black', '100'],
]
  .forEach(([name, contrast]) => {
    requireHue({
      hue: 0,
      saturation: 0,
      contrast: String(contrast),
      alpha: 100,
      special: name !== 'grey-text', // use adaptive color for grey to maintain contrast ratio
      pastel: false,
    }, name);
  });

function hue(val, dark, contrast) {
  const clr = requireHue(parseHue(val), false);

  let rgba;

  if (dark) {
    if (contrast) {
      rgba = clr.darkContrast;
    } else {
      rgba = clr.dark;
    }
  } else {
    if (contrast) {
      rgba = clr.lightContrast;
    } else {
      rgba = clr.light;
    }
  }

  return rgba;
}

const BASE_THEME = createThemeConfig({ saturation: 0 });
const SUCCESS_THEME = createThemeConfig({
  name: 'success',
  hue: 134,
  type: 'tone',
  lightness: 'dim',
  mods: 'tone dim',
});
const DANGER_THEME = createThemeConfig({
  name: 'danger',
  hue: 12,
  type: 'tone',
  lightness: 'dim',
  mods: 'tone dim',
  saturation: 75,
});
const WARNING_THEME = createThemeConfig({
  name: 'warning',
  hue: 45,
  type: 'tone',
  lightness: 'dim',
  mods: 'tone dim',
});
const COLOR_THEMES = [
  ['blue', 262],
  ['cyan', 192],
  ['green', 134],
  ['success', 134],
  ['yellow', 75, 100],
  ['orange', 45],
  ['warning', 45],
  ['red', 12, 75],
  ['danger', 12, 75],
  ['purple', 312],
  ['violet', 282],
].reduce((map, [name, hue, saturation]) => {
  map[name] = createThemeConfig({
    name, hue, saturation: saturation != null ? saturation : getOptimalSaturation(hue),
    type: 'tone',
    lightness: 'dim',
    mods: 'tone dim',
  });

  requireHue({
    hue: hue,
    saturation: saturation != null ? saturation : getOptimalSaturation(hue),
    contrast: 'auto',
    alpha: 100,
    pastel: false,
  }, name);

  return map;
}, {});
const THEME_MAP = {
  success: SUCCESS_THEME,
  danger: DANGER_THEME,
  warning: WARNING_THEME,
  ...COLOR_THEMES,
  base: BASE_THEME,
};

const RESPONSIVE_ATTR = 'responsive';
const RESPONSIVE_MOD = 'responsive';

function generateCSSByZones(Element, query, name, value, zones) {
  const values = value.split('|');

  let currentValue = '';

  return zones.map((zone, i) => {
    let val = values[i];

    // if default value
    if (val == null) {
      if (currentValue) {
        val = currentValue;
      } else {
        val = '';
      }
    } else if (val === ' ') {
      val = '';
    }

    currentValue = val;

    const stls = computeStyles(name, val, Element.nuAllGenerators, Element.nuAllStyles);

    return generateCSS(query, stls, true);
  });
}

/**
 * Compatibility layer for frameworks like Svelte.
 */

const ALL_ELEMENT_PROPS = Object.keys(window.HTMLElement.prototype).concat(Object.keys(window.Element.prototype));

const GLOBAL_ATTRS = ['accesskey', 'autocapitalize', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'itemprop', 'lang', 'slot', 'spellcheck', 'style', 'tabindex', 'title', 'translate'];

const MAP$4 = {};

function isPropDeclarable(name) {
  if (MAP$4[name] != null) return MAP$4[name];

  let result = true;

  if (GLOBAL_ATTRS.includes(name)) {
    result = false;
  } else if (ALL_ELEMENT_PROPS.includes(name)) {
    const descriptor = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, name) || Object.getOwnPropertyDescriptor(window.Element.prototype, name);

    if (descriptor) {
      if (descriptor.value && typeof descriptor.value === 'function') {
        result = false;
      }
    }
  } else {
    return false;
  }

  MAP$4[name] = result;

  return result;
}

function declareProp(Element, name) {
  log(`compatibility mode for [${name}] attribute`);

  Object.defineProperty(Element.prototype, name, {
    enumerable: false,
    set: function(val) {
      this.setAttribute(name, val);
    },
    get: function() {
      return this.getAttribute(name);
    }
  });
}

const BASE$1 = 'var(--gap)';

function isFlexGapSupported() {
  const els = [1, 2, 3].map(() => document.createElement('div'));

  els[1].style.width = '1px';
  els[2].style.width = '1px';
  els[0].appendChild(els[1]);
  els[0].appendChild(els[2]);

  els[0].style.display = 'inline-flex';
  els[0].style.gap = '1px';

  document.body.appendChild(els[0]);

  let FLEX_GAP_SUPPORTED = els[0].offsetWidth === 3;

  document.body.removeChild(els[0]);

  return FLEX_GAP_SUPPORTED;
}

const FLEX_GAP_SUPPORTED = isFlexGapSupported();

/**
 * CSS Gap value. Used for flex and grid layouts.
 * @param val
 * @returns {*}
 */
function gapAttr(val) {
  if (val == null) return;

  const { values } = parseAttr(val, 1);

  const isZero = values[0] === '0' && (values[0] || values[1] === '0');
  const vGap = values[0] || BASE$1;
  const hGap = values[1] || vGap;

  const fullVal = values.join(' ') || BASE$1;

  return [{
    gap: fullVal,
    'grid-gap': fullVal,
    '--local-v-gap': vGap,
    '--local-h-gap': hGap,
    '--local-gap': vGap === hGap ? vGap : null,
    'border-collapse': isZero ? 'collapse' :'separate',
    'border-spacing': `${vGap} ${hGap}`,
  }, {
    $suffix: '>*',
    '--v-gap': vGap,
    '--h-gap': hGap,
  }];
}

const DOUBLE_DISPLAY = ['block', 'table', 'flex', 'grid'];

// to reset style
const RESET_VALUE = '0 !important';

function displayAttr(val) {
  if (!val) return;

  return (DOUBLE_DISPLAY.includes(val)
    ? [{
      $suffix: ':not([inline])',
      display: val,
    }, {
      $suffix: ':not([inline])[hidden]',
      display: val,
    }, {
      $suffix: '[inline]',
      display: `inline-${val}`,
    }, {
      $suffix: '[inline][hidden]',
      display: `inline-${val}`,
    }]
    : [{ display: val }])
    .concat(val.endsWith('grid')
      ? [{
        $suffix: '>*',
        '--v-gap': RESET_VALUE,
        '--h-gap': RESET_VALUE,
      }]
      : [])
    .concat(val.endsWith('flex')
      ? (!FLEX_GAP_SUPPORTED
        ? [{
          gap: RESET_VALUE,
          'grid-gap': RESET_VALUE,
        }]
        : [{
          $suffix: '>*',
          '--v-gap': RESET_VALUE,
          '--h-gap': RESET_VALUE,
        }])
      : []);
}

const BASE_COLOR = 'var(--local-text-color, var(--text-color))';
const SPECIAL_BASE_COLOR = 'var(--local-special-text-color, var(--special-text-color))';

function colorAttr(val) {
  const color = val ? parseColor(convertCustomFuncs(val)).color : BASE_COLOR;

  return [
    { color: color },
    {
      $suffix: '[color]',
      '--local-text-color': color,
    },
  ];
}

/**
 * Apply theme to the element by providing specific custom properties.
 * @param {String} val - Theme name.
 * @param {Object} defaults - Element default attribute values.
 * @returns {*}
 */
function themeAttr(val, defaults = {}) {
  if (val == null) val = '';

  if (isNoValue(val)) {
    return [];
  }

  const theme = parseThemeAttr(val);
  const themeName = composeThemeName(theme);

  const styles = [THEME_PROPS_LIST.reduce((map, prop) => {
    if (themeName === 'main') {
      map[`--${prop}`] = `var(--${themeName}-${prop})`;
    } else {
      map[`--${prop}`] = `var(--${themeName}-${prop}, var(--main-${prop}))`;
    }

    return map;
  }, {
    '--local-border-color': 'var(--border-color)',
    '--local-mark-color': 'var(--mark-color)',
    '--local-shadow-color': 'var(--shadow-color)',
  })];

  // rgb colors
  RGB_COLORS.forEach(clr => {
    styles[0][`--${clr}-color-rgb`] = `var(--${themeName}-${clr}-color-rgb, var(--main-${clr}-color-rgb))`;
  });

  styles.push({
    $suffix: ':not([color])',
    '--local-text-color': 'initial',
  }, {
    $suffix: ':not([color]):not([special])',
    color: BASE_COLOR,
  }, {
    $suffix: ':not([color])[special]',
    color: SPECIAL_BASE_COLOR,
  });

  return styles;
}

function propAttr(val) {
  if (val == null) return;

  const [name, value] = val.split(';');

  if (!value) return;

  const styles = { [`--${name}`]: value };

  if (name.endsWith('-color')) {
    let rgbValue = value.replace(/-color([,)])/g, (s, s1) => `-color-rgb${s1}`);

    rgbValue = rgbValue.replace(/rgba\(([^)]+),[^)]+\)/, (s, s1) => s1);

    if (rgbValue !== value) {
      styles[`--${name}-rgb`] = rgbValue;
    }
  }

  return styles;
}

function TransformCombinator() {
  return {
    attrs: ['transform', 'place', 'move', 'rotate', 'scale'],
    generator(attrs, allAttrs) {
      if (!attrs.length) return;

      return {
        transform: allAttrs.reduce((value, attr) => {
          if (attrs.includes(attr)) {
            value += `var(--transform${attr === 'transform' ? '' : `-${attr}`}) `;
          }

          return value;
        }, ''),
      };
    },
  };
}

const STYLE_MAP = {
  shadow: 'depth',
  border: 'stroke',
  inset: 'inset',
  mark: 'mark',
};

function ShadowCombinator$1() {
  return {
    attrs: ['inset', 'mark', 'shadow', 'border'],
    generator(attrs, allAttrs) {
      if (!attrs.length) return;

      return {
        'box-shadow': allAttrs
          .filter(attr => attrs.includes(attr))
          .map((attr) => `var(--local-${STYLE_MAP[attr]}-shadow)`)
          .join(', '),
      };
    },
  };
}

function combine(combinator, defaults) {
  if (!combinator) {
    warn$1('wrong combinator', JSON.stringify(combinator));

    return;
  }

  // get all combinator attrs
  const combinatorAttrs = combinator.attrs;

  // get all attrs that have default value
  const allDefaultAttrs = Object.entries(defaults)
    .reduce((list, [name, value]) => {
      if (value != null) {
        list.push(name);
      }

      return list;
    }, []);

  // get intersection of both
  const definedAttrs = combinatorAttrs.filter(attr => allDefaultAttrs.includes(attr));

  // get other attrs
  const possibleAttrs = combinatorAttrs.filter(attr => !definedAttrs.includes(attr));

  const combinations = getCombinations(possibleAttrs);

  combinations.push([]);

  return combinations.reduce((stylesList, combination) => {
    const presentedAttrs = [...definedAttrs, ...combination];
    const excludeAttrs = combinatorAttrs.filter(attr => !presentedAttrs.includes(attr));
    const styles = combinator.generator(presentedAttrs, combinatorAttrs, defaults);

    if (styles) {
      styles.$suffix = `${[
        ...excludeAttrs.map(attr => `:not([${attr}])`),
        ...combination.map(attr => `[${attr}]`),
      ].join('')}${styles.$suffix || ''}`;

      stylesList.push(styles);
    }

    return stylesList;
  }, []);
}

const PARAMS_MAP = new Map;

class Behavior {
  static get params() {
    return {};
  }

  static get allParams() {
    const parent = Object.getPrototypeOf(this);

    if (!PARAMS_MAP.get(this)) {
      PARAMS_MAP.set(this, {
        ...(parent && parent.allParams || {}),
        ...(this.params || {}),
      });
    }

    return PARAMS_MAP.get(this);
  }

  constructor(host, _params) {
    this.host = host;
    this.ref = host.nuRef || host;
    const params = Object.create(this.constructor.allParams);

    if (_params && typeof _params === 'string') {
      parseParams(_params, params);
    }

    this.params = params;
  }

  /**
   * Require other behavior
   * @param name
   * @returns {undefined|Promise<Behavior>}
   */
  use(name) {
    return this.host.nuUse(name);
  }

  is(name) {
    return !!this.host.nuBehaviors[name];
  }

  /**
   * Require other behaviors
   * @param behaviors
   */
  require(...behaviors) {
    behaviors.forEach(name => {
      this.host.nuUse(name);
    });
  }

  setContext(name, value, force) {
    this.host.nuSetContext(name, value, force);
  }

  setMod(name, value) {
    this.host.nuSetMod(name, value);
  }

  hasMod(name) {
    return this.host.nuHasMod(name);
  }

  setName(name) {
    this.host.nuSetName(name);
  }

  hasName(name) {
    return this.host.nuHasName(name);
  }

  setAria(name, value) {
    this.host.nuSetAria(name, value);
  }

  setAttr(name, value) {
    setAttr(this.host, name, value);
  }

  hasAttr(name) {
    return this.host.hasAttribute(name);
  }

  linkContext(name, cb, localName) {
    if (!localName && localName !== false) {
      localName = name;
    }

    if (!this.host.nuHasContextHook(name)) {
      this.host.nuSetContextHook(name, (data) => {
        const oldValue = this[localName];

        if (localName) {
          this[localName] = data;
        }

        cb(data, oldValue);
      });
    }

    const value = this.parentContext[name];

    if (value != null) {
      if (localName) {
        this[localName] = value || null;
      }

      cb(value);
    }
  }

  on(eventName, cb, options) {
    if (Array.isArray(eventName)) {
      for (let name of eventName) {
        this.on(name, cb, options);
      }

      return () => {
        for (let name of eventName) {
          this.off(name, cb);
        }
      };
    }

    this.host.addEventListener(eventName, cb, options);

    return () => {
      this.off(eventName, cb);
    };
  }

  off(eventName, cb) {
    this.host.removeEventListener(eventName, cb);
  }

  hasParam(param) {
    return this._params.includes(param);
  }

  get context() {
    return this.host.nuContext;
  }

  get parentContext() {
    return this.host.nuParentContext;
  }

  get isConnected() {
    return this.host.nuIsConnected;
  }

  get isShadowAllowed() {
    return this.host.nuIsShadowAllowed;
  }

  get uniqId() {
    return this.host.nuUniqId;
  }

  doAction(action, value) {
    if (!action) {
      action = this.host.getAttribute('action');
    }

    if (action) {
      const actionCallback = this.parentContext[`action:${action}`];

      log('trigger action', this.host, action, value, actionCallback);

      if (actionCallback) {
        actionCallback(value);

        return true;
      }
    }

    return false;
  }

  get hasPopup() {
    return !!this.host.nuDeepQuery('[is-popup]');
  }

  emit(name, detail = null, options = {}) {
    if (name !== 'log') {
      log('emit', { element: this, name, detail, options });
    }

    const event = new CustomEvent(name, {
      detail,
      bubbles: false,
      ...options,
    });

    event.nuTarget = this.host;

    this.host.dispatchEvent(event);
  }
}

class GroupBehavior extends Behavior {
  connected() {
    this.setContext('group', this);
  }
}

const DICT = {};

const BEHAVIORS = {
  focus: () => extractModule(import('./focus-047ca4e8.js')),
  hover: () => extractModule(import('./hover-90213846.js')),
  listbox: () => extractModule(import('./listbox-72423b27.js')),
  option: () => extractModule(import('./option-4850c61c.js')),
  active: () => extractModule(import('./active-eca26cc8.js')),
  fixate: () => extractModule(Promise.resolve().then(function () { return fixate; })),
  orient: () => extractModule(import('./orient-9360c923.js')),
  popup: () => extractModule(import('./popup-b47296a8.js')),
  control: () => extractModule(import('./control-9ab9369a.js')),
  radiogroup: () => extractModule(import('./radiogroup-948725ee.js')),
  action: () => extractModule(import('./action-6b66b055.js')),
  label: () => extractModule(import('./label-9e2e8253.js')),
  code: () => extractModule(import('./code-f1e725e8.js')),
  markdown: () => extractModule(import('./markdown-82fe8052.js')),
  datetime: () => extractModule(import('./datetime-f06428ec.js')),
  number: () => extractModule(import('./number-6ce2e026.js')),
  slider: () => extractModule(import('./slider-7ebe5162.js')),
  slider2d: () => extractModule(import('./slider2d-8f9d5804.js')),
  numinput: () => extractModule(import('./numinput-bd731ce6.js')),
  input: () => extractModule(import('./input-670d5fe0.js')),
  textarea: () => extractModule(import('./textarea-c92904a6.js')),
  fileinput: () => extractModule(import('./fileinput-29ac761f.js')),
  icon: () => extractModule(import('./icon-dcdaf735.js')),
  svg: () => extractModule(import('./svg-16dc59d7.js')),
  image: () => extractModule(import('./image-9dd46579.js')),
  debug: () => extractModule(import('./debug-ed10de70.js')),
  debugger: () => extractModule(import('./debugger-bba8c14b.js')),
  form: () => extractModule(import('./form-6f0d271c.js')),
  validator: () => extractModule(import('./validator-d27a38b0.js')),
  group: () => Promise.resolve(GroupBehavior),
  tooltip: () => extractModule(import('./tooltip-1b98c248.js')),
  progressbar: () => extractModule(import('./progressbar-10e1f396.js')),
  value: () => extractModule(import('./value-fbb91d00.js')),
  datepicker: () => extractModule(import('./datepicker-ae091832.js')),
  dateinput: () => extractModule(import('./dateinput-c9b80496.js')),
  inputgroup: () => extractModule(import('./inputgroup-e3e090b6.js')),
  menu: () => extractModule(import('./menu-83d2a849.js')),
  menuitem: () => extractModule(import('./menuitem-2f9ae5ff.js')),
  offset: () => extractModule(import('./offset-15d81219.js')),
  appear: () => extractModule(import('./appear-f99344e7.js')),
  hotkey: () => extractModule(import('./hotkey-d85c8846.js')),
  current: () => extractModule(import('./current-1bf6b12c.js')),
};

function hasBehavior(name) {
  return name in BEHAVIORS;
}

function getBehavior(name) {
  if (DICT[name]) {
    return DICT[name];
  }

  if (devMode && !BEHAVIORS[name]) {
    error('behavior not found', name);
    return;
  }

  let promise = BEHAVIORS[name]();

  if (promise.then) {
    promise = promise.then(module => module.default || module);
  } else {
    promise = Promise.resolve(promise);
  }

  DICT[name] = promise;

  return promise;
}

function defineBehavior(name, behaviorLoader) {
  if (BEHAVIORS[name]) {
    warn$1('behavior has already been defined', name);

    return;
  }

  BEHAVIORS[name] = behaviorLoader;
}

function clearAll() {
  Object.keys(BEHAVIORS)
    .forEach(behaviorName => {
      delete BEHAVIORS[behaviorName];
    });
}

var behaviors = {
  define: defineBehavior,
  clearAll,
  has: hasBehavior,
  get: getBehavior,
  map: BEHAVIORS,
};

const ELEMENTS_MAP = {};

const NAMES_MAP = {};
const GENERATORS_MAP = {};
const STYLES_MAP = {};
const MIXINS_MAP = {};
const COMBINATORS_MAP = {};
const TEMPLATES_MAP = {};
const PROPS_MAP = {};
const ATTRS_MAP = {};
const BEHAVIORS_MAP = {};
const CONTEXT_MAP = {};
const SETTER_PROPS = [
  'value',
  'pressed',
  'checked',
  'selected',
  'disabled',
  'hidden',
  'special',
  'warning',
  'danger',
  'success',
  'assert',
];

function getAllAttrs() {
  return Object.keys(GENERATORS_MAP).reduce((arr, tag) => {
    const map = GENERATORS_MAP[tag];

    Object.keys(map)
      .forEach(attr => {
        if (!arr.includes(attr)) {
          arr.push(attr);
        }
      });

    return arr;
  }, []);
}

/**
 * List of all Nude tags.
 * @type {String[]}
 */
const TAG_LIST = [];

/**
 * @typedef NuElement
 * @type {HTMLElement|NuAbstract}
 */

/**
 * @typedef NudeContext
 * @property allowShadow {boolean}
 * @property $shadowRoot {HTMLFragment}
 * @property $parentShadowRoot {HTMLFragment}
 */

/**
 * @typedef NudeMixin
 * @method [init]
 * @method [connected]
 * @method [disconnected]
 * @method [changed]
 * @method [set]
 */

/**
 * @class
 * @abstract
 * @property nuContext {NudeContext}
 * @property nuParent {NuElement}
 * @property nuParentContext {NudeContext}
 * @property nuBehaviors {Array<NudeMixin>}
 */
class NuAbstract extends HTMLElement {
  /**
   * Element tag name.
   * @returns {String}
   */
  static get nuTag() {
    return 'nu-abstract'; // abstract tag
  }

  /**
   * In case the tag has `display: contents` transfer all styles to the child.
   * @return {string}
   */
  static get nuContents() {
    return '';
  }

  /**
   * Element ARIA Role.
   * @returns {String}
   */
  static get nuRole() {
    return '';
  }

  /**
   * Auto-id applied to element.
   * @returns {string}
   */
  static get nuId() {
    return '';
  }

  /**
   * Method to extract element css with current element context.
   * @protected
   * @param Element {Object} - NuAbstract (HTMLElement)
   * @param tag {String} - tag name
   * @returns {Array<String>}
   */
  static nuExtractCSS(Element, tag) {
    const _this = this;

    return this.nuCSS({
      tag: tag || Element.nuTag,
      get css() {
        return _this.nuGetParentCSS(Element, tag);
      },
      shadow: tag === ':host',
    });
  }

  /**
   * Parent element
   */
  static get nuParentClass() {
    const parent = Object.getPrototypeOf(this);

    if (parent.nuTag != null) return parent;
  }

  /**
   * Method to generate parent CSS with current element context.
   * @param Element
   * @param tag {String}
   * @returns {Array<String>}
   */
  static nuGetParentCSS(Element, tag) {
    let parent = this;

    do {
      parent = parent.nuParentClass;
    } while (parent && parent.nuCSS && parent.nuCSS === this.nuCSS);

    if (parent && parent.nuCSS) {
      return parent.nuExtractCSS(Element, tag);
    }

    return [];
  }

  /**
   * Static css generation method for an element.
   * @param tag - current tag name
   * @param css - current css
   * @returns {Array}
   */
  static nuCSS({ tag, css }) {
    return [];
  }

  static get nuName() {
    return '';
  }

  static get nuNames() {
    let name = this.hasOwnProperty('nuName') ? this.nuName : this.nuTag.replace(/^nu-/, '');

    const ignoreNames = name.split(/\s+/g).filter((nm) => {
      return nm.startsWith('-');
    }).map(nm => nm.replace('-', ''));

    const names = (
      NAMES_MAP[this.nuTag]
      || (NAMES_MAP[this.nuTag]
        = [...(name ? name.split(/\s+/g) : []), ...(this.nuParentClass && this.nuParentClass.nuNames || [])].reverse())
    );

    return names.filter(nm => !ignoreNames.includes(nm) && !ignoreNames.includes(nm.replace(/^-/, '')));
  }

  /**
   * @private
   */
  static get nuAllGenerators() {
    return (
      GENERATORS_MAP[this.nuTag]
      || (GENERATORS_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllGenerators || {}),
        ...this.nuGenerators
      })
    );
  }

  /**
   * Static template declaration
   * @return {string}
   */
  static get nuTemplate() {
    return '';
  }

  /**
   * @private
   */
  static get nuCachedTemplate() {
    return TEMPLATES_MAP[this.nuTag] || (TEMPLATES_MAP[this.nuTag] = this.nuTemplate);
  }

  /**
   * Allow Shadow DOM usage on the element
   * @return {boolean|null}
   */
  static get nuShadowRoot() {
    return null; // use global setting
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuGenerators() {
    return {
      id: '',
      /**
       * CSS Display value.
       * @param val
       */
      display: displayAttr,
      responsive: '',
      as: '',
      theme: themeAttr,
      prop: propAttr,
    };
  }

  /**
   * List of attributes.
   * @returns {Array}
   */
  static get nuGeneratorsList() {
    return Object.keys(this.nuAllGenerators);
  }

  /**
   * A list of attributes that are used as props or helpers
   * @return {Array<String>}
   */
  static get nuPropsList() {
    const tag = this.nuTag;
    const baseAttrs = NuAbstract.nuAllGenerators;

    return (PROPS_MAP[tag]
      || (PROPS_MAP[tag] = Object
        .entries(this.nuAllGenerators)
        .reduce((list, entry) => {
          const name = entry[0];

          if (!entry[1]
            && !name.startsWith('nu-')
            && !name.startsWith('use-')
            && !(name in baseAttrs)) {
            list.push(name);
          }

          return list;
        }, []))
    );
  }

  /**
   * Initial attribute values of the Element.
   */
  static get nuAttrs() {
    return {};
  }

  /**
   * Default styles of the Element.
   * They are used only to generate initial CSS for elements.
   */
  static get nuStyles() {
    return {
      display: 'none',
    };
  }

  /**
   * Initial attribute values of the Element.
   */
  static get nuContext() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllContext() {
    return (
      CONTEXT_MAP[this.nuTag] ||
      (CONTEXT_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllContext || {}),
        ...(this.nuContext || {}),
      })
    );
  }

  /**
   * @private
   */
  static get nuAllStyles() {
    return (
      STYLES_MAP[this.nuTag] ||
      (STYLES_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllStyles || {}),
        ...(this.nuStyles || {}),
      })
    );
  }

  /**
   * @private
   */
  static get nuAllAttrs() {
    if (this.nuTag in ATTRS_MAP) {
      return ATTRS_MAP[this.nuTag];
    }

    const allAttrs = {
      ...(this.nuParentClass && this.nuParentClass.nuAllAttrs || {}),
      ...(this.nuAttrs || {}),
    };

    if (!Object.keys(allAttrs)) {
      ATTRS_MAP[this.nuTag] = null;
      return;
    }

    ATTRS_MAP[this.nuTag] = allAttrs;

    return allAttrs;
  }

  /**
   * Element behaviors.
   * They are used to inject reusable logic into elements.
   */
  static get nuBehaviors() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllBehaviors() {
    return (
      MIXINS_MAP[this.nuTag] ||
      (MIXINS_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllBehaviors || {}),
        ...(this.nuBehaviors || {}),
      })
    );
  }

  /**
   * Element combinators.
   * They are used to generate initial CSS for elements.
   */
  static get nuCombinators() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllCombinators() {
    return (
      COMBINATORS_MAP[this.nuTag] ||
      (COMBINATORS_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllCombinators || {}),
        ...(this.nuCombinators || {}),
      })
    );
  }

  /**
   * @private
   * @returns {String[]}
   */
  static get observedAttributes() {
    return this.nuGeneratorsList;
  }

  static nuInit() {
    const tag = this.nuTag;

    if (!tag || TAG_LIST.includes(tag)) return;

    TAG_LIST.push(tag);

    if (!ELEMENTS_MAP[tag]) {
      ELEMENTS_MAP[tag] = this;
    }

    // Generate default styles on first attributeChangeCallback() instead.
    this.nuGenerateDefaultStyle();
  }

  static get nuBehaviorList() {
    const tag = this.nuTag;

    return (
      BEHAVIORS_MAP[tag]
      || (BEHAVIORS_MAP[tag] = Object
        .keys(this.nuAllBehaviors)
        .filter(name => this.nuAllBehaviors[name] != null))
    );
  }

  static nuGenerateDefaultStyle(isHost = false, dontInject = false, force = false) {
    let tag = this.nuTag;

    const cssName = isHost ? `${tag}:host` : tag;

    if (force) {
      removeRuleSet(cssName);
    } else {
      // already declared
      if (STYLE_MAP$1[cssName] && !dontInject) return;
    }

    if (isHost) {
      tag = ':host';
    }

    log('default style generated', tag);

    let el = this;

    let css = el.nuExtractCSS(el) || [];

    const allAttrs = this.nuAllGenerators;
    const allStyles = this.nuAllStyles;
    const transferChild = this.nuContents;
    const combinators = Object.values(this.nuAllCombinators);

    const globalAttrs = Object.keys(allAttrs).filter(attr => GLOBAL_ATTRS.includes(attr) && allAttrs[attr]);

    if (globalAttrs.length) {
      error('incorrect declaration of nuGenerators, global attributes are used for styling:', globalAttrs.join(','));

      return;
    }

    Object.keys(allAttrs).forEach(attr => {
      if (!NuAbstract.prototype.hasOwnProperty(attr) && isPropDeclarable(attr)) {
        declareProp(NuAbstract, attr);
      }
    });

    if (!isHost) {
      combinators.forEach(combinator => {
        const styles = combine(combinator, allStyles);

        if (styles.length) {
          if (transferChild) {
            styles.forEach(map => {
              map.$suffix += `>${transferChild}`;
            });
          }

          css.push(...generateCSS(tag, styles, false));
        }
      });
    }

    Object.keys(allStyles)
      .forEach(name => {
        let value = allStyles[name];

        if (value == null) return;

        value = String(value).replace(/\n\s+/g, ' ');

        let styles;

        const isProp = name.startsWith('@');

        styles = computeStyles(name, value, allAttrs, allStyles);

        if (!styles) return;

        let query = `${tag}${name !== 'text' && !isProp ? `:not([${name}])` : ''}`;

        if (transferChild) {
          css.push(...generateCSS(`${query}:not(:empty) > ${transferChild}`, styles, true));
          css.push(...generateCSS(`${query}:empty`, styles, true));
        } else {
          css.push(...generateCSS(query, styles, true));
        }
      });

    if (transferChild) {
      css.push(...generateCSS(tag, [{ display: 'contents' }], true));
    }

    if (!dontInject) {
      insertRuleSet(tag, css);
    } else {
      return css.join('\n');
    }
  }

  constructor() {
    super();

    this.nuRef = null;
    this.nuThemes = {};
  }

  /**
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   * @param {Boolean} force - Reapply CSS.
   */
  attributeChangedCallback(name, oldValue, value, force) {
    if (!ELEMENTS_MAP[this.constructor.nuTag]) {
      this.constructor.nuInit();
    }

    const origValue = value;

    // ignore attribute to declare custom properties
    if (devMode && name === 'prop' && this.hasAttribute('prop')) {
      warn$1('unable to use private "prop" attribute.');

      return;
    }

    let varAttr;

    if (name === 'nu') return;

    if (name.startsWith('use-')) {
      name = name.replace('use-', '');

      if (name === 'behaviors') return;

      if (behaviors.has(name)) {
        this.nuUse(name, value);
      }

      return;
    }

    if (name === 'id') {
      generateId(this); // trigger id generation

      return;
    }

    switch (name) {
      case RESPONSIVE_ATTR:
        generateId(this);

        if (!this.nuIsConnected) return;

        this.nuSetContext('responsive', {
          context: this,
          zones: value.split('|'),
        });

        this.nuVerifyChildren({
          responsive: true,
          shadow: true,
        });

        return;
      case THEME_ATTR:
        if (!this.nuIsConnected) {
          this.nuApplyAttr(THEME_ATTR);

          return;
        }

        this.nuEnsureThemes();
    }

    if (!this.nuAttrValues) {
      this.nuAttrValues = {};
    }

    this.nuChanged(name, oldValue, value);

    if (this.nuAttrValues[name]) {
      oldValue = this.nuAttrValues[name];
    }

    // if dynamic attr
    if (isResponsiveAttr(value)) {
      varAttr = this.nuGetDynamicAttr(name, value);

      value = varAttr.value;
    }

    this.nuAttrValues[name] = value;

    if (devMode && !name.startsWith('attr-') && name !== 'control') {
      if (value !== origValue || isResponsiveAttr(value)) {
        this.setAttribute(`attr-${name}`, normalizeAttrStates(value));
      }

      if (this.hasAttribute('debug')) {
        this.nuDebug('attribute changed', {
          name,
          oldValue,
          value: this.getAttribute(name),
          computedValue: value,
        });
      }
    }

    if (value == null || !this.constructor.nuAllGenerators[name]) return;

    this.nuApplyCSS(name, varAttr);
  }

  /**
   * @private
   */
  connectedCallback() {
    // check properties with setters and getters
    SETTER_PROPS.forEach(prop => {
      if (prop in this) {
        const value = this[prop];

        delete this[prop]; // remove own property

        this[prop] = value; // trigger Numl setter
      }
    });

    // the flag tells that it's a sync phase of element connection.
    // it's used to detect whether or not apply a transition to hiding effect.
    this.nuInitial = true;

    if (!ELEMENTS_MAP[this.constructor.nuTag]) {
      this.constructor.nuInit();
    }

    if (this.nuFirstConnect == null) {
      this.nuFirstConnect = true;
    }

    let parent = this.parentNode;

    // cache parent to have reference in onDisconnected callback
    this.nuParent = parent;

    this.nuCreateContext();

    if (!this.id) {
      if (this.constructor.nuId) {
        this.id = this.constructor.nuId;
      }
    } else {
      generateId(this);
    }

    if (this.constructor.nuRole && !this.hasAttribute('role')) {
      this.setAttribute('role', this.constructor.nuRole);
    }

    this.nuIsConnected = true;

    this.nuSetContextAttrs();

    if (this.nuContext.$shadowRoot) {
      if (!hasRuleSet(this.constructor.nuTag, this.nuContext.$shadowRoot)) {
        if (!hasRuleSet(this.constructor.nuTag)) {
          this.constructor.nuGenerateDefaultStyle();
        }

        transferCSS(this.constructor.nuTag, this.nuContext.$shadowRoot);
      }

      this.nuReapplyCSS();
    }

    if (this.nuApplyAttrs) {
      this.nuApplyAttrs.forEach(attr => {
        this.attributeChangedCallback(attr, null, this.getAttribute(attr), true);
      });

      this.nuApplyAttrs = [];
    }

    if (this.hasAttribute(RESPONSIVE_ATTR)) {
      this.attributeChangedCallback(RESPONSIVE_ATTR, null, this.getAttribute(RESPONSIVE_ATTR), true);
    }

    this.setAttribute('nu', '');

    if (this.constructor.nuContents) {
      this.setAttribute('nu-contents', '');
    }

    // on first connect (init)
    if (this.nuFirstConnect) {
      this.nuRender();
      this.nuInit();

      const names = this.constructor.nuNames;

      names.forEach(name => {
        this.setAttribute(`nu-${name}`, '');
      });

      const behaviorList = this.constructor.nuBehaviorList;

      if (behaviorList.length) {
        for (let name of behaviorList) {
          this.nuUse(name);
        }
      }

      const allAttrs = this.constructor.nuAllAttrs;

      if (allAttrs) {
        this.nuAutoAttrs = {};

        setTimeout(() => {
          Object.entries(allAttrs)
            .forEach(([attr, value]) => {
              if (value != null && !this.hasAttribute(attr)) {
                this.setAttribute(attr, String(value) || '');
                this.nuAutoAttrs[attr] = this.getAttribute(attr);
              }
            });
        });
      }

      const nuAllContext = this.constructor.nuAllContext;

      Object.keys(nuAllContext)
        .forEach(key => {
          const value = nuAllContext[key];

          // if it's `attrs` declaration then add Shadow Root flag
          if (key.startsWith('attrs:')) {
            value.$shadowRoot = this.nuContext.$shadowRoot;
          }

          this.nuSetContext(key, value);
        });
    }

    if (this.hasAttribute(THEME_ATTR)) {
      setTimeout(() => {
        this.nuEnsureThemes();
      }, 0);
    }

    this.nuConnected();

    this.nuBehaviorCall('connected');

    this.nuFirstConnect = false;
    this.nuIsConnectionComplete = true;

    setTimeout(() => {
      delete this.nuInitial;
    });
  }

  /**
   * @private
   */
  disconnectedCallback() {
    delete this.nuIsConnected;

    this.nuDisconnected();

    if (this.nuDisconnectedHooks) {
      this.nuDisconnectedHooks.forEach(cb => cb());
      delete this.nuDisconnectedHooks;

      log('disconnected hooks', { el: this });
    }

    if (this.id) {
      setTimeout(() => {
        removeRulesById(this.id);
      });
    }
  }

  get nuRole() {
    return this.getAttribute('role') || this.constructor.nuRole;
  }

  set nuRole(value) {
    this.setAttribute('role', value);
  }

  /**
   * Get the NUDE ID of the element. Also generate unique id if it's not presented.
   * @returns {String}
   */
  get nuId() {
    generateId(this);

    return this.getAttribute('nu-id');
  }

  /**
   * Get the unique ID of the element. Generate it if it's not presented.
   * @returns {String}
   */
  get nuUniqId() {
    return generateId(this);
  }

  /**
   * Simple getter to tell others that it's a NUDE Element.
   * @returns {boolean}
   */
  get nuElement() {
    return true;
  }

  /**
   * Generate CSS for specific query, attribute and its value.
   * Is used as separate method to provide API for definition elements.
   * @param {String} query - CSS query to apply styles.
   * @param {String} name - attribute (handler) name.
   * @param {String} value - attribute exact value (handler argument).
   * @param {Boolean} skipContents - private attribute to skip CONTENTS check.
   * @returns {undefined|Array} - output css
   */
  nuGetCSS(query, name, value, skipContents) {
    const transferChild = this.constructor.nuContents;

    if (!skipContents && transferChild) {
      return (this.nuGetCSS(`${query}:not(:empty) > ${transferChild}`, name, value, true) || [])
        .concat(this.nuGetCSS(`${query}:empty`, name, value, true) || []);
    }

    const isResponsive = value.includes('|');

    if (isResponsive) {
      value = normalizeAttrStates(value);

      const respContext = this.nuContext && this.nuContext.responsive && this.nuContext.responsive.context;

      if (respContext) {
        const zones = ['max'].concat(respContext.getAttribute(RESPONSIVE_ATTR).split('|'));
        const styles = generateCSSByZones(this.constructor, query, name, value, zones);

        return respContext.nuResponsive()(styles);
      }
    }

    let styles = computeStyles(name, value, this.constructor.nuAllGenerators, this.constructor.nuAllStyles);

    return generateCSS(query, styles, true);
  }

  /**
   * Create and apply CSS based on element's attributes.
   * @param {String} name - attribute name.
   * @param {*} [varAttr] - prepared value.
   * @param {Boolean} force - replace current CSS rule.
   * @param {Boolean} isHost
   */
  nuApplyCSS(name, varAttr, force = false, isHost = false) {
    if (!isHost && this.nuShadow) {
      this.nuApplyCSS(name, varAttr, force, true);
    }

    let attrValue = this.getAttribute(name);

    if (attrValue == null) return;

    const attrs = { [name]: attrValue };

    let value;

    if (isResponsiveAttr(attrValue)) {
      if (!varAttr) {
        varAttr = this.nuGetDynamicAttr(name, attrValue);
      }

      value = varAttr.value;
      Object.assign(attrs, varAttr.context);
    } else {
      value = attrValue;
    }

    const query = this.nuGetQuery(attrs, isHost);
    const cssRoot = isHost ? this.nuShadow : this.nuContext && this.nuContext.$shadowRoot;

    if (hasRuleSet(query, cssRoot)) {
      if (!force) return;

      removeRuleSet(query, cssRoot);
    } else if (hasRuleSet(query)) {
      transferCSS(query, cssRoot);

      return;
    }

    const css = this.nuGetCSS(query, name, value) || [''];

    insertRuleSet(query, css);

    if (cssRoot) {
      transferCSS(query, cssRoot);
    }
  }

  nuGetAttr(attr, firstValueOnly) {
    let value = this.getAttribute(attr);

    if (value == null) return value;

    if (!value) return value;

    const isResponsive = isResponsiveAttr(value);

    if (firstValueOnly) {
      if (isResponsive) {
        return parseAttrStates(value)[0].states[''];
      }

      return value;
    }

    if (isResponsive) {
      value = this.nuGetDynamicAttr(attr, value).value;
    }

    return value;
  }

  nuGetDynamicAttr(attr, value) {
    const context = {};

    if (!this.nuContext) {
      this.nuApplyAttr(attr);

      if (value.includes('|')) {
        context[`is-${RESPONSIVE_MOD}`] = null; // :not(...

        if (!value.includes('@')) {
          value = normalizeAttrStates(value, true);
        }
      }

      return {
        oldValue: this.nuAttrValues[attr],
        value,
        context,
      };
    }

    value = value == null ? this.getAttribute(attr) : value;

    const responsive = this.nuContext && this.nuContext.responsive && this.nuContext.responsive;
    const contextIds = new Set;
    const contextMod = `${attr}-ctx`;
    const contextModAttr = `is-${contextMod}`;
    const oldValue = this.nuAttrValues && this.nuAttrValues[attr];

    value = normalizeAttrStates(value);

    if (responsive && value.includes('|')) {
      context[`is-${RESPONSIVE_MOD}`] = responsive.context.nuUniqId;

      this.nuSetMod(RESPONSIVE_MOD, responsive.context.nuUniqId);
    }

    if (contextIds.size) {
      context[contextModAttr] = Array.from(contextIds).join(' ');

      this.nuSetMod(contextMod, context[contextModAttr]);
    }

    return {
      oldValue, value: value || '', context,
    };
  }

  /**
   * Set aria attribute.
   * @param {String} name
   * @param {Boolean|String|Number} value
   */
  nuSetAria(name, value) {
    setAria(this, name, value);
  }

  nuHasAria(name) {
    return (this.nuRef || this).hasAttribute(`aria-${name}`);
  }

  /**
   * Set a local modifier.
   * @param {String} name
   * @param {String|boolean|*} value - TRUE sets attribute without false, FALSE = removes attribute.
   */
  nuSetMod(name, value) {
    const mod = `is-${name}`;

    if (!this.nuMods) {
      this.nuMods = {};
    }

    const nuMods = this.nuMods;

    if (value === false || value == null) {
      this.removeAttribute(mod);

      delete nuMods[name];
    } else {
      this.setAttribute(mod, value === true ? '' : value);

      nuMods[name] = value;
    }
  }

  /**
   * Check if element have a local modifier with specific name.
   * @param {String} name
   * @returns {boolean}
   */
  nuHasMod(name) {
    const mod = `is-${name}`;

    return this.hasAttribute(mod);
  }

  nuSetName(name) {
    return this.setAttribute(`nu-${name}`, '');
  }

  nuRemoveName(name) {
    return this.removeAttribute(`nu-${name}`);
  }

  nuHasName(name) {
    const mod = `nu-${name}`;

    return this.hasAttribute(mod);
  }

  /**
   * Build a query with current tag name and provided attribute value.
   * @param {Object} attrs - dict of attributes with their values.
   * @param {Boolean} isHost - host declaration for Shadow DOM.
   * @returns {string}
   */
  nuGetQuery(attrs = {}, isHost = false) {
    return `${isHost ? ':host' : this.constructor.nuTag}${attrsQuery(attrs)}`;
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    if (value === undefined) {
      value = this.getAttribute(name);
    }

    this.nuBehaviorCall('changed', [name, value]);

    switch (name) {
      case 'id':
      case 'as':
        this.nuSetContextAttrs();
        break;
      case 'lang':
        this.nuSetContext('locale', value);
        break;
      case 'warning':
      case 'danger':
      case 'success':
        setThemeAttr(this, name, value != null);
        return;
    }
  }

  /**
   * Called when element is first connected to the DOM.
   * Just before nuConnected().
   * Called only once during element life-cycle.
   */
  nuInit() {
  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   * While using frameworks this method can be fired without element having parentNode.
   */
  nuConnected() {
  }

  /**
   * Called when element is disconnected from the DOM.
   * Can be called more than once.
   */
  nuDisconnected() {
    this.nuBehaviorCall('disconnected');
  }

  /**
   * Trigger behavior hooks
   * @param {String} method
   * @param {Array} args
   */
  nuBehaviorCall(method, args= []) {
    const behaviors = this.nuBehaviors;

    if (!behaviors) return;

    Object.values(behaviors).forEach(behavior => {
      if (behavior[method]) {
        behavior[method](...args);
      }
    });
  }

  /**
   *
   * @param {Boolean} [force]
   * @param {Array<String>} [ignoreList]
   * @return {*}
   */
  nuEnsureThemes(force, ignoreList = []) {
    const values = parseAllValues(this.nuGetAttr(THEME_ATTR, true) || '');

    values.forEach((val) => {
      if (ignoreList.includes(val)) return;

      ignoreList.push(val);

      let theme = parseThemeAttr(val);

      const themeName = composeThemeName(theme);
      const key = `theme:${themeName}`;
      const baseTheme = this.nuContext[`theme:${theme.name}`];
      const defaultType = theme.type;

      if (!baseTheme) return;

      if (baseTheme.mods) {
        const { mods } = extractMods(baseTheme.mods || '', ALL_THEME_MODS);

        const typeMod = mods.find(mod => THEME_TYPE_MODS.includes(mod));

        theme = applyDefaultMods(theme, baseTheme.mods);

        if (typeMod) {
          theme.type = defaultType !== 'main' ? defaultType : baseTheme.type;
        }
      }

      if (baseTheme && (!this.nuContext[key] || baseTheme.lazy || force)) {
        if (baseTheme.lazy) {
          baseTheme.lazy = false;
          declareTheme(document.body, baseTheme.name, baseTheme.hue, baseTheme.saturation, baseTheme.pastel, baseTheme.mods || '');
        }

        applyTheme(baseTheme.$context || document.body, {
          hue: baseTheme.hue,
          saturation: baseTheme.saturation,
          pastel: baseTheme.pastel,
          ...theme,
        }, themeName);
      }
    });

    return values;
  }

  /**
   * Get parent that satisfies specified selector
   * @param {String} selector
   */
  nuQueryParent(selector) {
    return getParent(this, selector);
  }

  /**
   * Get closest element that satisfies specified selector
   * @param {String} selector
   */
  nuQuery(selector) {
    return query(this, selector);
  }

  /**
   * Get closest element that satisfies specified selector
   * @param {String} id
   * @param {Boolean} [includeNames]
   */
  nuQueryById(id, includeNames) {
    return queryById(this, id, includeNames);
  }

  /**
   * Called when element parent changed its context.
   */
  nuContextChanged(name) {
    const hooks = this.nuContextHooks;

    if (!hooks || !hooks[name]) return;

    hooks[name](this.nuParentContext[name]);

    log('hook fired', {
      el: this,
      hook: name,
    });
  }

  nuSetContext(name, value, force) {
    if (!this.nuContext) {
      if (!this.nuContextTemp) {
        this.nuContextTemp = {};
      }

      this.nuContextTemp[name] = value;

      return;
    } else {
      const oldValue = this.nuContext[name];

      if (value == null) {
        if (name in this.nuContext) {
          delete this.nuContext[name];
        } else if (!force) {
          return;
        }
      } else if (!isEqual(oldValue, value) || force) {
        this.nuContext[name] = value;
      } else {
        return;
      }

      const elements = this.nuDeepQueryAll('[nu]');

      elements.forEach(el => el.nuContextChanged(name));
    }

    log('context changed', {
      el: this,
      name, value,
    });
  }

  nuSetContextHook(name, hook, runOnInit) {
    if (!hook) return;

    if (!this.nuContextHooks) {
      this.nuContextHooks = {};
    }

    if (!this.nuContextHooks) {
      this.nuContextHooks = {};
    }

    const cache = this.nuParentContext && this.nuParentContext[name];

    if (runOnInit) {
      hook(cache);
    }

    this.nuContextHooks[name] = hook;
  }

  nuSetDisconnectedHook(hook) {
    if (!hook) return;

    if (!this.nuDisconnectedHooks) {
      this.nuDisconnectedHooks = [];
    }

    this.nuDisconnectedHooks.push(hook);
  }

  nuHasContextHook(name) {
    return this.nuContextHooks && this.nuContextHooks[name];
  }

  /**
   * @typedef VerifyOptions
   * @property vars {boolean}
   * @property responsive {boolean}
   * @property attrs {string}
   * @property shadow {boolean}
   * @property ignore {null|Array<string>}
   */

  /**
   *
   * @param options {null|VerifyOptions}
   */
  nuVerifyChildren(options) {
    const selectors = ['[shadow-root]'];

    const force = options === true;
    const { vars, responsive, attrs, shadow } = options;
    const ignore = options.ignore;

    if (!this.nuIsConnectionComplete) return;

    if (force) {
      selectors.push('[nu]', '[shadow-root]');
    } else {
      if (responsive) {
        selectors.push(`[is-${RESPONSIVE_MOD}="${this.nuUniqId}"]`);
      }

      if (attrs) {
        selectors.push(attrs);
      }

      if (shadow) {
        selectors.push('[shadow-root]');
      }
    }

    const selector = selectors.join(', ');
    const elements = this.querySelectorAll(selector);

    log('verify children', { vars, responsive, attrs, shadow, selector });

    [this, ...elements].forEach(el => {
      if (ignore && ignore.includes(el)) return;

      if (el.nuApplyCSS) {
        [...el.attributes].forEach(({ name, value }) => {
          if (name === RESPONSIVE_ATTR) return;

          if (vars || responsive) {
            el.attributeChangedCallback(name, null, value, true);
          }
        });
      }

      if (attrs && el.nuSetContextAttrs) {
        log('apply context attrs', { el });

        if (this !== el && el.nuApply) {
          el.nuApply();
        }

        if (el.nuSetContextAttrs) el.nuSetContextAttrs();
      }

      if (shadow && el.nuShadow) {
        el.nuShadow.nuVerifyChildren(options);
      }
    });
  }

  /**
   * Write message to the console.
   * Works only if `debug` attribute is presented on the element.
   * @param args
   */
  nuDebug(...args) {
    if (devMode) {
      if (this.hasAttribute('debug')) {
        log({ $: this }, ...args);
      }
    } else {
      warn$1('forgot nuDebug() call in production');
    }
  }

  /**
   * Return responsive definition for the styles set.
   * @returns {*}
   */
  nuResponsive() {
    const points = this.getAttribute(RESPONSIVE_ATTR);

    if (this.nuReponsiveFor === points) return this.nuResponsiveDecorator;

    this.nuReponsiveFor = points;

    if (!points) {
      return (this.nuResponsiveDecorator = styles => styles);
    }

    const tmpPoints = points.split(/\|/);

    const mediaPoints = tmpPoints.map((point, i) => {
      if (!i) {
        return `@media (min-width: ${point})`;
      }

      const prevPoint = tmpPoints[i - 1];

      return `@media (max-width: ${decPoint(prevPoint)}) and (min-width: ${point})`;
    });

    mediaPoints.push(`@media (max-width: ${decPoint(tmpPoints.slice(-1)[0])})`);

    return (this.nuResponsiveDecorator = styles => {
      return mediaPoints
        .reduce((arr, point, i) => {
          const stls = styles[i];

          if (!stls) return arr;

          stls.forEach(rule => {
            if (rule) {
              arr.push(`${point}{\n${rule}\n}\n`);
            }
          });

          return arr;
        }, []);
    });
  }

  /**
   * Scroll to element.
   * @param id
   */
  nuScrollTo(id) {
    if (!id) return;

    const element = this.nuQueryById(id);

    if (element) {
      scrollTo(0, element.getBoundingClientRect().y + window.pageYOffset);
    }
  }

  nuApplyAttr(attrName) {
    if (!this.nuApplyAttrs) {
      this.nuApplyAttrs = [];
    }

    if (!this.nuApplyAttrs.includes(attrName)) {
      this.nuApplyAttrs.push(attrName);
    }
  }

  nuReapplyCSS() {
    if (!this.nuIsConnected) return;

    [...this.attributes].forEach(({ name, value }) => {
      if (value == null || !this.constructor.nuAllGenerators[name]) return;

      this.nuApplyCSS(name);
    });
  }

  attachShadow() {
    const shadow = HTMLElement.prototype.attachShadow.call(this, { mode: 'open' });

    this.nuShadow = shadow;

    Object.assign(shadow, {
      nuContext: Object.create(this.nuContext),
      nuSetContext: this.nuSetContext,
      nuVerifyChildren: this.nuVerifyChildren,
      nuDeepQuery: this.nuDeepQuery,
      nuDeepQueryAll: this.nuDeepQueryAll,
      nuIsConnectionComplete: true,
      nuIsConnected: true,
    });

    Object.assign(shadow.nuContext, {
      $shadowRoot: this.nuShadow,
      $parentShadowRoot: this.nuContext.$shadowRoot || null,
    });

    this.setAttribute('shadow-root', '');

    setImmediate(() => {
      this.nuAttachShadowCSS();
    });

    return shadow;
  }

  nuSetContextAttrs() {
    if (!this.nuIsConnected || this.constructor.nuNames.includes('definition')) return;

    if (!this.nuContextAttrs) {
      this.nuContextAttrs = new Set;
    }

    const context = this.nuParentContext;
    const as = this.getAttribute('as');
    const id = this.getAttribute('nu-id');

    /**
     * @type {Set<String>}
     */
    const contextAttrs = this.nuContextAttrs;
    const keys = [`attrs:${this.constructor.nuTag}`];
    const $shadowRoot = context.$shadowRoot;
    const $parentShadowRoot = context.$parentShadowRoot;
    const names = this.constructor.nuNames;

    if (as) {
      as.split(/\s+/g).forEach(name => {
        keys.push(`attrs:${name}`);
      });
    }

    if (names.length) {
      names.forEach(name => {
        keys.push(`attrs:${name}`);
      });
    }

    if (id) {
      keys.push(`attrs:${id}`);
    }

    const attrSets = keys.map(key => context[key]).filter(set => set);

    const attrs = {};

    attrSets.forEach(set => {
      if ($shadowRoot && $shadowRoot !== set.$shadowRoot) return;

      Object.assign(attrs, set);
    });

    if ($shadowRoot && id) {
      const shadowAttrs = context[`attrs:$${id}`];

      if (shadowAttrs && shadowAttrs.$shadowRoot === $parentShadowRoot) {
        Object.assign(attrs, shadowAttrs);
      }

      const deepShadowAttrs = context[`attrs:$$${id}`];

      if (deepShadowAttrs && deepShadowAttrs.$shadowRoot !== $shadowRoot) {
        Object.assign(attrs, deepShadowAttrs);
      }
    }

    delete attrs.$shadowRoot;

    if (!Object.keys(attrs).length && !contextAttrs.size) {
      return;
    }

    const clearAttrs = new Set(contextAttrs);

    Object.keys(attrs).forEach(name => {
      if (name.startsWith('$')) return;

      let value = attrs[name];

      const force = value && value.startsWith('!');

      if (force) {
        value = value.slice(1);
      }

      if ((!this.hasAttribute(name)) || force) {
        if (!contextAttrs.has(name)) {
          contextAttrs.add(name);
        }

        this.setAttribute(name, value);
      } else if (contextAttrs.has(name)) {
        this.setAttribute(name, value);
      }

      clearAttrs.delete(name);
    });

    clearAttrs.forEach(name => {
      this.removeAttribute(name);
    });
  }

  nuCreateContext() {
    let parent = this.parentNode;

    while (parent && !parent.nuContext && parent !== document.body) {
      parent = parent.parentNode;
    }

    if (this.nuContext) {
      this.nuContextTemp = this.nuContext;
    }

    if (parent && parent.nuContext) {
      const temp = this.nuContext;

      this.nuParentContext = parent.nuContext;

      this.nuContext = Object.create(parent.nuContext);

      if (temp) {
        Object.assign(this.nuContext, temp);
      }

      this.nuSetMod('root', false);
    } else {
      this.nuContext = Object.create(CONTEXT);
      this.nuSetMod('root', true);

      this.nuParentContext = CONTEXT;

      applyTheme(this, BASE_THEME, 'main');
    }

    if (this.nuContextTemp) {
      Object.assign(this.nuContext, this.nuContextTemp);
    }

    delete this.nuContextTemp;
  }

  nuDeepQuery(selector) {
    return deepQuery(this, selector);
  }

  nuDeepQueryAll(selector) {
    return deepQueryAll(this, selector);
  }

  nuQueryChildren(selector) {
    return queryChildren(this, selector);
  }

  /** Behavior System **/

  /**
   * Require behavior
   * @param name {String} - Behavior name
   * @param [value] {String} - Options string
   * @return {null|Behavior}
   */
  nuUse(name, value) {
    const allBehaviors = this.constructor.nuAllBehaviors;

    const attrValue = this.getAttribute(`use-${name}`);
    const behavioursAttrValue = this.getAttribute('use-behaviors');

    if (isNoValue(attrValue) || isNoValue(behavioursAttrValue)) return Promise.resolve();

    let options = `${allBehaviors[name] || ''} ${value || ''}`;

    if (!this.nuBehaviors) {
      this.nuBehaviors = {};
    }

    if (!this.nuBehaviorPromises) {
      this.nuBehaviorPromises = {};
    }

    // search among behavior instances
    let behavior = this.nuBehaviors[name];

    if (behavior) return Promise.resolve(behavior);

    // search among behavior promises
    let behaviorPromise = this.nuBehaviorPromises[name];

    if (behaviorPromise) return behaviorPromise;

    // request Mixin class and create new instance
    return this.nuBehaviorPromises[name] = behaviors.get(name).then(Behavior => {
      if (!Behavior) {
        throw error('behavior not found', Behavior);
      }

      behavior = new Behavior(this, options);

      this.nuBehaviors[name] = behavior;

      behavior.$$name = name;

      // call hooks
      if (behavior.init) {
        behavior.init();
      }

      if (this.nuIsConnected && behavior.connected) {
        behavior.connected();
      }

      return behavior;
    });
  }

  nuRender() {
    const template = this.constructor.nuCachedTemplate;

    if (!template) return;

    let host = this;

    if (this.nuIsShadowAllowed) {
      host = this.attachShadow({ mode: 'open' });
    } else {
      this.nuSetMod('host', true);
    }

    const temp = h$1('template');

    temp.innerHTML = template;

    host.appendChild(temp.content);
  }

  get nuIsShadowAllowed() {
    const allowGlobal = !!HTMLElement.prototype.attachShadow;
    const allowContext = this.nuContext.allowShadow;
    const allowOption = this.constructor.nuShadowRoot;
    const shadowRootAttr = this.getAttribute('shadow-root');
    const allowAttr = !['n', 'no'].includes(shadowRootAttr);

    if (!allowGlobal) return;

    return allowContext
      && (allowOption || allowOption == null || (allowOption === false && allowAttr));
  }

  nuAttachShadowCSS() {
    if (!this.nuShadow) return;

    const shadowCSS = this.constructor.nuExtractCSS(this.constructor, ':host');
    const tag = this.constructor.nuTag;

    if (shadowCSS) {
      insertRuleSet(
        `shadow:${tag}`,
        shadowCSS,
        this.nuShadow,
      );
    }

    insertRuleSet(
      `shadow:${tag}:outline`,
      [`:host([is-outline]) [nu], :host([is-outline]) [nu-contents] > *, :host([is-outline][nu-contents]) > * { outline: var(--border-width, 1px) solid var(--outline-color) !important; }`],
      this.nuShadow,
    );

    const hostCSSName = `${tag}:host`;

    if (!hasRuleSet(hostCSSName)) {
      this.constructor.nuGenerateDefaultStyle(true);
    }

    transferCSS(hostCSSName, this.nuShadow);

    const generators = this.constructor.nuAllGenerators;

    [...this.attributes].forEach(({ name, value }) => {
      if (!generators[name]) return;

      this.nuApplyCSS(name, null, false, true);
    });
  }

  get nuDisabled() {
    return this.hasAttribute('disabled');
  }

  set value(val) {
    if (this.nuSetValue) {
      this.nuSetValue(val, true);
    } else {
      this._value = val;
    }
  }

  get value() {
    return this.nuGetValue ? this.nuGetValue() : this._value;
  }

  set assert(val) {
    if (this.nuSetAssert) {
      this.nuSetAssert(val);
    } else {
      this._assert = val;
    }
  }

  get assert() {
    return this.nuGetAssert ? this.nuGetAssert() : this._assert;
  }

  set disabled(val) {
    setBoolAttr(this, 'disabled', val);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set hidden(val) {
    setBoolAttr(this, 'hidden', val);
  }

  get hidden() {
    return this.hasAttribute('hidden');
  }

  set pressed(val) {
    setBoolAttr(this, 'pressed', val);
  }

  get pressed() {
    return this.hasAttribute('pressed');
  }

  set checked(val) {
    this.pressed = val;
  }

  get checked() {
    return this.pressed;
  }

  set selected(val) {
    this.pressed = val;
  }

  get selected() {
    return this.pressed;
  }

  set special(val) {
    setBoolAttr(this, 'special', val);
  }

  get special() {
    return this.hasAttribute('special');
  }

  set danger(val) {
    setBoolAttr(this, 'danger', val);
  }

  get danger() {
    return this.hasAttribute('danger');
  }

  set warning(val) {
    setBoolAttr(this, 'warning', val);
  }

  get warning() {
    return this.hasAttribute('warning');
  }

  set success(val) {
    setBoolAttr(this, 'success', val);
  }

  get success() {
    return this.hasAttribute('success');
  }

  focus() {
    const ref = this.nuRef || this;

    HTMLElement.prototype.focus.call(ref);
  }

  blur() {
    const ref = this.nuRef || this;

    HTMLElement.prototype.blur.call(ref);
  }

  select() {
    if (this.nuRef && this.nuRef.select) {
      this.nuRef.select();
    }
  }

  // get asList() {
  //   if (!this._asList) {
  //     const host = this;
  //
  //     this._asList = {
  //       values() {
  //         let attr = host.getAttribute('as');
  //
  //         if (attr) {
  //           attr = attr.trim();
  //         }
  //
  //         return attr ? attr.split(/\s+/g) : [];
  //       },
  //       contains(name) {
  //         return this.values().includes(name);
  //       },
  //       add(name) {
  //         const names = this.values();
  //
  //         if (!names.includes(name)) {
  //           names.push(name);
  //
  //           host.setAttribute('as', names.join(' '));
  //         }
  //       },
  //       remove(name) {
  //         const names = this.values();
  //
  //         if (names.includes(name)) {
  //           names.splice(names.indexOf(name), 1);
  //
  //           host.setAttribute('as', names.join(' '));
  //         }
  //       },
  //     };
  //   }
  //
  //   return this._asList;
  // }
}

const SHADOW = 'rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)';
const TRANSPARENT = 'rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 0)';

function shadowAttr(val, defaults, options = {}) {
  const {
    shadow, // default shadow color
    defaultValue, // default size value
    inset, // is it inset shadow?
    ignoreSpread,
  } = options;

  if (isYesValue(val)) {
    val = '';
  } else if (isNoValue(val)) {
    val = '0 #shadow.0';
  }

  const propName = `--local-${inset ? 'inset' : 'depth'}-shadow`;

  let { values, mods, color } = parseAttr(val, 1);

  let value;

  if (mods.length) {
    const name = mods[0];
    value = `${prop(`${name}-shadow`)} ${color || ''}${inset ? ' inset' : ''}`;
  } else {
    color = color || shadow || (isNoValue(val) ? TRANSPARENT : SHADOW);

    let size = defaultValue || '1rem';
    let x = '0';
    let y = inset ? '0' : `calc(${size} / 3)`;
    let spread = '0';

    if (values.length === 1) {
      size = values[0];
      y = inset ? '0' : `calc(${size} / 3)`;
    } else if (values.length >= 2) {
      x = values[0];
      y = values[1];

      if (values[2]) {
        size = values[2];
      }

      if (values[3]) {
        spread = values[3];
      }
    }

    value = `${x} ${y} ${size}${ignoreSpread ? '' : ` ${spread}`} ${color}${inset ? ' inset' : ''}`;
  }

  const styles = {
    [propName]: value,
  };

  return styles;
}

const MAP$3 = {};

function set(name, styles) {
  MAP$3[name] = styles;
}

['i', 'italic'].forEach(name => set(name, { 'font-style': 'italic' }));
['ni', 'nonItalic'].forEach(name => set(name, { 'font-style': 'normal' }));
['u', 'underline'].forEach(name => set(name, { 'text-decoration-line': 'underline' }));
set('overline', { 'text-decoration-line': 'overline' });
set('underover', { 'text-decoration-line': 'underline overline' });
['del', 'lineThrough'].forEach(name => set(name, { 'text-decoration-line': 'line-through' }));
['dotted', 'wavy', 'dashed']
  .forEach(name => set(name, { 'text-decoration-style': name }));
['nd', 'noDecoration'].forEach(name => set(name, { 'text-decoration': 'none' }));
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(index => set(`w${index}`, { '--font-weight': `${index}00` }));
['up', 'uppercase'].forEach(name => set(name, { 'text-transform': 'uppercase' }));
['low', 'lowercase'].forEach(name => set(name, { 'text-transform': 'lowercase' }));
['cap', 'capitalize'].forEach(name => set(name, { 'text-transform': 'capitalize' }));

['baseline', 'sub', 'sup', 'middle', 'top', 'bottom', 'textTop', 'textBottom'].forEach(name => set(name, { 'vertical-align': name === 'sup' ? 'super' : name }));

set('vMiddle', { 'vertical-align': 'var(--inline-offset)' });

['left', 'right', 'center', 'justify'].forEach(name => set(name, { 'text-align': name }));

set('monospace', { 'font-family': 'var(--monospace-font)', 'word-spacing': 'normal' });
set('spacing', (val) => ({ 'letter-spacing': parseAttr(val || '1bw').value }));
set('shadow', (val, defaults) => ({ 'text-shadow': shadowAttr(val, defaults, { ignoreSpread: true })['--local-depth-shadow'] || 'initial' }));
set('color', (val) => ({ 'text-decoration-color': val }));
set('ellipsis', {
  'max-width': '100%',
  'overflow': 'hidden',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
});
set('tabularNums', {
  'font-variant-numeric': 'tabular-nums',
});

set('wrap', { 'white-space': 'normal' });
set('nowrap', { 'white-space': 'nowrap' });
set('pre', { 'white-space': 'pre' });
set('preWrap', { 'white-space': 'pre-wrap' });
set('preLine', { 'white-space': 'pre-line' });
set('breakSpaces', { 'white-space': 'break-spaces' });

['inherit'].forEach(name => set(name, {
  'font-family': 'inherit',
  'font-weight': 'inherit',
  'font-style': 'inherit',
  'white-space': 'inherit',
  'text-decoration': 'inherit',
  'letter-spacing': 'inherit',
  'text-transform': 'inherit',
}));
['normal', 'n'].forEach(name => set(name, {
  'font-family': 'var(--font)',
  'font-weight': 'var(--normal-font-weight)',
  'font-style': 'initial',
  'white-space': 'normal',
  'text-decoration': 'none',
  'letter-spacing': 'normal',
  'text-transform': 'none',
}));
['bold', 'b'].forEach(name => set(name, { 'font-weight': 'var(--bold-font-weight)' }));
['semiBold', 'sb'].forEach(name => set(name, { 'font-weight': 'var(--semi-bold-font-weight)' }));
['light', 'l'].forEach(name => set(name, { 'font-weight': 'var(--light-font-weight)' }));
['heading', 'h'].forEach(name => set(name, { 'font-weight': 'var(--heading-font-weight)' }));
set('bolder', { 'font-weight': 'calc(var(--font-weight) + var(--font-weight-step))' });
set('lighter', { 'font-weight': 'calc(var(--font-weight) - var(--font-weight-step))' });

/**
 * Apply text modifiers.
 * @param {String} val - String that contains modifiers separated by space.
 */
function textAttr(val, defaults) {
  const mods = parseParams(val);

  const styles = {};

  Object.keys(mods)
    .forEach(mod => {
      if (!MAP$3[mod]) {
        if (devMode) {
          warn$1('[text]: modifier not found', mod);
        }

        return;
      }

      let value = mods[mod];

      if (!value) {
        return;
      }

      if (value === true) {
        value = undefined;
      }

      const modStyles = typeof MAP$3[mod] === 'function' ? MAP$3[mod](value, defaults) : MAP$3[mod];
      const keys = Object.keys(modStyles);

      keys.forEach(key => {
        styles[key] = modStyles[key];
      });
    });

  if (!styles['font-weight'] && styles['--font-weight']) {
    styles['font-weight'] = 'var(--font-weight, inherit)';
  }

  if (styles['text-decoration-style'] && !styles['text-decoration-line']) {
    styles['text-decoration-line'] = 'underline';
  }

  if (!styles['--font-weight'] && styles['font-weight'] && !styles['font-weight'].includes('--font-weight')) {
    styles['--font-weight'] = styles['font-weight'];
  }

  return styles;
}

const PLACE_ATTR = 'place';

const PLACE_VALUES = [
  'content', 'items', 'self'
].map((name) => {
  return CSS.supports(`place-${name}`, 'stretch stretch')
    ? function (val) {
      return {
        [`place-${name}`]: parseAttr(val).value,
      };
    } : function (val) {
      const values = parseAttr(val).values;

      return val ? {
        [`align-${name}`]: values[0],
        [`justify-${name}`]: values[1] || values[0],
      } : null;
    };
});

const PLACE_ABS_OUTSIDE = [
  'outside-top', 'outside-right', 'outside-bottom', 'outside-left',
];

const PLACE_ABS_CENTER = [
  'center-top', 'center-right', 'center-bottom', 'center-left',
];

const PLACE_ABS_CENTER_STYLES = {
  'center-top': { y: '-50%' },
  'center-right': { x: '50%' },
  'center-bottom': { y: '50%' },
  'center-left': { x: '-50%' },
};

const PLACE_ABS_INSIDE = [
  'top', 'right', 'bottom', 'left',
];

const PLACE_ABS = [
  'absolute',
  'inside',
  'cover',
  'fixed',
  ...PLACE_ABS_INSIDE,
  ...PLACE_ABS_OUTSIDE,
  ...PLACE_ABS_CENTER,
];

const FILL_STYLES = [{
  'width': '100%',
  'height': '100%',
  'align-self': 'stretch',
  'justify-self': 'stretch',
}, {
  $suffix: ':not([radius])',
  '--local-radius': '0',
}, {
  $suffix: ':not([border])',
  'border': 'none',
  '--local-border-shadow': 'inset 0 0 0 0 var(--border-color)',
}];

const COVER_STYLES = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
};

const OTHER_ATTRS = TransformCombinator().attrs.filter(attr => attr !== PLACE_ATTR);
const DEFAULT_TRANSFORM = { '--transform-place': 'translate(0, 0)' };
const DEFAULT_POSITION = { '--place-position': 'initial' };
const NOT_OTHER_SELECTOR = OTHER_ATTRS.map(attr => `:not([${attr}])`).join('');
const SECONDARY_DEFAULT_STYLES = [{
  $suffix: NOT_OTHER_SELECTOR,
  '--transform-place': 'none',
}, ...OTHER_ATTRS.map(attr => {
  return {
    $suffix: `[${attr}]`,
    ...DEFAULT_TRANSFORM,
  };
})];

function getEmptyStyles(defaults, skipPosition) {
  const defaultAttr = OTHER_ATTRS.find(attr => defaults[attr] != null);

  if (defaultAttr) {
    const styles = [DEFAULT_TRANSFORM];

    if (!skipPosition) {
      styles.push(DEFAULT_POSITION);
    }

    return styles;
  }

  /**
   * @type {Array<Object>}
   */
  const styles =  SECONDARY_DEFAULT_STYLES.map(styles => ({ ...styles }));

  if (!skipPosition) {
    styles.push(DEFAULT_POSITION);
  }

  return styles;
}

function placeAttr(val, defaults) {
  if (!val) return getEmptyStyles(defaults);

  let { mods, values } = parseAttr(val, 1);

  const offsetY = values[0] || '0';
  const offsetX = values[1] || values[0] || '0';

  let pos = '';

  if (mods.includes('float-left')) {
    return [{ float: 'left' }, ...getEmptyStyles(defaults)];
  }

  if (mods.includes('float-right')) {
    return [{ float: 'right' }, ...getEmptyStyles(defaults)];
  }

  if (mods.includes('sticky')) {
    return [{
      '--place-position': 'sticky',
      ...DIRECTIONS$1.reduce((map, dir, i) => {
        if (mods.includes(dir)) {
          map[dir] = (i % 2) ? offsetX : offsetY;
        }

        return map;
      }, {}),
    }, ...getEmptyStyles(defaults, true)];
  }

  const abs = PLACE_ABS.find(place => mods.includes(place));

  if (mods.includes('fill')) {
    if (devMode && mods.length > 1) {
      warn('[place] fill modifier can\'t be combined with others', val);
    }

    // copy FILL_STYLES
    return [
      FILL_STYLES[0],
      { ...FILL_STYLES[1] },
      { ...FILL_STYLES[2] },
      ...getEmptyStyles(defaults),
    ];
  }

  if (abs) {
    const styles = {
      '--place-position': mods.includes('fixed') ? 'fixed' : 'absolute',
      margin: '0 !important',
    };
    let transX = 0;
    let transY = 0;

    if (mods.includes('cover')) {
      return [{
        ...styles,
        ...COVER_STYLES,
      }, ...getEmptyStyles(defaults, true)];
    }

    PLACE_ABS_INSIDE.forEach((place, i) => {
      if (!mods.includes(place)) return;

      styles[place] = (i % 2) ? offsetX : offsetY;
      delete styles[PLACE_ABS_INSIDE[(PLACE_ABS_INSIDE.indexOf(place) + 2) % 4]];

      if (i % 2 && !styles.top && !styles.bottom) {
        styles.top = '50%';
      }

      if (i % 2 === 0 && !styles.left && !styles.right) {
        styles.left = '50%';
      }
    });

    PLACE_ABS_OUTSIDE.forEach((place, i) => {
      if (!mods.includes(place)) return;

      const offset = stripCalc((i % 2) ? offsetX : offsetY);

      styles[PLACE_ABS_INSIDE[(PLACE_ABS_OUTSIDE.indexOf(place) + 2) % 4]] = offset === '0' ? '100%' : `calc(100% + ${offset})`;
      delete styles[PLACE_ABS_INSIDE[PLACE_ABS_OUTSIDE.indexOf(place)]];

      if (i % 2 && !styles.top && !styles.bottom) {
        styles.top = '50%';
      }

      if (i % 2 === 0 && !styles.left && !styles.right) {
        styles.left = '50%';
      }
    });

    PLACE_ABS_CENTER.forEach((place, i) => {
      if (!mods.includes(place)) return;

      styles[PLACE_ABS_INSIDE[PLACE_ABS_CENTER.indexOf(place)]] = '0';
      delete styles[PLACE_ABS_INSIDE[(PLACE_ABS_CENTER.indexOf(place) + 2) % 4]];

      if (PLACE_ABS_CENTER_STYLES[place].x) {
        transX = PLACE_ABS_CENTER_STYLES[place].x;
      }

      if (PLACE_ABS_CENTER_STYLES[place].y) {
        transY = PLACE_ABS_CENTER_STYLES[place].y;
      }

      if (i % 2 && !styles.top && !styles.bottom) {
        styles.top = '50%';
      }

      if (i % 2 === 0 && !styles.left && !styles.right) {
        styles.left = '50%';
      }
    });

    if (mods.includes('inside')) {
      if (!styles.left) {
        styles.left = '50%';
      }

      if (!styles.top) {
        styles.top = '50%';
      }
    }

    if (styles.left === '50%' && offsetX !== '50%') {
      transX = '-50%';
    }

    if (styles.top === '50%' && offsetY !== '50%') {
      transY = '-50%';
    }

    styles['--transform-place'] = `translate(${transX}, ${transY})`;

    return [styles];
  }

  let styles = [];
  let placeVal = mods.join(' ');

  if (placeVal) {
    styles = [PLACE_VALUES[2](placeVal)];
  }

  styles.push(...getEmptyStyles(defaults, !!pos));

  return styles;
}

const DEFAULT_STROKE_SHADOW = '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)';

const STROKE_STYLES = [
  'inside',
  'center',
  'outside',
];

const BORDER_STYLES = [
  ...STROKE_STYLES,
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

const DIRECTIONS = ['top', 'right', 'bottom', 'left'];
const DIRECTIONS_HANDLERS = {
  top(val, outside) {
    return `0 calc(${val} * ${outside ? -1 : 1})`;
  },
  right(val, outside) {
    return `calc(${val} * ${outside ? 1 : -1}) 0`;
  },
  bottom(val, outside) {
    return `0 calc(${val} * ${outside ? 1 : -1})`;
  },
  left(val, outside) {
    return `calc(${val} * ${outside ? -1 : 1}) 0`;
  },
};

function borderAttr(val) {
  if (val == null) return val;

  if (isYesValue(val)) {
    val = '';
  }

  if (isNoValue(val)) {
    val = '0';
  }

  let style = 'solid';
  let dirs = [];
  let colorStyles = {};

  let { values, mods, color } = parseAttr(val, 1);

  if (color) {
    colorStyles = { '--local-border-color': color };
  } else {
    color = 'var(--border-color)';
  }

  for (let s of BORDER_STYLES) {
    if (mods.includes(s)) {
      style = s;
    }
  }

  for (let s of DIRECTIONS) {
    if (mods.includes(s)) {
      dirs.push(s);
    }
  }

  let size = values[0] || 'var(--border-width)';

  if (style === 'center') {
    size = `calc((${stripCalc(size)}) / 2)`;
  }

  if (style === 'hidden') {
    style = 'solid';
    color = 'transparent';
  }

  if (STROKE_STYLES.includes(style)) {
    if (dirs.length) {
      return {
        '--local-stroke-shadow': dirs.map(dir => {
          let pos = DIRECTIONS_HANDLERS[dir];

          return `${style !== 'inside' ? pos(size, true) : '0 0'} 0 ${dirs.length ? 0 : size} ${color},
                  inset ${style !== 'outside' ? pos(size) : '0 0'} 0 ${dirs.length ? 0 : size} ${color}`;
        }).join(','),
      };
    }

    return {
      '--local-stroke-shadow': `0 0 0 ${style !== 'inside' ? size : 0} ${color},
            inset 0 0 0 ${style !== 'outside' ? size : 0} ${color}`,
    };
  }

  const border = `${size} ${style} ${color}`;

  if (dirs.length) {
    return dirs.reduce((styles, dir) => {
      styles[`border-${dir}`] = border;

      return styles;
    }, {
      '--local-stroke-shadow': DEFAULT_STROKE_SHADOW,
    });
  }

  return {
    ...colorStyles,
    border,
    '--local-stroke-shadow': DEFAULT_STROKE_SHADOW };
}

const FLEX_MAP = {
  row: 'margin-right',
  column: 'margin-bottom',
  'row-reverse': 'margin-left',
  'column-reverse': 'margin-top',
};

const FLEX_MAP_SECOND = {
  row: 'margin-bottom',
  column: 'margin-right',
  'row-reverse': 'margin-top',
  'column-reverse': 'margin-left',
};

function getLocalProp(dir, invert = false) {
  return (invert ^ dir.includes('row')) ? 'var(--local-h-gap)' : 'var(--local-v-gap)';
}

function getProp(dir, invert = false) {
  return (invert ^ dir.includes('row')) ? 'var(--h-gap)' : 'var(--v-gap)';
}

const MOD_LIST = Object.keys(FLEX_MAP).concat(['wrap', 'nowrap']);

/**
 * CSS Flow value. Used for flex and grid layouts.
 * @param val
 * @param defaults
 * @returns {*[]}
 */
function flowAttr(val, defaults) {
  if (!val) {
    if (defaults.flow) {
      val = defaults.flow;
    } else {
      return;
    }
  }

  const { mods } = extractMods(val, MOD_LIST);
  const dir = mods.find(mod => FLEX_MAP[mod]);

  if (!dir) return;

  const isGridValue = CSS.supports('grid-auto-flow', val);
  const isFlexValue = CSS.supports('flex-flow', val);

  const styles = [];
  const hasGap = defaults.gap != null;

  if (isGridValue) {
    styles.push({
      'grid-auto-flow': val,
    });
  }

  if (isFlexValue) {
    const dirStyle = FLEX_MAP[dir];
    const dirProp = getProp(dir);

    styles.push({
      'flex-flow': mods.join(' '),
    });

    if (!mods.includes('wrap')) {
      styles.push({
        $suffix: `${hasGap ? '' : '[gap]'}>:not(:last-child)`,
        [dirStyle]: dirProp,
      }, {
        $suffix: `${hasGap ? '' : '[gap]'}>:not(:last-child)[nu-contents]>:first-child`,
        [dirStyle]: dirProp,
      });
    } else if (!FLEX_GAP_SUPPORTED) {
      const dirSecondStyle = FLEX_MAP_SECOND[dir];
      const invertProp = getProp(dir, true);
      const dirLocalProp = getLocalProp(dir);
      const invertLocalProp = getLocalProp(dir, true);

      styles.push({
        $suffix: ':not(:empty)',
        [dirStyle]: `calc(${dirLocalProp} * -1)`,
        [dirSecondStyle]: `calc(${invertLocalProp} * -1)`,
      });

      styles.push({
        $suffix: `${hasGap ? '' : '[gap]'}>*`,
        [dirStyle]: dirProp,
        [dirSecondStyle]: invertProp,
      }, {
        $suffix: `${hasGap ? '' : '[gap]'}>[nu-contents]>:first-child`,
        [dirStyle]: dirProp,
        [dirSecondStyle]: invertProp,
      });
    }
  }

  return styles;
}

const Z_MAP = {
  '': '0',
  '-': 'initial',
  'no': 'initial',
  'below': '-1',
  'above': '1',
  'front': '9999',
  'max': '99999',
  'back': '-9999',
  'min': '-99999',
};

function zAttr(val) {
  if (val == null) return;

  return {
    'z-index': Z_MAP[val] || val,
  };
}

function interactiveAttr(val) {
  if (val == null) return;

  return {
    'pointer-events': val === 'no' || val === 'n' ? 'none' : 'auto',
  };
}

const SIZINGS = {
  content: 'content-box',
  border: 'border-box',
};

function sizingAttr(val, defaults) {
  val = SIZINGS[val];

  if (!val) {
    if (defaults.sizing) {
      return {
        'box-sizing': defaults.sizing,
      }
    } else {
      return;
    }
  }

  return { 'box-sizing': val };
}

const SIZES = {
  xxs: [.666, 1],
  xs: [.75, 1],
  sm: [.875, 1.5],
  md: [1, 1.5],
  lg: [1.125, 1.75],
  xl: [1.25, 2],
  xxl: [1.5, 2.25],
  h1: [2.5, 3],
  h2: [2.25, 3],
  h3: [1.75, 2.5],
  h4: [1.5, 2],
  h5: [1.25, 2],
  h6: [1, 1.5],
  hero: [3, 4],
};

let PROPS = '';

Object.keys(SIZES).forEach(size => {
  const arr = SIZES[size];

  PROPS += `--${size}-font-size: ${arr[0]}rem;
--${size}-line-height: ${arr[1]}rem;`;
});

insertRuleSet('nu-sizes', [`:root{${PROPS}`]);

const BASE_STYLES = {
  'font-size': 'var(--font-size)',
  'line-height': 'var(--line-height)',
};

/**
 * @param {String} val
 * @param {Object} defaults
 * @param {Boolean} [propsOnly]
 * @return {Array<Object>|undefined}
 */
function sizeAttr(val, defaults, propsOnly) {
  if (!val) val = 'md';

  const { mods, all, values } = parseAttr(val, 1);
  const styles = {};
  const mod = all[0];

  if (mod === 'smaller') {
    return [{
      'font-size': 'calc(var(--font-size) / 1.5)',
    }];
  } else if (mod === 'bigger') {
    return [{
      'font-size': 'var(--line-height)',
    }];
  }

  all[1] = all[1] || all[0];

  if (values.includes(all[0])) {
    let value = all[0];

    styles['--font-size'] = value === '-' ? 'inherit' : value;
  } else if (mods.includes(all[0])) {
    styles['--font-size'] = `var(--${all[0]}-font-size, inherit)`;
  } else {
    return;
  }

  if (values.includes(all[1])) {
    let value = all[1];

    styles['--line-height'] = value === '-' ? 'inherit' : value;
  } else if (mods.includes(all[1])) {
    styles['--line-height'] = `var(--${all[1]}-line-height, inherit)`;
  }

  return (propsOnly ? [] : [BASE_STYLES]).concat(styles);
}

const MAP$2 = {
  move: ['transform'],
  rotate: ['transform'],
  scale: ['transform'],
  place: ['transform', 'top', 'right', 'bottom', 'left'],
  transform: ['transform'],
  fill: ['background-color'],
  border: ['border', 'box-shadow'],
  drop: ['transform'],
  filter: ['filter', 'backdrop-filter'],
  radius: ['border-radius'],
  shadow: ['box-shadow'],
  size: ['font-size', 'line-height'],
  text: ['font-weight', 'text-decoration-color'],
  theme: ['color', 'background-color', 'box-shadow', 'border', 'border-radius'],
  space: ['margin'],
  inset: ['box-shadow'],
  mark: ['box-shadow'],
  width: ['max-width', 'min-width', 'width'],
  height: ['max-height', 'min-height', 'height'],
  gap: ['gap', 'margin'],
  z: ['z-index'],
  image: ['background-image', 'background-position', 'background-size'],
};

const DEFAULT_TIMING = 'calc(var(--transition-enabler) * var(--transition))';
const DEFAULT_EASING = 'linear';

function getTiming(name) {
  return `calc(var(--transition-enabler) * var(--${name}-transition, var(--transition)))`;
}

const tmp = h$1('div').style;

function isStyle(style) {
  return toCamelCase(style) in tmp;
}

function transitionAttr(val) {
  if (val == null || isNoValue(val)) return;

  const transitions = val.split(',');
  const map = {};

  transitions.forEach(transition => {
    const { values, mods } = parseAttr(transition);
    const name = mods[0];
    const easing = mods[1];
    const timing = values[0];

    const styles = MAP$2[name] || (isStyle(name) ? [name] : null);

    if (!styles) {
      if (devMode) {
        warn$1('[transition] incorrect name: ', JSON.stringify(name));
      }
    }

    styles.forEach(style => {
      map[style] = [timing, easing, name];
    });
  });

  const result = Object.entries(map)
    .map(([style, [timing, easing, name]]) => {
      return `${style} ${timing || getTiming(name)} ${easing || DEFAULT_EASING}`;
    }).join(', ');

  return { transition: result };
}

const BG_STYLE = 'background-color';
const LOCAL_PROP = '--local-bg-color';
const LOCAL_VALUE = `var(${LOCAL_PROP}, var(--bg-color))`;
const DIFF_PROP = '--diff-color';
const SHADOW_PROP = '--local-shadow-color';
const SHADOW_RGB_PROP = '--local-shadow-color-rgb';
const MARK_PROP = '--local-mark-color';
const BORDER_PROP = '--local-border-color';
const TEXT_PROP = '--local-text-color';
const SHADOW_VALUE = 'var(--shadow-color)';
const SHADOW_RGB_VALUE = 'var(--shadow-color-rgb)';
const BORDER_VALUE = 'var(--border-color)';
const SPECIAL_BORDER_VALUE = 'var(--special-text-color)';
const SPECIAL_SHADOW_VALUE = 'var(--special-shadow-color)';
const SPECIAL_RGB_SHADOW_VALUE = 'var(--special-shadow-color-rgb)';
const MARK_VALUE = 'var(--mark-color)';
const SPECIAL_MARK_VALUE = 'var(--special-mark-color)';
const BG_VALUE = 'var(--bg-color)';
const SUBTLE_VALUE = 'var(--subtle-color)';
const TEXT_VALUE = ''; // make it invalid
const SPECIAL_TEXT_VALUE = 'var(--special-text-color) !important';

function fillAttr(val) {
  val = convertCustomFuncs(val);

  let { color, name } = parseColor(val);

  if (!val || name === 'local') {
    return [{
      $suffix: ':not([theme])',
      [BG_STYLE]: LOCAL_VALUE,
    }, {
      $suffix: '[theme]',
      [BG_STYLE]: BG_VALUE,
      [LOCAL_PROP]: BG_VALUE,
      [DIFF_PROP]: SUBTLE_VALUE,
    }];
  } else if (!color) {
    const bgValue = `var(--${val}-color)`;

    return [{
      [BG_STYLE]: bgValue,
      [LOCAL_PROP]: bgValue,
    }];
  }

  let styles;

  if (name === 'bg' || name === 'subtle' || name === 'clear') {
    let otherColor;

    if (name === 'bg') {
      otherColor = SUBTLE_VALUE;
    } else {
      otherColor = BG_VALUE;
    }

    styles = [{
      $suffix: '>:not([fill]):not([nu-popup])',
      [BORDER_PROP]: BORDER_VALUE,
    }, {
      [DIFF_PROP]: otherColor,
      [LOCAL_PROP]: color,
      [`--local-bg-color-rgb`]: `var(--${name}-color-rgb, var(--bg-color-rgb))`,
      [SHADOW_PROP]: SHADOW_VALUE,
      [SHADOW_PROP]: SHADOW_RGB_VALUE,
      [TEXT_PROP]: TEXT_VALUE,
      [BG_STYLE]: LOCAL_VALUE,
      [MARK_PROP]: MARK_VALUE,
    }];
  } else {
    styles = [{
      [LOCAL_PROP]: color,
      [BG_STYLE]: LOCAL_VALUE,
    }];

    if (name === 'special-bg') {
      styles[0][TEXT_PROP] = SPECIAL_TEXT_VALUE;
      styles[0][MARK_PROP] = SPECIAL_MARK_VALUE;
      styles[0][SHADOW_PROP] = SPECIAL_SHADOW_VALUE;
      styles[0][SHADOW_RGB_PROP] = SPECIAL_RGB_SHADOW_VALUE;
      styles.push({
        $suffix: '>:not([fill]):not([nu-popup])',
        [BORDER_PROP]: SPECIAL_BORDER_VALUE,
      });
      styles.push({
        $suffix: ':not([color])',
        color: SPECIAL_TEXT_VALUE,
      });
    }
  }

  return styles;
}

function transformAttr(val) {
  if (!val) return [{
    '--transform': 'translate(0, 0)',
  }];

  return [{
    '--transform': val,
  }];
}

const DEFAULT_SPACE = 'auto';

function prepareValue(value) {
  if (value === 'auto') return value;

  if (value.startsWith('calc(')) {
    value = value.slice(5, -1);
  }

  return `calc((${value}) * -1)`;
}

function spaceAttr(val) {
  if (!val) return;

  if (isNoValue(val)) return;

  let { values, mods } = parseAttr(val, 1);

  if (mods.includes('remove')) {
    return {
      margin: '0 !important',
    };
  }

  let around = mods.includes('around') || !values.length;

  mods = filterMods(mods, DIRECTIONS$1);

  if (mods.length) {
    return mods.reduce((styles, mod) => {
      const index = DIRECTIONS$1.indexOf(mod);
      let value = values[index] || values[index % 2] || values[0] || (around ? 'auto' : DEFAULT_SPACE);

      styles[`margin-${mod}`] = around ? value : prepareValue(value);

      return styles;
    }, {});
  }

  if (!around) {
    values = values.map(prepareValue);
  } else if (!values.length) {
    return { margin: 'auto' };
  }

  return {
    'margin-top': values[0],
    'margin-right': values[1] || values[0],
    'margin-bottom': values[2] || values[0],
    'margin-left': values[3] || values[1] || values[0],
  };
}

const PROP = 'var(--radius)';
const SHARP = 'var(--leaf-sharp-radius)';

function radiusAttr(val) {
  if (!val || isYesValue(val)) {
    val = '';
  }

  if (isNoValue(val)) {
    return;
  }

  let { mods, values } = parseAttr(val, 1);

  if (mods.includes('round')) {
    values = ['9999rem'];
  } else if (mods.includes('ellipse')) {
    values = ['50%'];
  } else if (!values.length) {
    values = [PROP];
  }

  if (mods.includes('leaf')) {
    values = [values[1] || SHARP, values[0] || PROP, values[1] || SHARP, values[0] || PROP];
  } else if (mods.includes('backleaf')) {
    values = [values[0] || PROP, values[1] || SHARP, values[0] || PROP, values[1] || SHARP];
  } else if (mods.length) {
    const arr = ['0', '0', '0', '0'];

    let flag = false;

    DIRECTIONS$1.forEach((dir, i) => {
      if (!mods.includes(dir)) return;

      flag = true;

      arr[i] = values[0] || PROP;
      arr[(i + 1) % 4] = values[0] || PROP;
    });

    if (flag) {
      values = arr;
    }
  }

  return [{
    '--local-radius': values.join(' '),
    'border-radius': 'var(--local-radius)',
  }, {
    $suffix: '>*',
    '--context-radius': values.join(' '),
  }];
}

const HIDDEN = 'hidden';
const VISIBLE = 'visible';

const MAP$1 = {
  'auto': 'auto',
  'n': HIDDEN,
  'y': VISIBLE,
  'no': HIDDEN,
  'yes': VISIBLE,
  'scroll': 'scroll',
};

const noScrollList = ['n', 'y', 'no', 'yes', 'hidden'];

function overflowAttr(val) {
  let { all } = parseAttr(val, 2);

  all = all.map(mod => MAP$1[mod] || mod);

  const value = all.join(' ');

  if (devMode && !CSS.supports('overflow', value)) {
    warn$1('overflow value is not valid', JSON.stringify(value));
  }

  const styles = [{
    overflow: value,
  }];

  if (all.find(v => !noScrollList.includes(v))) {
    styles.push(...scrollbarAttr(val));
  }

  return styles;
}

function hideAttr(val) {
  if (val === 'y' || val === 'yes') {
    return { display: 'none !important' };
  }

  return null;
}

const REGEX = /(linear|conic|radial)(?=\()/g;

function imageAttr(val) {
  val = convertCustomProperties(convertCustomFuncs(val));

  val = val.replace(REGEX, (s) => `${s}-gradient`);

  return {
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'contain',
    'background': val,
  };
}

const BASE = 'var(--gap)';

function paddingAttr(val, defaults, prefix = '') {
  if (val == null) return;

  const { values, mods: allMods } = parseAttr(val, 1);

  const mods = filterMods(allMods, DIRECTIONS$1);

  if (!mods.length) {
    return { [`${prefix}padding`]: values.join(' ') || BASE };
  }

  return mods.reduce((styles, mod) => {
    const index = DIRECTIONS$1.indexOf(mod);

    styles[`${prefix}padding-${mod}`] = values[index] || values[index % 2] || values[0] || BASE;

    return styles;
  }, {});
}

function beforeAttr(val) {
  if (val.startsWith('--')) {
    val = `var(${val})`;
  } else if (!val.startsWith('attr(')) {
    val = `"${val.replace(/"/g, '\"')}"`; // lgtm [js/identity-replacement]
  }

  return {
    $suffix: '::before',
    content: val,
  };
}

function afterAttr(val) {
  if (val.startsWith('--')) {
    val = `var(${val})`;
  } else if (!val.startsWith('attr(')) {
    val = `"${val.replace(/"/g, '\"')}"`; // lgtm [js/identity-replacement]
  }

  return {
    $suffix: '::after',
    content: val,
  };
}

const CONVERT_FILTERS = ['drop-shadow', 'blur'];

function filterAttr(val) {
  if (isNoValue(val)) return;

  const parts = extractStyleFuncs(val);
  const filters = [];

  (parts || []).forEach(part => {
    filters.push(part.replace(
      /^([\w-]+)\((.+?)\)/,
      (s, s2, s3) => `${s2}(${CONVERT_FILTERS.includes(s2) ? convertUnit(s3) : s3})`,
    ));
  });

  const filterValue = filters.join(' ') || undefined;

  return [{
    filter: filterValue,
  }];
}

function scaleAttr(val) {
  if (!val) return {
    '--transform-scale': `scale(1, 1)`,
  };

  let { value } = parseAttr(val);

  switch (value) {
    case 'flip':
      value = '-1 -1';
      break;
    case 'flip-x':
      value = '-1 1';
      break;
    case 'flip-y':
      value = '1 -1';
      break;
  }

  value = value.split(/\s+/g).join(', ');

  return {
    '--transform-scale': `scale(${value})`,
  };
}

function rotateAttr(val) {
  if (!val) return;

  const { values } = parseAttr(val);

  return {
    '--transform-rotate': `rotate(${values.join(', ')})`,
  };
}

function moveAttr(val) {
  if (!val) {
    val = '0 0';
  }

  const { values } = parseAttr(val, 1);

  return {
    '--transform-move': `translate(${values.join(', ')})`,
  };
}

function showAttr(val) {
  if (val !== 'y' && val !== 'yes') {
    return { display: 'none !important' };
  }

  return null;
}

const HORIZONTAL_MODS = ['left', 'right'];
const VERTICAL_MODS = ['top', 'bottom'];
const ALLOWED_MODS = HORIZONTAL_MODS.concat(VERTICAL_MODS);

function fadeAttr(val) {
  if (!val) return;

  const { values, mods: allMods } = parseAttr(val, 1);
  const size = values[0] || 'calc(var(--gap) * 2)';
  const mods = filterMods(allMods, ALLOWED_MODS);

  const direction = mods[0] || 'bottom';
  const styles = {
    $suffix: '::after',
    display: 'block',
    content: "''",
    position: 'absolute',
    'pointer-events': 'none',
    'background-image': `linear-gradient(to ${direction}, rgba(var(--local-bg-color-rgb), 1), rgba(var(--local-bg-color-rgb), 0))`,
  };

  if (HORIZONTAL_MODS.includes(direction)) {
    styles.top = '0';
    styles.bottom = '0';
    styles.width = size;

    if (direction === 'right') {
      styles.left = '100%';
    } else {
      styles.right = '100%';
    }
  } else {
    styles.left = '0';
    styles.right = '0';
    styles.height = size;

    if (direction === 'bottom') {
      styles.top = '100%';
    } else {
      styles.bottom = '100%';
    }
  }

  return [styles];
}

function insetAttr(val, defaults) {
  return shadowAttr(val, defaults, {
    inset: true,
    shadow: 'rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1)',
    specialShadow: 'rgba(var(--special-shadow-color-rgb), 1)',
    defaultValue: '.75em',
  });
}

const OUTLINE_STYLES = [
  {
    $suffix: ':not([disabled])::before',
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    'pointer-events': 'none',
    'border-radius': localProp('radius'),
    'box-shadow': 'var(--local-outline-shadow)',
    // Activate transition only if transition and focusable effects are globally enabled
    transition: 'box-shadow calc(var(--transition-enabler) * var(--transition)) linear',
    'z-index': '9',
  }
];
const SELECTOR$1 = '[is-focus]';
const WITHIN_SELECTOR = ':focus-within';

function outlineAttr(val) {
  const { values, mods, color } = parseAttr(val, 2);

  // disable outline completely
  if (mods.includes('native')) {
    return;
  }

  /**
   * @type {Array<Object>}
   */
  const styles = [{ outline: 'none' }];

  // disable outline completely
  if (hasNegativeMod(mods)) {
    return styles;
  }

  const outlineSize = values[0] || prop('outline-width');
  const outlineColor = color || prop('outline-color');

  const inset = mods.includes('inset');
  const outside = mods.includes('focus-outside');
  const inside = !outside && mods.includes('focus-inside');
  const focus = mods.includes('focus') || outside || inside;
  const polite = mods.includes('visible') && focus;

  styles.push({
    '--local-outline-color': 'rgba(var(--outline-color-rgb), 0)',
    '--local-outline-shadow': `var(--local-outline-inset, ${inset ? 'inset ' : ''}0 0) 0 calc(${!polite ? '1' : 'var(--focus-enabler)'} * (1 - var(--focus-disabler, 0)) * ${outlineSize}) var(--local-outline-color)`,
  });

  // hide outline (if you need transition)
  if (mods.includes('hidden')) {
    return styles;
  }

  styles.push(...OUTLINE_STYLES);

  if (focus) {
    styles.push({
      $prefix: outside ? `${SELECTOR$1}, :host(${SELECTOR$1})` : '',
      $suffix: `${outside ? '' : (inside ? WITHIN_SELECTOR : SELECTOR$1)}`,
      '--local-outline-color': outlineColor,
    });

    if (inside) {
      styles.push({
        $suffix: '>*',
        '--focus-disabler': '1',
      });
    }
  } else {
    styles.push({
      '--local-outline-color': outlineColor,
    });
  }

  return styles;
}

function markAttr(val) {
  const { values, mods, color } = parseAttr(val, 1);

  const size = values[0] || '0';

  /**
   * @type {Array<Object>}
   */
  const styles = [{
    '--local-mark-shadow': `0 0 0 0 transparent, 0 0 0 9999rem transparent inset`,
  }];

  const markColor = color || 'var(--local-mark-color, var(--mark-color))';
  const hover = mods.includes('hover');

  if (!hasNegativeMod(mods)) {
    styles.push({
      '--local-mark-shadow': `0 0 0 ${size} ${markColor}, 0 0 0 9999rem ${markColor} inset`,
    });

    if (hover) {
      styles[0].$suffix = ':not([is-hover])';
      styles[1].$suffix = '[is-hover]';
    }
  }

  return styles;
}

const LISTENERS = new Set;

const FIXATE_DIRECTIONS = ['up', 'right', 'down', 'left'];

const FIXATE_ATTR = 'drop';

function onFixateChange() {
  LISTENERS.forEach(listener => {
    listener();
  });
}

class FixateBehavior {
  constructor(host) {
    this.host = host;
    this.change = this.change.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);

    this.changed(FIXATE_ATTR, host.getAttribute(FIXATE_ATTR) || 'down');
  }

  disconnected() {
    this.end();

    delete this.parent;
  }

  changed(name) {
    const { host } = this;

    if (name !== PLACE_ATTR && name !== FIXATE_ATTR) return;

    host.nuSetMod(FIXATE_ATTR, false);
    host.nuSetContext('fixate', null);
    host.style.display = '';
    host.style.opacity = '';
    delete this.position;

    const fixateValue = host.getAttribute(FIXATE_ATTR)
      || host.constructor.nuAllStyles[FIXATE_ATTR]
      || 'down';

    if (!this.enabled) return;

    if (devMode) {
      const { mods } = parseAttr(fixateValue);

      if ((mods[0] && !FIXATE_DIRECTIONS.includes(mods[0]))
        || (mods[1] && !DIRECTIONS$1.includes(mods[1]))) {
        warn$1('[fixate.behavior] incorrect [drop] value:', JSON.stringify(fixateValue));

        return;
      }
    }

    this.position = fixateValue;

    host.nuSetMod(FIXATE_ATTR, true);
    host.nuSetContext('fixate', {
      context: host,
      position: fixateValue,
    });

    host.style.display = 'none';
    host.style.opacity = '0';
  }

  get enabled() {
    const { host } = this;
    const place = host.getAttribute(PLACE_ATTR);
    const fixate = host.getAttribute(FIXATE_ATTR);
    const defaults = host.constructor.nuAllStyles;

    if (place) {
      return false;
    }

    if (fixate == null) {
      return defaults[FIXATE_ATTR] && !defaults[PLACE_ATTR];
    }

    return true;
  }

  change() {
    const { host } = this;

    const [pos, spos] = this.position.split(/\s+/);
    const parent = this.parent;

    if (!pos || !parent) return;

    const rect = parent.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const width = rect.width;
    const height = rect.height;
    const offsetX = rect.x;
    const offsetY = rect.y;
    const props = {};

    let move;

    switch (pos) {
      case 'up':
        props.top = '';
        props.right = '';
        props.bottom = winHeight - offsetY;
        props.left = offsetX + (width / 2);
        move = '-50%, 0';
        break;
      case 'right':
        props.top = offsetY + (height / 2);
        props.right = '';
        props.bottom = '';
        props.left = offsetX + width;
        move = '0, -50%';
        break;
      case 'down':
        props.top = offsetY + height;
        props.right = '';
        props.bottom = '';
        props.left = offsetX + (width / 2);
        move = '-50%, 0';
        break;
      case 'left':
        props.top = offsetY + (height / 2);
        props.right = winWidth - offsetX;
        props.bottom = '';
        props.left = ``;
        move = '0, -50%';
        break;
    }

    if (spos) {
      if (pos === 'up' || pos === 'down') {
        if (spos === 'right') {
          props.left = '';
          props.right = winWidth - offsetX - width;
        } else {
          props.left = offsetX;
        }
        move = '0, 0';
      } else {
        if (spos === 'top') {
          props.top = offsetY;
        } else {
          props.top = '';
          props.bottom = winHeight - offsetY - height;
        }
        move = '0, 0';
      }
    }

    Object.entries(props)
      .forEach(([name, value]) => {
        value = value ? `${value}px` : 'initial';

        host.style.setProperty(`--fixate-${name}`, value);
      });

    host.style.setProperty(`--fixate-width`, `${width}px`);
    host.style.setProperty(`--transform-place`, `translate(${move})`);

    setTimeout(() => {
      fixPosition(host);
    });
  }

  start() {
    const { host } = this;

    if (!this.position) return;

    host.style.display = '';
    host.style.opacity = '1';

    if (!this.parent) {
      this.parent = host.parentNode;
    }

    this.fixated = true;

    this.change();

    LISTENERS.add(this.change);
  }

  end() {
    const { host } = this;

    if (!this.fixated) return;

    this.fixated = false;

    LISTENERS.delete(this.change);

    host.style.opacity = '0';

    setTimeout(() => {
      if (!this.fixated) {
        host.style.display = 'none';
        host.style.removeProperty(`--transform-place`);

        [...DIRECTIONS$1, 'width']
          .forEach(prop => host.style.removeProperty(`--fixate-${prop}`));
      }
    }, 500);
  }
}
['scroll', 'resize', 'wheel', 'touchmove', 'tap'].forEach(eventName => {
  window.addEventListener(eventName, onFixateChange, { passive: true });
});

var fixate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FIXATE_ATTR: FIXATE_ATTR,
  'default': FixateBehavior
});

// Don't work without Fixate Mixin!

function dropAttr(val, defaults) {
  return [{
    $suffix: defaults.place ? `[${FIXATE_ATTR}]` : `:not([${PLACE_ATTR}])`,
    position: 'fixed',
    top: 'var(--fixate-top, initial)',
    right: 'var(--fixate-right, initial)',
    bottom: 'var(--fixate-bottom, initial)',
    left: 'var(--fixate-left, initial)',
  }];
}

function expandAttr(value) {
  if (!value) return;

  const { values, color } = parseAttr(value);

  let sizeY = values[0] || '0';
  let sizeX = values[1] || values[0];

  const radius = values[2] || 'var(--local-radius, var(--radius))';

  if (sizeY !== '0') {
    sizeY = `calc(-1 * ${stripCalc(sizeY)})`;
  }

  if (sizeX !== '0') {
    sizeX = `calc(-1 * ${stripCalc(sizeX)})`;
  }

  return [{
    $suffix: '::after',
    content: '""',
    display: 'block',
    position: 'absolute',
    top: sizeY,
    right: sizeX,
    bottom: sizeY,
    left: sizeX,
    'border-radius': radius,
    'background-image': color,
  }];
}

function opacityAttr(val) {
  const { values } = parseAttr(val);

  return [{
    opacity: values[0] || '1',
  }, {
    $suffix: '>*',
    '--context-opacity': values[0] || '1',
  }];
}

const SELECT_MAP = {
  'all': 'all',
};

function selectableAttr(val) {
  const mod = val.split(/\s+/g)[0];

  return { 'user-select': isNoValue(mod) ? 'none' : (SELECT_MAP[mod] || 'auto') };
}

function boxAttr(val) {
  return {
    '--box-position': isNoValue(val) ? 'static' : 'relative',
  };
}

function clampAttr(val) {
  if (!val || isNoValue(val)) return;

  const { values } = parseAttr(val);

  return [{
    'display': '-webkit-box !important',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': values[0] || '1',
    overflow: 'hidden !important',
    'text-overflow': 'ellipsis',
  }, {
    $suffix: ':not([width])',
    'max-width': '100%',
  }];
}

function flexAttr(val) {
  if (!val) return;

  const { values } = parseAttr(val, 0);

  return {
    flex: values.join(' '),
  };
}

const BACKDROP_FILTER = 'backdrop-filter';
const BACKDROP_PROP = CSS.supports(BACKDROP_FILTER, 'blur(1rem)')
  ? 'backdrop-filter'
  : '-webkit-backdrop-filter';

function backdropAttr(val) {
  if (isNoValue(val)) return;

  const filterStyle = filterAttr(val)[0].filter;

  return [{
    [BACKDROP_PROP]: filterStyle,
  }];
}

function snapAttr(val) {
  const { values, mods } = parseAttr(val);

  if (hasNegativeMod(mods)) {
    return {};
  }

  const styles = {
    'scroll-snap-align': mods.join(' '),
  };

  if (values.length) {
    styles['scroll-padding'] = values.join(' ');
  }

  return styles;
}

const OPTIONS = ['mandatory', 'proximity'];
const DIRS = ['x', 'y'];
const SNAPPING_MODS = [...DIRS, ...OPTIONS];
const DIR_SUPPORT = CSS.supports('scroll-snap-type', 'y mandatory');

function filterOutDir(mods) {
  return mods.filter(mod => !DIRS.includes(mod));
}

function snappingAttr(val) {
  if (!val) val = 'y';

  let { mods, values } = parseAttr(val, 1);

  if (hasNegativeMod(mods)) {
    return;
  }

  if (!mods.includes(DIRS[0]) && !mods.includes(DIRS[1])) {
    mods.unshift(DIRS[1]);
  }

  if (!mods.includes(OPTIONS[0]) && !mods.includes(OPTIONS[1])) {
    mods.push(OPTIONS[0]);
  }

  const snappingMods = mods.filter(mod => SNAPPING_MODS.includes(mod));
  const snapMods = mods.filter(mod => !SNAPPING_MODS.includes(mod));

  const styles = [{
    'scroll-snap-type': (DIR_SUPPORT ? snappingMods : filterOutDir(snappingMods)).join(' '),
  }];

  if (snapMods.length) {
    let snapStyles = snapAttr(`${snapMods.join(' ')} ${values.join(' ')}`);

    snapStyles.$suffix ='>:not([snap])';

    styles.push(snapStyles);
  }

  return styles;
}

function fontAttr(val) {
  if (val.includes(' ') && !val.includes('\'')) {
    val = `'${val}'`;
  }

  return {
    'font-family': 'var(--font)',
    '--font': `${val ? `${val}, ` : ''}var(--system-font)`,
  };
}

function clipAttr(val) {
  if (val) {
    const { value } = parseAttr(val);

    return {
      'clip-path': value,
    };
  }
}

const MAP = {
  row: ['* 0 0 *', '0 * * 0'],
  column: ['* * 0 0', '0 0 * *'],
};

function groupRadiusAttr(val) {
  const { values, mods } = parseAttr(val, 1);

  const flow = mods.includes('column') ? 'column' : 'row';
  const reverse = mods.includes('reverse');
  let value = values[0];

  if (hasNegativeMod(mods)) {
    value = '0';
  }

  if (!value) {
    if (mods.includes('round')) {
      value = '9999rem';
    } else if (mods.includes('ellipse')) {
      value = '50%';
    } else {
      value = 'var(--radius)';
    }
  }

  const startValue = MAP[flow][reverse ? 1 : 0].replace(/\*/g, value);
  const endValue = MAP[flow][reverse ? 0 : 1].replace(/\*/g, value);

  return [{
    $suffix: '>:first-child:not(:last-child):not([radius])',
    'border-radius': startValue,
    '--local-radius': startValue,
  }, {
    $suffix: '>:last-child:not(:first-child):not([radius])',
    'border-radius': endValue,
    '--local-radius': endValue,
  }, {
    $suffix: '>:last-child:first-child:not([radius])',
    'border-radius': value,
    '--local-radius': value,
  }, {
    $suffix: '>:not(:last-child):not(:first-child):not([radius])',
    'border-radius': '0',
    '--local-radius': '0',
  }];
}

var styles = {
  width: dimensionUnit('width'),
  height: dimensionUnit('height'),
  sizing: sizingAttr,
  radius: radiusAttr,
  'group-radius': groupRadiusAttr,
  padding: paddingAttr,
  overflow: overflowAttr,
  space: spaceAttr,
  border: borderAttr,
  shadow: shadowAttr,
  flow: flowAttr,
  gap: gapAttr,
  order: 'order',
  flex: flexAttr,
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: unit('flex-basis', { convert: true }),
  // 'items-basis': unit('flex-basis', { suffix: '>:not([basis])', convert: true }),
  // 'items-grow': unit('flex-grow', { suffix: '>:not([grow])' }),
  // 'items-shrink': unit('flex-shrink', { suffix: '>:not([shrink])' }),
  'place-content': PLACE_VALUES[0],
  'place-items': PLACE_VALUES[1],
  content: PLACE_VALUES[0],
  items: PLACE_VALUES[1],
  areas: 'grid-template-areas',
  columns: gridUnit('grid-template-columns'),
  rows: gridUnit('grid-template-rows'),
  column: 'grid-column',
  row: 'grid-row',
  area: 'grid-area',
  contain: 'contain',
  place: placeAttr,
  z: zAttr,
  interactive: interactiveAttr,
  color: colorAttr,
  fill: fillAttr,
  filter: filterAttr,
  'backdrop-filter': backdropAttr,
  image: imageAttr,
  transform: transformAttr,
  scale: scaleAttr,
  rotate: rotateAttr,
  move: moveAttr,
  text: textAttr,
  cursor: 'cursor',
  size: sizeAttr,
  hide: hideAttr,
  show: showAttr,
  opacity: opacityAttr,
  transition: transitionAttr,
  scrollbar: scrollbarAttr,
  before: beforeAttr,
  after: afterAttr,
  inset: insetAttr,
  outline: outlineAttr,
  mark: markAttr,
  expand: expandAttr,
  fade: fadeAttr,
  drop: dropAttr,
  origin: 'transform-origin',
  selectable: selectableAttr,
  box: boxAttr,
  'line-clamp': clampAttr,
  snap: snapAttr,
  snapping: snappingAttr,
  font: fontAttr,
  clip: clipAttr,
};

const HIDE_EFFECT_ATTR = 'effect';

// const TRANSITION = transitionAttr('opacity, height').transition;
const EFFECTS = {
  collapse: {
    visible(el) {
      const realHeight = getRealHeight(el);

      return {
        maxHeight: `${realHeight}px`,
        opacity: '1',
      };
    },
    hidden: {
      maxHeight: '0',
      opacity: '0',
    },
    clear: ['maxHeight', 'opacity'],
    transition: transitionAttr('opacity, height').transition,
  },
};

function clear(host, effect) {
  if (effect && effect.clear) {
    effect.clear.forEach(style => {
      host.style[style] = '';
    });
  }

  host.style.transition = '';
}

function setStyles(host, styles, transition = '') {
  Object.assign(host.style, styles);

  if (transition) {
    host.style.transition = transition;
  }
}

const TRANSITION_NAME = 'hiding-time';

function hideEffect(host, bool, effectName) {
  effectName = host.getAttribute(HIDE_EFFECT_ATTR) || effectName;
  const effect = EFFECTS[effectName];
  const isVisible = !host.style.display;

  host.nuEffected = true;
  host.style.display = '';
  host.style.transition = '';
  host.offsetHeight; // trigger re-flow

  if (!('nuCollapseId' in host)) {
    host.nuCollapseId = 0;
  }

  host.nuCollapseId++;

  const id = host.nuCollapseId;

  const transitionInProgress = host.nuEffectTransition;

  host.nuEffectTransition = true;

  let visibleStyles = {}, hiddenStyles = {}, transition;

  if (effect) {
    const visibleEffect = effect.visible;
    const hiddenEffect = effect.hidden;

    transition = effect.transition;

    if (visibleEffect) {
      if (typeof visibleEffect === 'function') {
        visibleStyles = visibleEffect(host);
      } else {
        visibleStyles = visibleEffect;
      }
    }

    if (hiddenEffect) {
      if (typeof hiddenEffect === 'function') {
        hiddenStyles = hiddenEffect(host);
      } else {
        hiddenStyles = hiddenEffect;
      }
    }
  }

  const onInit = host.nuInitial || !host.nuIsConnected;

  if (onInit) {
    host.nuSetMod('hidden', bool);
    host.nuSetMod('leave', false);
    host.nuSetMod('enter', false);

    if (bool) {
      host.style.display = 'none';
      host.nuSetMod('enter', true);
    } else {
      delete host.style.display;
    }

    host.nuEffectTransition = false;

    return;
  }

  if (!transitionInProgress && ((bool && !isVisible) || (!bool && isVisible))) {
    if (!isVisible) {
      host.style.display = 'none';
    }

    return;
  }

  if (!bool) {
    setStyles(host, hiddenStyles);

    host.nuSetMod('hidden', true);
    host.nuSetMod('enter', true);
    host.nuSetMod('leave', false);

    host.offsetHeight; // trigger re-flow

    setStyles(host, visibleStyles, transition);

    host.nuSetMod('hidden', false);
    host.nuSetMod('enter', false);

    setTransitionTimeout(host, () => {
      if (id !== host.nuCollapseId) return;

      host.nuEffectTransition = false;

      clear(host, effect);
    }, TRANSITION_NAME);
  } else {
    setStyles(host, visibleStyles);

    host.nuSetMod('hidden', false);
    host.nuSetMod('leave', true);
    host.nuSetMod('enter', false);

    host.offsetHeight; // trigger re-flow

    host.nuSetMod('hidden', true);

    setStyles(host, hiddenStyles, transition);

    setTransitionTimeout(host, () => {
      if (id !== host.nuCollapseId) return;

      host.nuEffectTransition = false;

      host.style.display = 'none';
      host.nuSetMod('leave', false);
      host.nuSetMod('enter', true);

      clear(host, effect);
    }, TRANSITION_NAME);
  }
}

function ShadowCombinator() {
  return {
    attrs: ['mark', 'box', 'place'],
    generator(attrs, allAttrs) {
      if (!attrs.length) return;

      let position = '';

      allAttrs.forEach((attr) => {
        if (!attrs.includes(attr)) return;

        if (attr === 'mark') {
          position = 'relative';
        } else {
          position = `var(--${attr}-position${position ? `, ${position}` : ''})`;
        }
      });

      return { position };
    },
  };
}

/**
 * @class
 * @abstract
 */
class NuEl extends NuAbstract {
  static get nuTag() {
    return 'nu-el'; // abstract tag
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuGenerators() {
    return {
      ...styles,
      role: '',
      direction: '',
      control: '',
      checkbox: '',
      trigger: '',
      hidden: '',
      label: '',
      level: '',
      labelledby: '',
      describedby: '',
      valuemin: '',
      valuemax: '',
      valuenow: '',
      setsize: '',
      posinset: '',
      expanded: '',
      owns: '',
      flowto: '',
      haspopup: '',
      activedescendant: '',
      t(val) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            display: `block !important`,
          } : null;
      },
      ...Object.keys(behaviors.map).reduce((map, name) => {
        map[`use-${name}`] = '';

        return map;
      }, {}),
      type: '',
      precision: '',
      disabled: '',
      'link-value': '',
      value: '',
      'off-value': '',
      scrollto: '',
      action: '',
      lang: '',
      special: '',
      placeholder: '',
      min: '',
      max: '',
      step: '',
      code: '',
      sign: '',
      unit: '',
      notation: '',
      fallback: '',
      significant: '',
      integer: '',
      decimal: '',
      pressed: '',
      checked: '',
      selected: '',
      target: '',
      to: '',
      begin: '',
      end: '',
      for: '',
      assert: '',
      enumerate: '',
      date: '',
      time: '',
      weekday: '',
      era: '',
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '',
      second: '',
      zone: '',
      timezone: '',
      dayperiod: '',
      calendar: '',
      system: '',
      hourcycle: '',
      grouping: '',
      format: '',
      src: '',
      loading: '',
      autofocus: '',
      autocomplete: '',
      pattern: '',
      maxlength: '',
      mode: '',
      mask: '',
      list: '',
      multiple: '',
      accept: '',
      // converters
      typographer: '',
      linkify: '',
      // themes
      success: '',
      danger: '',
      warning: '',
    };
  }

  static get nuName() {
    return '';
  }

  /**
   * Element default attribute values.
   * They are used only to generate initial CSS for elements.
   */
  static get nuStyles() {
    return {
      display: 'inline-block',
      sizing: 'border',
    };
  }

  static get nuCombinators() {
    return {
      transform: TransformCombinator(),
      shadow: ShadowCombinator$1(),
      position: ShadowCombinator(),
      // weight: WeightCombinator(),
    };
  }

  /**
   * Element initialization logic
   */
  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}::selection {
        background: rgba(var(--main-outline-color-rgb, var(--outline-color-rgb)), .5);
      }`
    ];
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'checked':
      case 'selected':
        setBoolAttr(this, 'pressed', value);
        break;
      // ARIA
      case 'label':
      case 'level':
      case 'valuemin':
      case 'valuemax':
      case 'valuenow':
      case 'setsize':
      case 'posinset':
      case 'expanded':
      case 'haspopup':
        this.nuSetAria(name, this.nuGetAttr(name, true));
        break;
      case 'controls':
      case 'labelledby':
      case 'describedby':
      case 'owns':
      case 'flowto':
      case 'activedescendant':
        setTimeout(() => {
          setAriaRef(this, name, value);
        });
        break;
      case 't':
        if (!this.nuIsConnected) return;

        value = this.nuGetAttr(name);

        const labels = parseAllValues(value);

        // empty tag
        this.innerHTML = '';

        labels.forEach(label => {
          if (this.querySelector(`nu-el[name="${label}"]`)) return;

          const el = h$1('nu-el');

          el.setAttribute('name', label);
          el.style.display = 'none';
          el.innerHTML = label.replace(/(^'|'$)/g, '');

          this.appendChild(el);
        });
        break;
      case 'hidden':
        hideEffect(this, value != null);
        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    if (this.hasAttribute('t')) {
      this.nuChanged('t', null, this.getAttribute('t'));
    }
  }

  nuIsClamped() {
    return this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth;
  }
}

const OBJ_ASSIGN = ['attrs', 'styles', 'generators', 'behaviors', 'combinators'];

const staticBind = {
  id: 'nuId',
  tag: 'nuTag',
  role: 'nuRole',
  attrs: 'nuAttrs',
  styles: 'nuStyles',
  contents: 'nuContents',
  context: 'nuContext',
  css: 'nuCSS',
  generators: 'nuGenerators',
  name: 'nuName',
  template: 'nuTemplate',
  behaviors: 'nuBehaviors',
  combinators: 'nuCombinators',
};

const prototypeBind = {
  connected: 'nuConnected',
  disconnected: 'nuDisconnected',
  changed: 'nuChanged',
};

function define(tag, options, skipDefine) {
  const Parent = options.parent || NuEl;

  const Element = class Element extends Parent {};

  options.tag = tag;

  Object.keys(staticBind).forEach(key => {
    const val = options[key];

    if (val != null) {
      Object.defineProperty(Element, staticBind[key], {
        value: val,
      });
    }
  });

  Object.keys(prototypeBind).forEach(key => {
    const val = options[key];

    if (val != null) {
      const method = prototypeBind[key];

      Element.prototype[method] = function(...args) {
        const parentFunc = Element.nuParentClass.prototype[method];

        if (parentFunc) {
          parentFunc.apply(this, args);
        }

        val.apply(this, args);
      };
    }
  });

  if (!skipDefine) {
    customElements.define(tag, Element);
  }

  return Element;
}

/**
 * Assign new options to the element.
 * @param {NuElement} element
 * @param {Object} options
 * @param {Object<String,HTMLElement>} elements
 * @param {Boolean} replace
 */
function assign$1(element, options, elements = {}, replace) {
  Object.keys(options)
    .forEach(option => {
      assignOption(element, option, options[option], elements, replace);
    });
}

function assignOption(element, prop, value, elements = {}, replace) {
  if (!(prop in staticBind)) {
    warn$1('assign: Property not found');

    return;
  }

  if (typeof element === 'string') {
    element = Object.values(elements).find(el => el.nuTag === element);

    if (!element) {
      warn$1('assign: Element not found', JSON.stringify(element));
      return;
    }
  }

  const propName = staticBind[prop];
  const oldValue = element[propName];

  let newValue = value;

  if (OBJ_ASSIGN.includes(prop) && !replace) {
    newValue = Object.assign(oldValue || {}, newValue);
  }

  if (prop === 'css' && typeof newValue === 'function' && !replace) {
    const newCSS = newValue;

    newValue = ({ tag, css }) => {
      return [...(oldValue({ tag, css}) || []), ...(newCSS({ tag, css}) || [])];
    };
  }

  Object.defineProperty(element, propName, {
    value: newValue,
  });

  log('property assigned:', `${element.nuTag}.${prop}:`, newValue);
}

const STICKY_POSITION = ['-webkit-sticky', 'sticky'];

function initSticky () {
  let timerId;

  function handleSticky() {
    if (timerId) return;

    timerId = setTimeout(() => {
      timerId = null;

      const scrollTop = ROOT.scrollTop;
      const scrollLeft = ROOT.scrollLeft;
      const elements = deepQueryAll(ROOT, '[place*="sticky"], [nu-header]');

      elements.forEach(el => {
        if (!el.nuSetMod) return;

        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        // Comparison with 1 is required for iOS where rect.y can be positive decimal number like 0.3
        // Using 0 value will cause in false negative results.
        const sticky = (STICKY_POSITION.includes(style.position) || el.nuHasName('header'))
          && !!(scrollTop > 0 && rect.y < 1 || scrollLeft > 0 && rect.x < 1);

        el.nuSetMod('sticky', sticky);
      });
    }, 100);
  }

  window.addEventListener('scroll', handleSticky, { passive: true });
}

class NuRoot extends NuEl {
  static get nuTag() {
    return 'nu-root';
  }

  static get nuStyles() {
    return {
      display: 'block',
      text: 'n',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.style.opacity = '';
  }
}

class NuGrid extends NuEl {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      flow: 'grid-row',
    };
  }
}

class NuFlow extends NuEl {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
    };
  }
}

class NuBlock extends NuEl {
  static get nuTag() {
    return 'nu-block';
  }

  static get nuStyles() {
    return {
      display: 'block',
    };
  }
}

class NuFlex extends NuEl {
  static get nuTag() {
    return 'nu-flex';
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      gap: '0',
    };
  }
}

class NuRegion extends NuFlow {
  static get nuTag() {
    return 'nu-region';
  }

  static get nuRole() {
    return 'region';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
      box: 'y',
    };
  }
}

class NuCard extends NuRegion {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuId() {
    return 'card';
  }

  static get nuStyles() {
    return {
      padding: '2x',
      fill: '#bg :clear[#clear]',
      color: '#text :clear[current]',
      border: '1bw :clear[0]',
      radius: '1r',
      transition: 'theme, radius',
      shadow: '0 :clear[0 1x 4x #shadow.33]',
      box: 'y',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContext('radiogroup', null); // remove radiogroup context
  }
}

class NuPane extends NuFlex {
  static get nuTag() {
    return 'nu-pane';
  }

  static get nuStyles() {
    return {
      items: 'center',
      gap: '',
    };
  }

  static get nuAttrs() {
    return FLEX_GAP_SUPPORTED ? {} : {
      gap: '',
    };
  }
}

class NuNav extends NuPane {
  static get nuTag() {
    return 'nu-nav';
  }

  static get nuRole() {
    return 'navigation';
  }
}

class NuAside extends NuRegion {
  static get nuTag() {
    return 'nu-aside';
  }

  static get nuRole() {
    return 'complementary';
  }
}

class NuArticle$1 extends NuRegion {
  static get nuTag() {
    return 'nu-article';
  }

  static get nuRole() {
    return 'article';
  }
}

class NuMain extends NuRegion {
  static get nuTag() {
    return 'nu-main';
  }

  static get nuRole() {
    return 'main';
  }
}

class NuSection extends NuRegion {
  static get nuTag() {
    return 'nu-section';
  }
}

class NuHeader extends NuRegion {
  static get nuTag() {
    return 'nu-header';
  }

  static get nuRole() {
    return 'banner';
  }

  static get nuStyles() {
    return {
      fill: '#bg',
      z: 'front',
      transition: 'all',
    };
  }
}

class NuArticle extends NuRegion {
  static get nuTag() {
    return 'nu-footer';
  }

  static get nuRole() {
    return 'contentinfo';
  }
}

class NuStatus extends NuEl {
  static get nuTag() {
    return 'nu-status';
  }

  static get nuRole() {
    return 'status';
  }

  static get nuAttrs() {
    return {
      'aria-live': 'polite',
    };
  }
}

function insertSuffix(styles, suffix) {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }

  styles.forEach(styleMap => {
    styleMap.$suffix = `${suffix}${styleMap.$suffix || ''}`;
  });

  return styles;
}

function combinedAttr(attrs, Element) {
  if (Array.isArray(attrs)) {
    return attrs.reduce((all, innerAttrs) => all.concat(...combinedAttr(innerAttrs, Element)), []);
  }

  const allAttrs = Element.nuAllGenerators;
  const allDefaults = Element.nuAllStyles;
  const suffix = attrs.$suffix || '';

  delete attrs.$suffix;

  return Object.keys(attrs)
    .reduce((all, attr) => {
      if (devMode && (!allAttrs[attr] && !attr.startsWith('--'))) {
        warn$1('combined attr: base attribute not found');

        return all;
      }

      let styles = computeStyles(attr, attrs[attr], allAttrs, allDefaults);

      if (!styles) return all;

      const notAttr = suffix.includes('::') ? '' : `:not([${attr}])`;

      styles = insertSuffix(styles, `${suffix}${notAttr}`);

      all.push(...styles);

      return all;
    }, []);
}

class NuLine extends NuEl {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuBehaviors() {
    return {
      orient: true,
    };
  }

  static get nuGenerators() {
    return {
      orient(val) {
        const vertical = val === 'v';

        return combinedAttr({
          width: vertical ? '1fs 1fs' : 'min 1em',
          height: vertical ? 'min 1em' : '1fs 1fs',
        }, NuLine);
      },
      size(val) {
        return sizeAttr(val, {}, true);
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      place: 'stretch',
      orient: 'h',
      size: '1bw',
      fill: 'var(--local-border-color, var(--border-color)) :special[special]',
      text: 'v-middle',
      box: 'y',
      transition: 'fill',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        line-height: 0 !important;
      }`,
    ];
  }
}

class NuInline extends NuEl {
  static get nuTag() {
    return 'nu-in';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      display: 'inline',
    };
  }
}

class NuStrong extends NuInline {
  static get nuTag() {
    return 'nu-strong';
  }

  static get nuRole() {
    return 'strong';
  }

  static get nuStyles() {
    return {
      text: 'bold',
    };
  }
}

class NuEm extends NuInline {
  static get nuTag() {
    return 'nu-em';
  }

  static get nuRole() {
    return 'emphasis';
  }

  static get nuStyles() {
    return {
      text: 'i',
    };
  }
}

class NuSup extends NuInline {
  static get nuTag() {
    return 'nu-sup';
  }

  static get nuStyles() {
    return {
      text: 'sup',
      size: '.75em 1em',
    };
  }
}

class NuSub extends NuInline {
  static get nuTag() {
    return 'nu-sub';
  }

  static get nuStyles() {
    return {
      text: 'sub',
      size: '.75em 1em',
    };
  }
}

class NuContents extends NuEl {
  static get nuTag() {
    return 'nu-contents';
  }

  static get nuContents() {
    return '*';
  }
}

const LEVELS = [1, 2, 3, 4, 5, 6];

class NuHeading extends NuEl {
  static get nuTag() {
    return 'nu-heading';
  }

  static get nuRole() {
    return 'heading';
  }

  static get nuGenerators() {
    return {
      level(val) {
        if (!val || !LEVELS.includes(Number(val))) val = 1;

        const fontSize = `var(--h${val}-font-size)`;
        const lineHeight = `var(--h${val}-line-height)`;

        return [{
          $suffix: ':not([size])',
          'font-size': fontSize,
          'line-height': lineHeight,
          '--font-size': fontSize,
          '--line-height': lineHeight,
        }];
      },
    };
  }

  static get nuAttrs() {
    return {
      level: 2,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      level: this.nuAttrs.level,
      color: 'var(--local-text-color, var(--text-soft-color))',
      text: 'heading',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'level':
        if (!value) value = this.constructor.nuAttrs.level;

        if (devMode && !LEVELS.includes(Number(value))) {
          return warn$1('invalid heading level', value);
        }

        this.nuSetAria('level', value);
        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    const region = this.closest('[nu-region]');

    if (region && !region.nuHasAria('labelledby') && !region.hasAttribute('labelledby')) {
      region.nuSetAria('labelledby', this.nuUniqId);
    }
  }
}

class NuH1 extends NuHeading {
  static get nuTag() {
    return 'nu-h1';
  }

  static get nuAttrs() {
    return {
      level: 1,
    };
  }
}

class NuH2 extends NuHeading {
  static get nuTag() {
    return 'nu-h2';
  }

  static get nuAttrs() {
    return {
      level: 2,
    };
  }
}

class NuH3 extends NuHeading {
  static get nuTag() {
    return 'nu-h3';
  }

  static get nuAttrs() {
    return {
      level: 3,
    };
  }
}

class NuH4 extends NuHeading {
  static get nuTag() {
    return 'nu-h4';
  }

  static get nuAttrs() {
    return {
      level: 4,
    };
  }
}

class NuH5 extends NuHeading {
  static get nuTag() {
    return 'nu-h5';
  }

  static get nuAttrs() {
    return {
      level: 5,
    };
  }
}

class NuH6 extends NuHeading {
  static get nuTag() {
    return 'nu-h6';
  }

  static get nuAttrs() {
    return {
      level: 6,
    };
  }
}

class NuDescription extends NuEl {
  static get nuTag() {
    return 'nu-description';
  }

  static get nuStyles() {
    return {
      display: 'block',
    };
  }

  nuConnected() {
    super.nuConnected();

    const region = this.closest('[nu-region]');

    if (region && !region.nuHasAria('describedby') && !region.hasAttribute('labelledby')) {
      region.nuSetAria('describedby', this.nuUniqId);
    }
  }
}

class NuSpacer extends NuEl {
  static get nuTag() {
    return 'nu-spacer';
  }

  static get nuStyles() {
    return {
      display: 'block',
      width: 'min 1fs',
      height: 'min 1fs',
      basis: '1fs',
      size: '1x',
    };
  }
}

class NuIcon extends NuEl {
  static get nuTag() {
    return 'nu-icon';
  }

  static get nuBehaviors() {
    return {
      icon: true,
    };
  }

  static get nuRole() {
    return 'img';
  }

  static get nuGenerators() {
    return {
      name(val) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            opacity: `1 !important`,
          } : null;
      },
      size(val) {
        return sizeAttr(val, {}, true);
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      width: 'min 1fs',
      height: 'min 1lh',
      sizing: 'content',
      size: '@icon-size',
      transition: 'transform',
      box: 'y',
      text: 'middle',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} svg {
        position: absolute;
        left: 50%;
        top: 50%;
        width: var(--font-size);
        height: var(--font-size);
        transform: translate(-50%, -50%);
        transition: opacity calc(var(--transition-enabler) * var(--opacity-transition, var(--transition))) linear;
      }`,
    ];
  }
}

class NuDropdownIcon extends NuIcon {
  static get nuTag() {
    return 'nu-dropdownicon';
  }

  static get nuAttrs() {
    return {
      name: 'chevron-down',
    };
  }

  static get nuStyles() {
    return {
      scale: '^parent:pressed[flip-y]', // if parent action is pressed then flip the icon
      space: '^parent:action[.5em left right] 0', // if parent is action
      color: '^parent #special :special[#special-text]',
    };
  }
}

class NuTable extends NuEl {
  static get nuTag() {
    return 'nu-table';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuStyles() {
    return {
      display: 'table',
      gap: '0',
    };
  }
}

class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-gridtable';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuStyles() {
    return {
      width: 'min-content',
      color: '',
      overflow: 'auto',
      padding: '1x',
    };
  }

  static get nuContext() {
    return {
      'attrs:cell': {
        shadow: '0 1bw 0 #border',
      },
    };
  }
}

class NuRow extends NuEl {
  static get nuTag() {
    return 'nu-row';
  }

  static get nuRole() {
    return 'row';
  }

  static get nuStyles() {
    return {
      display: 'table-row',
      shadow: '0 1px 0 #border',
    };
  }
}

class NuRowGroup extends NuEl {
  static get nuTag() {
    return 'nu-rowgroup';
  }

  static get nuRole() {
    return 'rowgroup';
  }

  static get nuStyles() {
    return {
      display: 'table-row-group',
    };
  }
}

class NuCell extends NuEl {
  static get nuTag() {
    return 'nu-cell';
  }

  static get nuRole() {
    return 'cell';
  }

  static get nuStyles() {
    return {
      display: '^ block :role-row[table-cell]',
      padding: '1x',
      text: 'middle',
      box: 'y',
    };
  }
}

class NuTableHeader extends NuCell {
  static get nuTag() {
    return 'nu-tableheader';
  }

  static get nuStyles() {
    return {
      text: 'bold middle',
    };
  }
}

class NuColumnHeader extends NuTableHeader {
  static get nuTag() {
    return 'nu-columnheader';
  }

  static get nuRole() {
    return 'columnheader';
  }

  nuConnected() {
    super.nuConnected();

    const parentGroup = this.parentNode && this.parentNode.parentNode;

    if (parentGroup && parentGroup.getAttribute('role') === 'rowgroup') {
      parentGroup.setAttribute('display', 'table-header-group');
    }
  }
}

class NuRowHeader extends NuTableHeader {
  static get nuTag() {
    return 'nu-rowheader';
  }

  static get nuRole() {
    return 'rowheader';
  }
}

class NuField extends NuFlow {
  static get nuTag() {
    return 'nu-field';
  }
}

class NuGroup extends NuEl {
  static get nuTag() {
    return 'nu-group';
  }

  static get nuRole() {
    return 'group';
  }

  static get nuBehaviors() {
    return {
      group: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      'group-radius': '(1r - 1bw)',
      gap: '0',
      radius: '',
      border: '',
      box: 'y',
    };
  }
}

class NuInputGroup extends NuGroup {
  static get nuTag() {
    return 'nu-inputgroup';
  }

  static get nuBehaviors() {
    return {
      inputgroup: true,
    };
  }

  static get nuStyles() {
    return {
      fill: '#input',
      outline: 'focus-inside',
      cursor: 'text',
    };
  }

  static get nuContext() {
    return {
      'attrs:icon': {
        grow: '0',
      },
      'attrs:input': {
        border: '0',
        grow: '1',
      },
      'attrs:btn': {
        padding: '',
        border: 'n',
      },
    };
  }
}

class NuBtnGroup extends NuGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuStyles() {
    return {
      gap: '1bw',
      radius: '',
      border: '',
      fill: 'var(--local-border-color, var(--border-color)) :disabled[rgba(var(--local-border-color-rgb, var(--border-color-rgb)), var(--disabled-opacity))]',
      outline: 'n :radiogroup[focus-inside visible]',
      transition: 'filter, opacity',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
    };
  }

  static get nuContext() {
    return {
      'attrs:action': {
        border: '0',
        outline: '^btngroup focus visible :radiogroup[n]',
        padding: '1x 1.5x',
        filter: 'n',
      },
    };
  }

  static nuCSS({ css, tag }) {
    return [
      `${tag} > *:not([grow]) {
        flex-grow:1;
      }`,
    ];
  }
}

class NuRadioGroup extends NuFlex {
  static get nuTag() {
    return 'nu-radiogroup';
  }

  static get nuRole() {
    return 'radiogroup';
  }

  static get nuBehaviors() {
    return {
      radiogroup: true,
      control: true,
    };
  }
}

const ITEMS_MAP = {
  right: 'center end',
  left: 'center start',
};
const ORIENT_V = ['left', 'right'];

class NuTablist extends NuRadioGroup {
  static get nuTag() {
    return 'nu-tablist';
  }

  static get nuRole() {
    return 'tablist';
  }

  static get nuGenerators() {
    return {
      direction(val) {
        let direction = DIRECTIONS$1.includes(val) ? val : 'bottom';
        const orientV = ORIENT_V.includes(direction);

        return combinedAttr([{
          flow: orientV ? 'column' : 'row',
        }], NuTablist).concat({
          '--local-tab-items': ITEMS_MAP[direction] || 'center',
          '--local-tab-padding-h': orientV ? convertUnit('2x') : '0',
          '--local-tab-padding-v': orientV ? '0' : convertUnit('1x'),
          '--local-tab-expand-h': orientV ? '0' : '@local-h-gap',
          '--local-tab-expand-v': orientV ? '@local-v-gap' : '0',
          '--local-tab-gap': orientV ? convertUnit('1x') : convertUnit('2x'),
        });
      },
    }
  }

  static get nuStyles() {
    return {
      direction: 'bottom',
      gap: '@local-tab-gap',
      flow: null,
    };
  }

  static get nuBehaviors() {
    return {
      orient: 'dynamic',
      radiogroup: 'item-role(tab)',
    };
  }
}

class NuAction extends NuEl {
  static get nuTag() {
    return 'nu-action'; // abstract tag
  }

  static get nuRole() {
    return 'button';
  }

  static get nuName() {
    return 'action';
  }

  static get nuStyles() {
    return {
      radius: '0',
      text: 'nowrap',
      transition: 'theme, radius, filter',
      outline: '#clear :focus-visible[y]',
      mark: 'n :focusable[hover]',
      cursor: 'pointer :disabled[default]',
      selectable: 'y',
      box: 'y',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
      // for elements with transparent background
      'backdrop-filter': 'n :disabled[contrast(0.88)]',
    };
  }

  static get nuBehaviors() {
    return {
      control: true,
      action: true,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        touch-action: manipulation;
        -webkit-tap-highlight-color: var(--mark-color);
      }`,

      `${tag}[disabled] {
        pointer-events: none;
      }`,

      `${tag} > a {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        cursor: inherit;
        color: transparent;
        text-decoration: inherit;
        text-indent: -999rem;
        white-space: nowrap;
      }`,

      `${tag} > a:focus {
        outline: none;
      }`,
    ];
  }
}

class NuLink extends NuAction {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      color: '#special',
      text: 'nowrap u bold',
      cursor: 'pointer',
      radius: '.5r',
      transition: 'shadow, fill, color',
      mark: '.25em hover',
      selectable: 'y',
      box: 'y',
    };
  }
}

class NuBlockLink extends NuLink {
  static get nuTag() {
    return 'nu-blocklink';
  }

  static get nuStyles() {
    return {
      expand: '',
      radius: '0',
    };
  }
}

class NuListBox extends NuCard {
  static get nuTag() {
    return 'nu-listbox';
  }

  static get nuRole() {
    return 'listbox';
  }

  static get nuBehaviors() {
    return {
      listbox: true,
      focus: true,
    };
  }

  static get nuStyles() {
    return {
      padding: '.5x',
      outline: 'n',
      gap: '1bw',
      border: 'y :focus[y #special]',
    };
  }
}

class NuPopup extends NuCard {
  static get nuTag() {
    return 'nu-popup';
  }

  static get nuRole() {
    return 'dialog';
  }

  static get nuId() {
    return 'popup';
  }

  static get nuBehaviors() {
    return {
      fixate: true,
      popup: true,
    };
  }

  static get nuAttrs() {
    return {
      effect: '',
    };
  }

  static get nuStyles() {
    return {
      display: 'none :popup[block]',
      shadow: '',
      z: 'front',
      opacity: ':hidden[0] 1',
      interactive: 'yes :hidden[no]',
      transition: 'opacity, transform',
      origin: 'top',
      border: '1bw outside',
      width: '100% 100vw :drop[@fixate-width min-content 100vw]',
      text: 'n wrap',
      cursor: 'default',
      place: 'outside-bottom .5x 0',
      drop: '',
      padding: '',
      selectable: 'y',
      sizing: 'content',
    };
  }
}

class NuPopupListBox extends NuPopup {
  static get nuTag() {
    return 'nu-popuplistbox';
  }

  static get nuRole() {
    return 'listbox';
  }

  static get nuName() {
    return 'listbox';
  }

  static get nuBehaviors() {
    return {
      listbox: true,
      focus: 'manual',
    };
  }

  static get nuStyles() {
    return {
      padding: '.5x',
      outline: 'n',
      height: 'max 17',
      scrollbar: '',
      overflow: 'auto',
      place: 'outside-bottom left .5x 0',
      gap: '1bw',
      border: 'y :focus[y #special]',
      shadow: 'y',
    };
  }
}

class NuOption extends NuEl {
  static get nuTag() {
    return 'nu-option';
  }

  static get nuRole() {
    return 'option';
  }

  static get nuBehaviors() {
    return {
      option: true,
      active: true,
      hover: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'grid',
      padding: '1x 1.5x',
      fill: '#clear :selected.disabled[#special-bg] :disabled[#local-bg]',
      outline: 'n :current[y focus-outside visible]',
      width: '100%',
      flow: 'column',
      gap: '1x',
      content: 'center start',
      items: 'stretch',
      radius: '.5r',
      border: '0',
      color: '#text',
      transition: 'theme',
      mark: 'hover',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
      cursor: 'pointer :disabled[default]',
      inset: '.75em #shadow.0 :active[.75em #shadow.50] :selected[.75em #shadow.0] :active:selected[.75em #special-shadow.50]',
      text: 'sb nowrap',
    };
  }
}

class NuList extends NuEl {
  static get nuTag() {
    return 'nu-list';
  }

  static get nuRole() {
    return 'list';
  }

  static get nuGenerators() {
    return {
      type(type) {
        return {
          'list-style-type': type || 'disc',
        };
      },
      position(position) {
        return {
          'list-style-position': position || 'inside',
        };
      },
    }
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
      gap: '1x',
      position: 'outside',
    };
  }

  static nuCSS({ css, tag }) {
    return [
      ...css,

      `${tag}:not([enumerate]):not([type]) {
        list-style-type: disc;
      }`,

      `${tag}[enumerate]:not([type]) {
        list-style-type: decimal;
      }`,

      `${tag} ${tag}:not([padding]) {
        padding-left: calc(var(--gap) * 4);
      }`,
    ];
  }
}

class NuListItem extends NuEl {
  static get nuTag() {
    return 'nu-listitem';
  }

  static get nuRole() {
    return 'listitem';
  }

  static get nuStyles() {
    return {
      display: 'list-item',
    };
  }
}

class NuTab extends NuAction {
  static get nuTag() {
    return 'nu-tab';
  }

  static get nuRole() {
    return 'tab';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      fill: '#clear',
      flow: 'column',
      gap: '1x',
      items: '@local-tab-items',
      padding: '@local-tab-padding-v @local-tab-padding-h',
      border: '--local-line-width ${direction} bottom inside #special',
      expand: '@local-tab-expand-v @local-tab-expand-h',
      mark: null,
      text: 'sb nowrap',
      transition: 'border, color',
      color: '#text :pressed[#special]',

      '@local-line-width': `0
        :hover[1bw]
        :pressed[1ow]
        :active[1ow - 1bw]
        :active:hover[1ow - 1bw]
        :pressed:hover[1ow]
        :pressed:active.hover[1ow]`,
    };
  }
}

const BACKDROP_FILTER_SUPPORT = CSS.supports('backdrop-filter', 'none');

class NuBtn extends NuAction {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      padding: '1x 2x',
      border: '1bw :clear[#clear] :hover[1bw] :clear:hover[#mark] :special[#clear] :special:hover[#clear]',
      radius: '',
      flow: 'column',
      gap: '1x',
      content: 'center :dropdown[stretch]',
      items: 'center stretch',
      mark: 'n :focusable[hover]',
      text: 'sb nowrap',
      inset: '#clear :active[#shadow.50] :active:special[#special-shadow.50] :pressed[y] :pressed:special[#special-shadow] :active:pressed[#shadow.50] :active:special[#special-shadow.50] :active:pressed:special[#special-shadow.50]',
      fill: `#bg :disabled[#bg] :special.disabled[#special-bg] :clear[#clear] :clear:disabled[${BACKDROP_FILTER_SUPPORT ? '#clear' : '#local-bg'}]`,
      color: '#text :clear[#special] :special[#special-text] :special:clear[#special-text]',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}[special] {
        --shadow-color: var(--special-shadow-color);
        --shadow-color-rgb: var(--special-shadow-color-rgb);
      }`,

      `${tag}[special] > :not([theme]) {
        --text-soft-color: var(--special-text-color);
        --text-contrast-color: var(--special-text-color);
        --text-color: var(--special-text-color);
        --special-color: var(--special-text-color);
        --mark-color: var(--special-mark-color);
      }`,
    ];
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'loading') {
      this.disabled = value;

      let loadingEl = this.querySelector('nu-spin');

      if (typeof value === 'string') {
        if (loadingEl) {
          loadingEl.hidden = false;
        } else {
          loadingEl = h$1('nu-spin');
          loadingEl.hidden = true;

          this.prepend(loadingEl);

          loadingEl.offsetHeight; // trigger re-flow

          loadingEl.hidden = false;
        }
      } else {
        if (loadingEl) {
          loadingEl.hidden = true;
        }
      }
    }
  }
}

class NuCardBtn extends NuBtn {
  static get nuTag() {
    return 'nu-cardbtn';
  }

  static get nuStyles() {
    return {
      display: 'block',
      padding: '1.5x 2x',
      border: '1bw :clear[hidden] :hover[1bw] :clear:hover[#mark]',
      flow: 'column',
      text: 'wrap :special[sb wrap]',
      transition: 'theme, radius',
      shadow: '0 :clear[1.5]',
    }
  }
}

class NuItemBtn extends NuBtn {
  static get nuTag() {
    return 'nu-itembtn';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      padding: '',
      radius: '0',
      border: '0',
      fill: '#clear',
    };
  }
}

class NuMenu extends NuEl {
  static get nuTag() {
    return 'nu-menu';
  }

  static get nuRole() {
    return 'menu';
  }

  static get nuBehaviors() {
    return {
      menu: true,
    };
  }

  static get nuContext() {
    return {
      'attrs:popup': {
        width: '(100% + 1x) 100vw :drop[--fixate-width min-content 100vw]',
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'column',
      padding: '.5x',
      radius: '',
    };
  }
}

class NuMenuItem extends NuAction {
  static get nuTag() {
    return 'nu-menuitem';
  }

  static get nuRole() {
    return 'menuitem';
  }

  static get nuBehaviors() {
    return {
      menuitem: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      padding: '1x 1.5x',
      border: '0',
      radius: '.5r',
      flow: 'column',
      gap: '1x',
      content: 'stretch',
      items: 'center stretch',
      mark: 'hover',
      fill: '#clear',
      text: 'sb nowrap :special[sb nowrap]',
      inset: 'n :active[#shadow.50]',
    };
  }
}

class NuBlockQuote extends NuEl {
  static get nuTag() {
    return 'nu-blockquote';
  }

  static get nuRole() {
    return 'blockquote';
  }

  static get nuStyles() {
    return {
      display: 'block',
      radius: 'right',
      border: '(1x / 2) left #special',
      fill: '#diff',
      text: 'i',
      padding: '2x',
      size: 'lg',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContext('attrs:code', {
      fill: '#bg',
    });

    this.nuSetContext('attrs:mark', {
      fill: '#bg',
    });
  }
}

class NuBadge extends NuEl {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      flow: 'column',
      gap: '1x',
      items: 'center',
      padding: '0 .5em',
      radius: '',
      border: '1bw :special[1bw hidden]',
      text: 'nowrap :special[sb nowrap]',
      fill: '#bg :special[#special-bg]',
      color: '#text :special[#special-text]',
      box: 'y',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        line-height: calc(var(--line-height) - 1px);
      }`,
    ];
  }
}

class NuMark extends NuEl {
  static get nuTag() {
    return 'nu-mark';
  }

  static get nuRole() {
    return 'mark';
  }

  static get nuStyles() {
    return {
      text: 'nowrap bolder',
      padding: '0 .25em',
      space: '0 .25em',
      radius: '1r',
      color: '#text :special[#special-text]',
      fill: '#mark :special[#special-bg] :themed[#bg] :special:themed[#special-bg]',
    };
  }
}

class NuSpecial extends NuInline {
  static get nuTag() {
    return 'nu-special';
  }

  static get nuStyles() {
    return {
      color: '#special',
      text: 'sb',
    };
  }
}

class NuCircle extends NuEl {
  static get nuTag() {
    return 'nu-circle';
  }

  static get nuGenerators() {
    return {
      size(val) {
        return sizeAttr(val, {}, true);
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      width: '1fs 1fs',
      height: '1fs 1fs',
      size: '1em',
      radius: 'round',
      border: '',
      fill: '#bg :special[#special]',
    };
  }
}

class NuTriangle extends NuEl {
  static get nuTag() {
    return 'nu-triangle';
  }

  static get nuStyles() {
    return {
      direction: 'up',
      color: '#border',
      overflow: 'no',
      text: 'v-middle',
      height: '0',
      width: '0',
      border: '(1fs / 2) #clear',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}:not([border]):not([border]) {
        border-top: 0;
        border-bottom-color: currentColor;
        border-bottom-width: calc(var(--line-height) / 2);
      }`,

      `${tag}:not([size]):not([size]) {
        font-size: inherit;
        line-height: inherit;
      }`,
    ];
  }
}

class NuDateTime extends NuEl {
  static get nuTag() {
    return 'nu-datetime';
  }

  static get nuBehaviors() {
    return {
      datetime: true,
    };
  }
}

class NuNum extends NuEl {
  static get nuTag() {
    return 'nu-num';
  }

  static get nuBehaviors() {
    return {
      number: true,
    };
  }
}

class NuInput extends NuEl {
  static get nuTag() {
    return 'nu-input';
  }

  static get nuBehaviors() {
    return {
      input: true,
    };
  }

  static get nuGenerators() {
    return {
      padding: (val) => {
        const styles = paddingAttr(val, this.constructor.nuAllStyles);

        styles.$suffix = '>input,>textarea';

        return styles;
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'grid',
      flow: 'column',
      radius: '',
      padding: '1x',
      fill: '#input :special[#special-bg]',
      color: '#text :special[#special-text]',
      border: '1bw',
      outline: 'focus-inside',
      filter: 'n :disabled[saturate(0.33) contrast(0.78) opacity(var(--disabled-opacity))]',
      transition: 'theme',
      selectable: 'n',
      box: 'y',
      height: 'auto :empty[min (1fs + 2x)]',
      cursor: 'text',
      width: 'auto',
    };
  }

  static get nuContext() {
    return {
      'attrs:icon': {
        width: '((--gap * 2) + 1em)',
      },
    };
  }

  static nuCSS({ tag, css }) {
    const sel = (mod = '', childMod = '') => {
      return `${tag}${mod} input${childMod}, ${tag}${mod} textarea${childMod}`;
    };

    return [
      ...css,

      `${tag} input::-webkit-inner-spin-button, ${tag} input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }`,

      `${sel()} {
        display: block;
        width: 100%;
        max-width: initial;
        min-width: initial;
        height: initial;
        min-height: initial;
        max-height: initial;
        margin: 0;
        -webkit-appearance: none;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        text-align: inherit;
        word-spacing: calc(1rem / 8);
        background: transparent;
        color: inherit;
        -webkit-text-fill-color: currentColor;
        border: none;
        outline: none;
        border-radius: inherit;
        box-sizing: border-box;
        user-select: auto;
        resize: none;
        transition: opacity ${DEFAULT_TIMING} linear;
      }`,

      `${sel('', '::-webkit-search-cancel-button')} {
        display: none;
      }`,

      `${tag} input:-webkit-autofill, ${tag} input:-webkit-autofill:hover, ${tag} input:-webkit-autofill:focus {
        caret-color: var(--special-color);
        -webkit-text-fill-color: var(--special-color);
        -webkit-box-shadow: 0 0 0px 9999rem var(--input-color) inset;
        box-shadow: 0 0 0px 9999rem var(--input-color) inset;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }`,

      `${sel('', '[disabled]')} {
        color: inherit;
        background: transparent;
        -webkit-opacity: 1;
      }`,

      `${sel('', '::placeholder')} {
        -webkit-text-fill-color: var(--local-placeholder-color);
        color: var(--local-placeholder-color);
        filter: saturate(.33);
      }`,

      `${sel('[special]:not([disabled])', '::placeholder')} {
        --local-placeholder-color: var(--placeholder-color, rgba(var(--special-text-color-rgb), .5));
      }`,

      `${sel(':not([special]):not([disabled])', '::placeholder')} {
        --local-placeholder-color: var(--placeholder-color, rgba(var(--text-color-rgb), .5));
      }`,
    ];
  }
}

class NuNumInput extends NuInput {
  static get nuTag() {
    return 'nu-numinput';
  }

  static get nuBehaviors() {
    return {
      input: null,
      numinput: true,
    };
  }

  static get nuStyles() {
    return {
      text: 'center',
    };
  }

  static nuCSS({ tag, css, shadow }) {
    let all = [
      ...css,

      `${tag} > input:not(:focus) {
        opacity: 0;
      }`,

      `${tag} > input:focus {
        opacity: 1;
      }`
    ];

    if (!shadow) {
      all.push(
        `${tag}::after {
          content: var(--value);
          display: grid;
          place-content: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          text-align: inherit;
          transition: opacity ${DEFAULT_TIMING} linear;
          pointer-events: none;
        }`,

        `${tag}:not(:focus-within)::after {
          opacity: 1;
        }`,

        `${tag}:focus-within::after {
          opacity: 0;
        }`,
      );
    }

    return all;
  }
}

class NuPassword extends NuInput {
  static get nuTag() {
    return 'nu-password';
  }

  static get nuBehaviors() {
    return {
      input: 'type(password)',
    };
  }
}

class NuSearch extends NuInput {
  static get nuTag() {
    return 'nu-search';
  }

  static get nuBehaviors() {
    return {
      input: 'type(search)',
    };
  }
}

class NuTelInput extends NuInput {
  static get nuTag() {
    return 'nu-telinput';
  }

  static get nuBehaviors() {
    return {
      input: 'type(tel)',
    };
  }
}

class NuEmailInput extends NuInput {
  static get nuTag() {
    return 'nu-emailinput';
  }

  static get nuBehaviors() {
    return {
      input: 'type(email)',
    };
  }
}

class NuOneTimeCode extends NuInput {
  static get nuTag() {
    return 'nu-onetimecode';
  }

  static get nuBehaviors() {
    return {
      input: 'type(tel)',
    };
  }

  static get nuAttrs() {
    return {
      maxlength: '4',
      placeholder: '••••',
      autocomplete: 'one-time-code',
    };
  }
}

class NuFileInput extends NuEl {
  static get nuTag() {
    return 'nu-fileinput';
  }

  static get nuName() {
    return 'fileinput input';
  }

  static get nuTemplate() {
    return `
      <nu-block place="cover" opacity="0" overflow="n"><input/></nu-block>
      <nu-icon name="upload"></nu-icon>
      <nu-value></nu-value>
    `;
  }

  static get nuBehaviors() {
    return {
      fileinput: true,
      hover: true,
    };
  }

  static get nuStyles() {
    return {
      ...NuInput.nuStyles,
      height: 'min (1lh + 2x + 2bw)',
      cursor: 'pointer',
      content: 'center start',
      gap: '2x',
      items: 'center stretch',
      mark: 'hover',
    };
  }

  static get nuContext() {
    return {
      ...NuInput.nuContext,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }`,

      `${tag} input {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: scale(100, 100);
        cursor: inherit;
      }`,
    ];
  }
}

class NuTextArea extends NuInput {
  static get nuTag() {
    return 'nu-textarea';
  }

  static get nuBehaviors() {
    return {
      textarea: true,
      input: null,
    };
  }

  static get nuStyles() {
    return {
      height: '3lh + 2x + 2bw',
    };
  }
}

class NuSvg extends NuEl {
  static get nuTag() {
    return 'nu-svg';
  }

  static get nuContents() {
    return 'svg';
  }

  static get nuBehaviors() {
    return {
      svg: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      sizing: 'content',
      width: '1fs 100%',
      height: 'min 1fs',
      box: 'y',
      text: 'v-middle',
    };
  }

  nuConnected() {
    super.nuConnected();

    requireChild(this, 'svg');
  }
}

class NuImg extends NuEl {
  static get nuTag() {
    return 'nu-img';
  }

  static get nuContents() {
    return 'img';
  }

  static get nuBehaviors() {
    return {
      image: true,
    };
  }

  static get nuGenerators() {
    return {
      fit(val) {
        const { values, mods } = parseAttr(val);

        if (!mods.length) {
          val = 'none';
        } else {
          val = mods[0];
        }

        values[0] = values[0] || mods[1];
        values[1] = values[1] || mods[2];

        return {
          'object-fit': val,
          'object-position': `${values[0] || 'initial'} ${values[1] || ''}`,
        };
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      fit: 'contain',
      sizing: 'content',
      box: 'y',
      text: 'v-middle',
      width: 'max 100%',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} > img {
        display: block;
      }`,
    ];
  }

  nuConnected() {
    super.nuConnected();

    requireChild(this, 'img');
  }
}

class NuCode extends NuEl {
  static get nuTag() {
    return 'nu-code';
  }

  static get nuRole() {
    return 'figure';
  }

  static get nuStyles() {
    return {
      display: 'block',
      radius: '1r',
      text: 'monospace',
      fill: 'hue(0 0 0) :special[#dark]',
      color: 'hue(0 0 100) :special[#light]',
      '@com-color': 'hue(0 0 low) :special[hue(0 0 12 special)]',
      '@spc-color': 'hue(0 0 100) :special[color(white)]',
      '@nam-color': 'hue(0 0 100) :special[color(white)]',
      '@key-color': 'hue(240 70) :special[hue(240 70 10 special)]',
      '@num-color': 'hue(280 100 pastel) :special[hue(280 100 10 pastel special)]',
      '@pct-color': 'hue(60 pastel) :special[hue(60 100 10 pastel special)]',
      '@rex-color': 'hue(340 70) :special[hue(340 70 10 special)]',
      '@str-color': 'hue(180 70) :special[hue(180 70 10 special)]',
      '@unk-color': 'hue(240 0) :special[hue(240 0 10 special)]',
      '@pls-color': 'hue(180 70) :special[hue(180 70 10 special)]',
      '@mns-color': 'hue(1 70) :special[hue(1 70 10 special)]',
      '@mrk-color': 'hue(240 70 60) :special[hue(240 0 0 special)]',
      '@mrk-bg-color': 'hue(240 70 3) :special[hue(240 70 50 special)]',
      '@imp-color': 'color(white)',
      '@imp-bg-color': 'hue(1 70 special)',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} nu-block {
        white-space: pre;
      }`,

      `${tag} > pre, ${tag} > textarea {
        display: none;
      }`,

      `${tag} nu-el {
        display: inline !important;
      }`,

      `${tag} nu-el[plus]::before {
        content: '+ ';
        display: inline-block;
      }`,

      `${tag} nu-el[minus]::before {
        content: '- ';
        display: inline-block;
      }`,

      `${tag} nu-el[number]::before {
        content: '1. ';
        display: inline-block;
      }`,

      `${tag} nu-el[fill] {
        border-radius: var(--radius);
        padding: .25em;
      }`,
    ];
  }

  static get nuBehaviors() {
    return {
      code: true,
    };
  }

  nuConnected() {
    super.nuConnected();

    this.classList.add('notranslate');

    const ref = this.querySelector('textarea, pre');

    if (!ref) return;

    const container = h$1('nu-block');

    container.innerHTML = (ref.tagName === 'TEXTAREA' ? ref.textContent : ref.innerHTML)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/#\[\[|!\[\[|]]#|]]!/g, '');

    this.appendChild(container);
  }
}

class NuCd extends NuCode {
  static get nuTag() {
    return 'nu-cd';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      padding: '0 .25em',
      fill: 'diff',
    };
  }

  static get nuName() {
    return 'cd -code';
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        line-height: calc(var(--line-height) - 1px);
      }`,
    ];
  }
}

class NuDebug extends NuCard {
  static get nuTag() {
    return 'nu-debug';
  }

  static get nuBehaviors() {
    return {
      debugger: true,
    };
  }

  static get nuShadowRoot() {
    return false;
  }

  static get nuStyles() {
    return {
      gap: '1x',
    };
  }
}

class NuProgressBar extends NuEl {
  static get nuTag() {
    return 'nu-progressbar';
  }

  static get nuRole() {
    return 'progressbar';
  }

  static get nuBehaviors() {
    return {
      progressbar: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      transition: 'opacity',
      radius: '.5r',
      border: '',
      fill: '#bg',
      box: 'y',
      height: 'min .5em',
      overflow: 'no',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}::before {
        content: '';
        position: absolute;
        left: 0;
        width: calc(var(--value) * 100%);
        top: 0;
        bottom: 0;
        background: var(--special-color);
        border-radius: var(--border-width);
      }`,

      `${tag}::after {
        content: '';
        position: absolute;
        left: 0;
        width: calc(var(--value) * 100%);
        top: 0;
        bottom: 0;
        background-color: transparent;
        border-radius: var(--border-width);
        background-image: linear-gradient(to bottom, rgba(var(--dark-color-rgb), 0), rgba(var(--dark-color-rgb), .2)), linear-gradient(135deg, rgba(var(--special-text-color-rgb),.4) 0%, rgba(var(--special-text-color-rgb),.4) 34%, var(--special-bg-color) 40%, var(--special-bg-color) 70%, rgba(var(--special-text-color-rgb),.4) 76%, rgba(var(--special-text-color-rgb),.4) 100%), linear-gradient(to bottom, var(--special-bg-color), var(--special-bg-color));
        background-repeat: repeat;
        background-size: 3em;
        animation: nu-progressbar-animation calc(var(--progressbar-animation-time) * var(--transition-enabler)) linear infinite;
      }`,

      `@keyframes nu-progressbar-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 3em 0;
        }
      }`,
    ];
  }
}

class NuDatePicker extends NuEl {
  static get nuTag() {
    return 'nu-datepicker';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      gap: '',
    }
  }

  static get nuBehaviors() {
    return {
      datepicker: true,
    };
  }
}

class NuTooltip extends NuEl {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuId() {
    return 'tooltip';
  }

  static get nuBehaviors() {
    return {
      fixate: true,
      tooltip: true,
    };
  }

  static get nuAttrs() {
    return {
      theme: '',
    };
  }

  static get nuStyles() {
    return {
      display: 'none :tooltip[block]',
      shadow: '',
      padding: '.5x 1x',
      z: 'front',
      opacity: '1 :hidden[0]',
      transition: 'opacity',
      place: 'outside-top',
      drop: '',
      fill: '#bg',
      color: '#text',
      radius: '1r',
      border: '1bw outside',
      size: 'xs',
      interactive: 'no',
      text: 'b wrap',
      width: 'min-content initial 20rem',
      space: 'remove',
      sizing: 'content',
    };
  }
}

class NuMarkdown extends NuEl {
  static get nuTag() {
    return 'nu-markdown';
  }

  static get nuStyles() {
    return {
      display: 'block',
      gap: '1x',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} pre, ${tag} textarea {
        display: none;
      }`,
    ];
  }

  static get nuContext() {
    return {
      'attrs:list': {
        position: 'inside',
      },
    };
  }

  static get nuBehaviors() {
    return {
      markdown: true,
    };
  }
}

class NuMd extends NuMarkdown {
  static get nuTag() {
    return 'nu-md';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      text: 'baseline',
    };
  }

  static get nuBehaviors() {
    return {
      markdown: 'inline',
    }
  }
}

class NuSlider extends NuEl {
  static get nuTag() {
    return 'nu-slider';
  }

  static get nuRole() {
    return 'slider';
  }

  static get nuTemplate() {
    return `
      <nu-circle
        id="slider-thumb"
        place="top left @local-rail-top @local-rail-left"
        size="1.25em"
        radius="round"
        fill="#special-text"
        border
        shadow="1ow #shadow"
        space=".375em + 1bw"
        text="v-middle"
        move="@local-rail-move-v @local-rail-move-h"
        orient="h"
        opacity="1"
        outline="focus-outside visible"></nu-circle>
    `;
  }

  static get nuGenerators() {
    return {
      orient(val) {
        const vertical = val === 'v';

        return combinedAttr([{
          width: vertical ? '.5em' : '100%',
          height: vertical ? '10x' : '.5em',
          '--local-rail-move-h': vertical ? '-.5em - 1bw' : '-.5em + 1bw',
          '--local-rail-move-v': vertical ? '-.5em + 1bw' : '-.5em - 1bw',
          '--local-rail-top': vertical ? '(100% - @local-offset)' : '0',
          '--local-rail-left': vertical ? 'initial' : '@local-offset',
          '--local-rail-bottom': vertical ? '@local-offset' : 'initial',
          '--orient': vertical ? 'v' : 'h',
        }], NuSlider);
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      radius: 'round',
      fill: '#special',
      border: '1bw',
      text: 'v-middle',
      cursor: 'pointer :disabled[default]',
      mark: '.5em hover :disabled[n]',
      transition: 'shadow',
      expand: '.5em',
      orient: 'h',
      outline: 'n',
      box: 'y',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
    };
  }

  static get nuBehaviors() {
    return {
      orient: 'dynamic',
      slider: true,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        touch-action: none;
      }`,
    ];
  }
}

class NuSlider2d extends NuEl {
  static get nuTag() {
    return 'nu-slider2d';
  }

  static get nuRole() {
    return 'slider';
  }

  static get nuTemplate() {
    return `
      <nu-circle
        id="slider-thumb"
        place="bottom left @local-rail-bottom @local-rail-left"
        size="1.25em"
        radius="round"
        fill="#special-text"
        border
        shadow="1ow #dark.50"
        space=".375em + 1bw"
        text="v-middle"
        move="@local-rail-move-v @local-rail-move-h"
        orient="h"
        opacity="1"
        outline="focus-outside visible"></nu-circle>
    `;
  }

  static get nuStyles() {
    return {
      display: 'block',
      radius: '',
      fill: '#special-bg',
      border: '1bw',
      text: 'v-middle',
      cursor: 'pointer :disabled[default]',
      mark: '.5em hover :disabled[n]',
      transition: 'shadow',
      expand: '.5em',
      outline: 'n',
      box: 'y',
      height: '5em',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
      '@local-rail-move-h': '.5em - 1bw',
      '@local-rail-move-v': '-.5em - 1bw',
      '@local-rail-left': '@local-offset-x',
      '@local-rail-bottom': '@local-offset-y',
    };
  }

  static get nuBehaviors() {
    return {
      slider2d: true,
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        touch-action: none;
      }`,
    ];
  }
}

class NuSwitch extends NuAction {
  static get nuTag() {
    return 'nu-switch';
  }

  static get nuRole() {
    return 'switch';
  }

  static get nuShadowRoot() {
    return false;
  }

  static get nuTemplate() {
    return `
      <nu-circle
        size="@circle-size"
        interactive="n"
        transition="transform, fill"
        move="@circle-offset"
        fill="@circle-bg-color"
        overflow="no"
        border="0"
        shadow="0 0 1ow #circle-shadow"></nu-circle>
    `;
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      border: '1bw',
      sizing: 'content',
      radius: 'round',
      outline: 'focus visible',
      inset: `0 :active[.5em #shadow.50] :pressed[0] :pressed:active[.5em #special-shadow.50]`,
      transition: 'shadow',
      width: '(@size * 2)',
      fill: `bg :pressed[special-bg]`,
      text: 'middle',
      mark: ':focusable[hover]',
      padding: '@circle-gap',

      '@size': '1em + @circle-gap',
      '@circle-gap': '1ow',
      '@circle-size': '@size',
      '@circle-offset': `0
        :pressed[@size - 1bw]`,
      '@circle-bg-color': `@special-bg-color :pressed[@special-text-color]`,
      '@circle-shadow-color': '#shadow :pressed[#special-shadow.66]',
    };
  }
}

class NuCheckbox extends NuAction {
  static get nuTag() {
    return 'nu-checkbox';
  }

  static get nuRole() {
    return 'checkbox';
  }

  static get nuShadowRoot() {
    return false;
  }

  static get nuTemplate() {
    return `
      <nu-icon
        name="check checkmark"
        size="1em"
        height="1em"
        width="1em"
        color="^ #clear :pressed[#special-text]"
        fill="^ #bg :pressed[#special-bg]"
        transition="fill, color, opacity, inset"
        transition="opacity"
        radius="@context-radius"
        border="^ #text :pressed[#special-bg] :disabled.pressed[#text.50]"
        inset="^ 0 :active[.5em] :pressed[0] :active:pressed[.5em]"></nu-icon>
    `;
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      width: '1em + 2bw',
      height: '1em + 2bw',
      radius: '.25em',
      content: 'stretch',
      items: 'center',
      padding: '0',
      sizing: 'content',
      cursor: 'default',
      text: 'v-middle',
      mark: '.5em hover :disabled[n]',
      expand: '.5em',
      inset: 'n',
      transition: 'all',
      outline: '#clear :focus-visible[y]',
    };
  }
}

class NuRadio extends NuAction {
  static get nuTag() {
    return 'nu-radio';
  }

  static get nuRole() {
    return 'radio';
  }

  static get nuShadowRoot() {
    return false;
  }

  static get nuTemplate() {
    return `
      <nu-circle
        fill="^host #clear :pressed[#special-bg]"
        transition="fill"
        size="1em - 2bw"
        border="0"></nu-circle>
    `;
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      width: '1em - 2bw',
      height: '1em - 2bw',
      border: '#text :pressed[#special-bg] :disabled.pressed[#text.50]',
      radius: 'round',
      content: 'stretch',
      items: 'center',
      padding: '1ow',
      sizing: 'content',
      cursor: 'default',
      text: 'v-middle',
      mark: 'n :focusable[.5em hover] :pressed.focusable[n]',
      inset: '0 :active[.5em] :pressed[0]',
      fill: '#bg',
      expand: '.5em',
    };
  }
}

class NuLabel extends NuEl {
  static get nuTag() {
    return 'nu-label';
  }

  static get nuStyles() {
    return {
      display: 'block',
      text: 'sb',
      cursor: 'default',
      transition: 'theme, transform',
    };
  }

  static get nuBehaviors() {
    return {
      label: true,
    };
  }
}

class NuForm extends NuFlow {
  static get nuTag() {
    return 'nu-form';
  }

  static get nuRole() {
    return 'form';
  }

  static get nuBehaviors() {
    return {
      form: true,
    };
  }

  static get nuStyles() {
    return {
      gap: '2x',
    };
  }

  static get nuType() {
    return 'object';
  }
}

class NuCheck extends NuEl {
  static get nuTag() {
    return 'nu-check';
  }

  static get nuBehaviors() {
    return {
      validator: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      opacity: ':invalid[1] 0',
      interactive: ':invalid[yes] no',
      size: 'sm',
      text: 'b',
      transition: 'opacity, height',
      color: '#danger',
    };
  }

  nuInit() {
    this.style.maxHeight = '0';
  }
}

class NuDateInput extends NuBtn {
  static get nuTag() {
    return 'nu-dateinput';
  }

  static get nuStyles() {
    return {
      padding: '1x .5x 1x 1x',
      content: 'stretch',
      height: 'min (1lh + 2b + 2x)',
    };
  }

  static get nuBehaviors() {
    return {
      action: true,
      dateinput: true,
    };
  }
}

class NuValue extends NuEl {
  static get nuTag() {
    return 'nu-value';
  }

  static get nuBehaviors() {
    return {
      value: true,
    };
  }

  static get nuStyles() {
    return {
      filter: 'n :placeholder[saturate(0.33) contrast(0.78) opacity(var(--disabled-opacity))]',
    };
  }
}

class NuPh extends NuEl {
  static get nuTag() {
    return 'nu-ph';
  }

  static get nuId() {
    return 'ph';
  }

  static get nuStyles() {
    return {
      display: 'block',
      fill: '#special-bg',
      height: '1fs 1fs',
      width: 'auto :circle[1lh]',
      radius: '.5r :circle[round]',
      interactive: 'n :disabled[y]',
      filter: 'saturate(0.5) contrast(0.88)',
      opacity: .18,
      transition: 'color',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}:not([is-static]) {
        background-image: linear-gradient(135deg, rgba(var(--special-text-color-rgb), .5) 0%, rgba(var(--special-text-color-rgb), .5) 5%, rgba(var(--special-text-color-rgb), 0) 35%, var(--special-bg-color) 50%, rgba(var(--special-bg-color-rgb), 0) 65%, rgba(var(--special-text-color-rgb), .5) 95%, rgba(var(--special-text-color-rgb), .5) 100%);
        background-repeat: repeat;
        background-size: var(--ph-animation-size);
        animation: nu-ph-animation calc(var(--ph-animation-time) * var(--transition-enabler)) linear infinite;
      }`,

      `@keyframes nu-ph-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: var(--ph-animation-size) 0;
        }
      }`,
    ];
  }
}

class NuSpin extends NuEl {
  static get nuTag() {
    return 'nu-spin';
  }

  static get nuTemplate() {
    return `<svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>`;
  }

  static get nuStyles() {
    return {
      display: 'inline-flex',
      overflow: 'no',
      items: 'center',
      color: '#text :special[#special]',
      border: null,
      fill: null,
      interactive: 'n',
      opacity: '1 :hidden[0]',
      width: '1em :hidden[0em]',
      height: '1em',
      transition: 'color, width, opacity',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        animation: nu-spin-animation calc(var(--spin-animation-time) * var(--transition-enabler)) linear infinite;
      }`,

      `${tag} > svg {
        min-width: 1em;
        min-height: 1em;
      }`,

      `@keyframes nu-spin-animation {
        0% {
          transform: rotate(0turn);
        }
        100% {
          transform: rotate(1turn);
        }
      },`,
    ];
  }
}

const IGNORE_ATTRS = ['id', 'class', 'nu', 'for'];

class NuDefinition extends NuAbstract {
  static get nuTag() {
    return 'nu-definition'; // abstract tag
  }

  static get nuStyles() {
    return {
      display: 'none',
    };
  }

  static get nuGenerators() {
    return {
      [THEME_ATTR]: null,
      responsive: null,
      as: null,
    };
  }

  static get nuCombinators() {
    return {};
  }

  static nuCSS({ tag, css }) {
    return [`${tag} { display: none !important; }`];
  }

  get nuParentSelector() {
    return `#${this.parentNode.nuUniqId}`;
  }

  nuSetMod(name, value) {
    if (name !== RESPONSIVE_ATTR) {
      super.nuSetMod(name, value);
    }
  }

  get nuOwnAttrs() {
    return [...this.attributes].reduce((map, { name, value }) => {
      if (IGNORE_ATTRS.includes(name) || name.startsWith('nu-') || name.startsWith('aria-')) return map;

      map[name] = value;

      return map;
    }, {});
  }

  nuConnected() {
    super.nuConnected();

    this.nuDefinition = true;
  }
}

const ATTRS_LIST = [
  'name',
  'hue',
  'saturation',
  'pastel',
  'mod',
];

const NAME_STOP_LIST = [
  'text',
  'bg',
  'border',
  'mark',
  'outline',
  'subtle',
  'text',
  'special',
  'input',
  'diff',
  'local',
  'main',
  'tint',
  'tone',
  'swap',
];

const SELECTOR = '[nu][theme]';

const VERIFY_MAP = new Map;

/**
 * @class
 * @property nuParent
 */
class NuTheme extends NuDefinition {
  static get nuTag() {
    return 'nu-theme';
  }

  static get nuGenerators() {
    return ATTRS_LIST.reduce((attrs, attr) => {
      attrs[attr] = '';

      return attrs;
    }, {});
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) return;

    this.nuApply();
  }

  nuConnected() {
    super.nuConnected();

    this.nuParent = this.parentNode;

    setTimeout(() => this.nuApply(true));
  }

  nuDisconnected() {
    super.nuDisconnected();

    // remove theme
    if (this.nuParent && this.nuName) {
      removeTheme(this.nuParent, this.nuName, this.nuProps || {});
    }

    delete this.nuParent;
  }

  nuApply(initial = false) {
    if (!this.nuParent) return;

    const attrs = [...this.attributes].reduce((map, attr) => {
      if (attr.name === 'pastel') {
        map[attr.name] = this.hasAttribute('pastel');
      } else {
        map[attr.name] = this.nuGetAttr(attr.name, true);
      }

      return map;
    }, {});

    let { name = '', hue, saturation, pastel, mod } = attrs;

    const cache = JSON.stringify({ name, hue, saturation, pastel, mod });

    if (this.nuCache === cache) return;

    this.nuCache = cache;

    if (hue && hue !== '0' && isNaN(Number(hue))) {
      hue = hueFromString(hue);
    }

    pastel = !!pastel;
    name = name.trim();

    if (NAME_STOP_LIST.includes(name)) {
      warn$1('[nu-theme] reserved name used:', JSON.stringify(name));

      return;
    }

    name = name || 'main';

    hue = hue != null ? Number(hue) : null;
    saturation = saturation == null || saturation === 'auto' ? (pastel ? 100 : getOptimalSaturation(hue)) : Number(saturation);

    if (hue > 359 || hue < 0) {
      warn$1('[nu-theme] hue is out of range [0..359]:', JSON.stringify(hue));

      return;
    }

    if (saturation > 100 || saturation < 0) {
      warn$1('[nu-theme] saturation is out of range [0..100]:', JSON.stringify(saturation));

      return;
    }

    const defaultMods = mod || '';

    // check modifiers
    if (devMode) {
      const mods = defaultMods.split(/\s+/g);

      mods.forEach(md => {
        if (md && !ALL_THEME_MODS.includes(md)) {
          warn$1('[nu-theme] unsupported modifier:', JSON.stringify(md));
        }
      });
    }

    this.nuName = name;
    this.nuHue = hue;
    this.nuSaturation = saturation;
    this.nuPastel = pastel;
    this.nuMods = defaultMods;

    if (!initial) {
      removeTheme(this.nuParent, this.nuName, this.nuProps);
    }

    if (hue == null || hue !== hue || saturation !== saturation) {
      warn$1('incorrect theme', {
        definition: this,
        name,
        hue,
        saturation,
        pastel,
      });

      return;
    }

    declareTheme(this.nuParent, name, hue, saturation, pastel, defaultMods || '');

    if (!initial) {
      const parent = this.nuParent;

      if (!VERIFY_MAP.has(parent)) {
        VERIFY_MAP.set(parent, setTimeout(() => {
          const values = [];

          VERIFY_MAP.delete(parent);
          [...parent.querySelectorAll(SELECTOR)]
            .forEach(el => {
              values.push(...el.nuEnsureThemes(true, values));
            });
        }));
      }
    }
  }
}

function getSelector(id, oldId) {
  id = id.replace(/^\$+/, '');
  oldId = oldId ? oldId.replace(/^\$+/, '') : null;

  return `* > nu-attrs[for="${id}"], ${(!ELEMENTS_MAP[id] ? `[as*="${id}"], [id="${id}"], [id^="${id}--"], [nu-${id}]` : id)}${
    oldId
      ? `, * > nu-attrs[for="${oldId}"]${(!ELEMENTS_MAP[oldId]
        ? `, [as*="${oldId}"], [id="${oldId}"], [id^="${oldId}--"], [nu-${oldId}]`
        : `, ${oldId}`)}`
      : ''}`;
}

class NuAttrs extends NuDefinition {
  static get nuTag() {
    return 'nu-attrs';
  }

  static get nuGeneratorsList() {
    return ['for'].concat(getAllAttrs());
  }

  nuConnected() {
    super.nuConnected();

    setTimeout(() => {
      this.nuApply();
    });
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    this.nuApply();
  }

  nuApply() {
    if (!this.nuIsConnected) {
      return;
    }

    const parent = this.parentNode;
    let id = this.getAttribute('for');

    if (!this.nuContext.allowShadow) {
      id = id.replace(/^\$+/, '');
    }

    // Clear previous declaration
    const oldId = this.nuFor !== id ? this.nuFor : null;

    if (oldId) {
      parent.nuSetContext(`attrs:${oldId}`, null);
    }

    if (!parent.nuContext || !id) return;

    this.nuParent = parent;
    this.nuFor = id;

    const attrs = this.nuOwnAttrs;
    const key = `attrs:${id}`;
    const parentDefine = parent.nuParentContext[key];
    const define = parentDefine ? Object.assign({}, parentDefine) : {};

    delete attrs.for;

    Object.keys(attrs).forEach(name => {
      define[name] = attrs[name];
    });

    define.$shadowRoot = this.nuContext.$shadowRoot;

    parent.nuSetContext(`attrs:${id}`, define);

    const selector = getSelector(id, oldId);
    const shadow = id.startsWith('$') || (oldId && oldId.startsWith('$'));

    parent.nuVerifyChildren({ attrs: selector, shadow, ignore: parent.nuQueryChildren('nu-attrs') });
  }

  // nuGetCriticalCSS() {
  //   const parent = this.parentNode;
  //   const uniqId = parent.nuUniqId;

  //   if (!uniqId || uniqId.includes('--')) return '';

  //   const id = this.getAttribute('for');
  //   const attrs = this.nuOwnAttrs;
  //   const selector = getSelector(id);
  //   const Element = ELEMENTS_MAP[id] || ELEMENTS_MAP['nu-el'];
  //   const context = `#${uniqId}`;

  //   delete attrs.for;

  //   let styles, query, css = '';

  //   Object.keys(attrs).forEach(name => {
  //     const value = attrs[name];

  //     styles = computeStyles(name, value, Element.nuAllGenerators, Element.nuAllStyles);

  //     if (styles) {
  //       selector.split(', ').forEach(sel => {
  //         query = `${context} ${sel}:not([${name}])`;

  //         css += generateCSS(query, styles, true);
  //       });
  //     }
  //   });

  //   return css;
  // }

  nuDisconnected() {
    super.nuDisconnected();

    const parent = this.nuParent;

    if (!parent) return;

    const id = this.getAttribute('for');
    const selector = getSelector(id);
    const shadow = id.startsWith('$');

    parent.nuSetContext(`attrs:${id}`, null);

    parent.nuVerifyChildren({ attrs: selector, shadow });
  }
}

function handleProp(varName, varValue) {
  const zones = parseAttrStates(varValue);
  const isColor = varName.endsWith('-color');

  zones.map(zone => {
    const states = zone.states;

    Object.keys(states)
      .forEach(stateName => {
        const val = states[stateName];

        states[stateName] = `${varName};${(
          isColor
            ? parseColor(val).color
            : parseAttr(val).value
        ) || ''}`;
      });
  });

  return normalizeAttrStates(zones);
}

class NuProps extends NuDefinition {
  static get nuTag() {
    return 'nu-props';
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();

    if (this.nuObserver) return;

    const observer = new MutationObserver(() => this.nuApply());

    observer.observe(this, {
      characterData: false,
      attributes: true,
      childList: false,
      subtree: false
    });

    this.nuObserver = observer;
  }

  nuApply() {
    const parent = this.parentNode;
    const context = this.nuParentSelector;
    const props = this.nuOwnAttrs;

    if (JSON.stringify(this.nuProps) === JSON.stringify(props)
      || !parent
      || !parent.nuGetCSS) return;

    this.nuProps = props;

    Object.entries(props).forEach(([varName, varValue]) => {
      const value = handleProp(varName, varValue);

      const css = parent.nuGetCSS(context, 'prop', value);

      insertRuleSet(`prop:${varName}:${context}`, css, null, true);

      log('apply property', { context: parent, name: varName, value: value });
    });
  }
}

const BASE_ATTR = 'size';

const ElementStub = {
  nuAllGenerators: {
    [BASE_ATTR](val) {
      const { values } = parseAttr(val, 0);

      return { 'font-size': values[0] };
    },
  },
  nuAllStyles: {},
};

class NuBase extends NuDefinition {
  static get nuTag() {
    return 'nu-base';
  }

  static get nuGenerators() {
    return {
      size: '',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) return;

    if (name === BASE_ATTR) {
      this.nuApply();
    }
  }

  nuApply() {
    if (document.querySelector('nu-base') !== this) {
      warn$1('only single instance of nu-base is allowed');

      return;
    }

    const value = this.getAttribute(BASE_ATTR);
    const normalizedValue = normalizeAttrStates(value);
    const query = ':root';
    const isResponsive = normalizedValue.includes('|');
    const respContext = this.nuContext && this.nuContext.responsive && this.nuContext.responsive.context;

    let css;

    if (isResponsive && respContext) {
      const zones = ['max'].concat(respContext.getAttribute(RESPONSIVE_ATTR).split('|'));
      const styles = generateCSSByZones(ElementStub, query, BASE_ATTR, value, zones);

      css = respContext.nuResponsive()(styles);
    } else {
      let styles = computeStyles(BASE_ATTR, value, ElementStub.nuAllGenerators, ElementStub.nuAllStyles);

      css = generateCSS(query, styles, true);
    }

    insertRuleSet(`base`, css, null, true);

    log('set base:', { value: normalizedValue });
  }
}

/* Elements */

var elements = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NuRoot: NuRoot,
  NuGrid: NuGrid,
  NuFlow: NuFlow,
  NuEl: NuEl,
  NuBlock: NuBlock,
  NuFlex: NuFlex,
  NuCard: NuCard,
  NuPane: NuPane,
  NuNavigation: NuNav,
  NuAside: NuAside,
  NuArticle: NuArticle$1,
  NuMain: NuMain,
  NuSection: NuSection,
  NuRegion: NuRegion,
  NuHeader: NuHeader,
  NuFooter: NuArticle,
  NuStatus: NuStatus,
  NuLine: NuLine,
  NuInline: NuInline,
  NuStrong: NuStrong,
  NuEm: NuEm,
  NuSup: NuSup,
  NuSub: NuSub,
  NuContents: NuContents,
  NuHeading: NuHeading,
  NuH1: NuH1,
  NuH2: NuH2,
  NuH3: NuH3,
  NuH4: NuH4,
  NuH5: NuH5,
  NuH6: NuH6,
  NuDescription: NuDescription,
  NuSpacer: NuSpacer,
  NuIcon: NuIcon,
  NuDropdownIcon: NuDropdownIcon,
  NuTable: NuTable,
  NuGridTable: NuGridTable,
  NuRow: NuRow,
  NuRowGroup: NuRowGroup,
  NuCell: NuCell,
  NuTableHeader: NuTableHeader,
  NuColumnHeader: NuColumnHeader,
  NuRowHeader: NuRowHeader,
  NuField: NuField,
  NuGroup: NuGroup,
  NuInputGroup: NuInputGroup,
  NuBtnGroup: NuBtnGroup,
  NuRadioGroup: NuRadioGroup,
  NuTablist: NuTablist,
  NuLink: NuLink,
  NuBlockLink: NuBlockLink,
  NuListBox: NuListBox,
  NuPopupListBox: NuPopupListBox,
  NuOption: NuOption,
  NuList: NuList,
  NuListItem: NuListItem,
  NuAction: NuAction,
  NuTab: NuTab,
  NuBtn: NuBtn,
  NuCardBtn: NuCardBtn,
  NuItemBtn: NuItemBtn,
  NuMenu: NuMenu,
  NuMenuItem: NuMenuItem,
  NuBlockQuote: NuBlockQuote,
  NuBadge: NuBadge,
  NuMark: NuMark,
  NuSpecial: NuSpecial,
  NuCircle: NuCircle,
  NuTriangle: NuTriangle,
  NuDateTime: NuDateTime,
  NuNum: NuNum,
  NuInput: NuInput,
  NuNumInput: NuNumInput,
  NuPassword: NuPassword,
  NuSearch: NuSearch,
  NuTelInput: NuTelInput,
  NuEmailInput: NuEmailInput,
  NuOneTimeCode: NuOneTimeCode,
  NuFileInput: NuFileInput,
  NuTextArea: NuTextArea,
  NuSvg: NuSvg,
  NuImg: NuImg,
  NuCode: NuCode,
  NuCd: NuCd,
  NuDebug: NuDebug,
  NuProgressBar: NuProgressBar,
  NuDatePicker: NuDatePicker,
  NuTooltip: NuTooltip,
  NuMarkdown: NuMarkdown,
  NuMd: NuMd,
  NuSlider: NuSlider,
  NuSlider2d: NuSlider2d,
  NuSwitch: NuSwitch,
  NuCheckbox: NuCheckbox,
  NuRadio: NuRadio,
  NuLabel: NuLabel,
  NuForm: NuForm,
  NuCheck: NuCheck,
  NuPopup: NuPopup,
  NuDateInput: NuDateInput,
  NuValue: NuValue,
  NuPh: NuPh,
  NuSpin: NuSpin,
  NuTheme: NuTheme,
  NuAttrs: NuAttrs,
  NuProps: NuProps,
  NuBase: NuBase
});

var units = {
  define(unitName, converter) {
    if (devMode && ((typeof converter !== 'string' && typeof converter !== 'function') || !unitName || typeof unitName !== 'string')) {
      warn$1('invalid unit converter', { unitName, converter });
    }

    CUSTOM_UNITS[unitName] = converter;
  },
  has(name) {
    return !!CUSTOM_UNITS[name];
  },
  get(name) {
    return CUSTOM_UNITS[name];
  },
};

let loader$1 = (src) => {
  return fetch(src)
    .then(response => response.text());
};

const Svg = {
  /**
   * @param src
   * @return {Promise<String>}
   */
  load(src) {
    return loader$1(src);
  },
  setLoader(_loader) {
    loader$1 = _loader;
  }
};

const handleJSON = response => response.ok ? response.json() : {};

let ION_CACHE;

function ionIconsLoader(name) {
  if (!ION_CACHE) {
    ION_CACHE = fetch(`https://cdn.jsdelivr.net/npm/ionicons@5/dist/ionicons.symbols.svg`)
      .then(response => response.ok ? response.text() : '')
      .then(str => {
        const el = h$1('div');

        el.innerHTML = str;

        return el;
      });
  }

  return ION_CACHE.then((cache) => {
    const svg = cache.querySelector(`#${name}`);

    if (!svg.outerHTML) return '';

    const contents = svg.innerHTML.split('</title>')[1];

    return `<svg viewBox="0 0 512 512" style="stroke: currentColor; fill: currentColor;">${contents}</svg>`;
  });
}

let FEATHER_CACHE;

async function featherIconsLoader(name) {
  name = name.replace('-outline', '');

  if (!FEATHER_CACHE) {
    FEATHER_CACHE = fetch(`https://cdn.jsdelivr.net/npm/feather-icons@4/dist/icons.json`)
      .then(handleJSON);
  }

  return FEATHER_CACHE.then((cache) => {
    if (!cache || !cache[name]) return '';

    const contents = cache[name];

    return `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" style="stroke-width: var(--icon-stroke-width, 2px);" stroke-linecap="round" stroke-linejoin="round">${contents}</svg>`;
  });
}

let EVA_CACHE;

async function evaIconsLoader(name) {
  if (!EVA_CACHE) {
    EVA_CACHE = Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/eva-icons@1/fill-icons.json')
        .then(handleJSON),
      fetch('https://cdn.jsdelivr.net/npm/eva-icons@1/outline-icons.json')
        .then(handleJSON),
    ])
      .then((maps) => {
        return maps.reduce((obj, map) => Object.assign(obj, map), {});
      });
  }

  return EVA_CACHE.then((cache) => {
    const contents = cache[name];

    if (!contents) return '';

    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">${contents}</svg>`;
  });
}

let loader = (name) => {
  if (ICONS_PROVIDER in Icons.loaders) {
    return Icons.loaders[ICONS_PROVIDER](name);
  }

  warn$1('icon not found', { name });

  return Promise.resolve('');
};

const ICONS_CACHE = {};

const Icons = {
  load(names, type) {
    if (names in ICONS_CACHE) return ICONS_CACHE[names];

    return ICONS_CACHE[names] = Promise
      .all(names.split(/\s+/g)
        .map(name => {
          if (!name || typeof name !== 'string' || !name.trim()) return Promise.resolve('');

          return loader(name, type)
            .catch(() => '');
        }))
      .then(list => {
        return list.find(iconData => !!iconData);
      })
      .catch(e => warn$1(e));
  },
  setLoader(_loader) {
    loader = _loader;
  },
  loaders: {
    feather: featherIconsLoader,
    eva: evaIconsLoader,
    ion: ionIconsLoader,
  },
};

let router = () => true;

function setRouter(_router) {
  router = _router;
}

function setInternalRouter(_router) {
  router = (url, openNewTab) => {
    if (
      openNewTab ||
      url.startsWith('https://') ||
      url.includes('//') ||
      url.startsWith('mailto:')
    ) {
      return true;
    }

    return !!_router(url, openNewTab); // handle routing by Vue Router
  };
}

const Routing = {
  route(...args) {
    return router(...args)
  },
  setRouter,
  setInternalRouter,
};

const LOCALE_VAR = 'locale';

const BOOL_TYPE = (val) => val != null;
const ALIAS_ATTR = (el, name) => {
  return (val) => {
    if (el.hasAttribute(name)) return;

    if (val != null) {
      el.setAttribute(name, val);
    } else {
      el.removeAttribute(name);
    }
  }
};
const NUMBER_TYPE = (defaultValue) => {
  return (value) => {
    let num = parseFloat(value);

    if (num == null || num !== num) num = defaultValue;

    return num;
  };
};

const BASE_PROPS = NuEl.nuPropsList.reduce((props, name) => {
  props[name] = null;

  return props;
}, {});

Object.assign(BASE_PROPS, {
  type: 'text',
  value(val) {
    return this.setValue(val, true);
  },
  disabled: BOOL_TYPE,
  /**
   * If TRUE then trigger control on init.
   */
  trigger: BOOL_TYPE,
  role(role) {
    if (role !== this.role) {
      this.role = role;
    }
  },
  lang(val) {
    if (!this.params.localized) return;

    this.setLocale(val);

    return val;
  },
  ['link-value'](val) {
    const bool = val != null;

    // postpone linking
    setImmediate(() => this.linkContextValue());

    return bool;
  },
  placeholder: '...',
});

delete BASE_PROPS.control;

let PROPS_LIST;

function registerProp(name, cb) {
  BASE_PROPS[name] = cb;
}

class WidgetBehavior extends Behavior {
  static get params() {
    return {
      /**
       * Tells that it's a widget.
       */
      widget: true,
      /**
       * Default role for the element.
       */
      role: '',
      /**
       * Widget uses locale (lang attribute or `locale` in context).
       */
      localized: false,
      /**
       * Widget has priority in value linking.
       */
      primary: null,
      /**
       * Widget can be part of a form.
       */
      input: false,
      /**
       * Widget provides input action to the context.
       * So its children can manipulate its value if they have linkValue param.
       */
      provideValue: true,
      /**
       * Widget links its own value with context element that has provideValue param.
       * Requires explicit "link-value" to be set.
       */
      linkValue: true,
      /**
       * Widget links host value to its own value.
       */
      linkHostValue: true,
    };
  }

  constructor(host, params) {
    super(host, params);

    this.props = { ...BASE_PROPS };

    /**
     * @type {FormBehavior}
     */
    this.form = null;
    this.validity = true; // valid by default
  }

  init() {
    const { host } = this;
    const localized = this.params.localized;

    // generate cache of props list
    if (!PROPS_LIST) {
      PROPS_LIST = Object.keys(BASE_PROPS).reverse();
    }

    if (!this.hasAttr('role') && this.params.role) {
      this.setAttr('role', this.params.role);
    }

    // get current values of attributes and handle them
    for (let prop of PROPS_LIST) {
      const value = host.getAttribute(prop);

      this.fromAttr(prop, value);
    }

    // link context locale to the element
    if (localized) {
      this.linkContext('locale', (locale) => {
        if (!host.hasAttribute('lang')) {
          this.setLocale();

          // reapply element (required for formatters and etc)
          if (this.apply) {
            this.apply();
          }

          // trigger locale change (required for components)
          this.changed('locale', this.locale);
        }
      });
    }

    // link host value with widget's value
    if (this.params.linkHostValue) {
      this.linkHostValue();
    }

    // set input modifier
    if (this.params.input) {
      this.setMod('input', true);
    }

    // link context value with widget's value
    if (this.shouldValueBeLinked) {
      this.linkContextValue();
    }
  }

  connected() {
    const { host } = this;

    // set current locale based on current lang attribute
    if (this.params.localized) {
      this.setLocale(this.lang);
    }

    // link widget with form
    if (this.params.input && host.id) {
      const id = host.nuId;

      if (id) {
        // reset form context for inner elements if this is a value provider
        if (this.params.provideValue) {
          this.context.form = null;
        }

        this.linkContext('form', (form, oldForm) => {
          this.oldForm = oldForm;

          if (oldForm && form !== oldForm) {
            // disconnect the old form
            this.disconnectForm(oldForm, !!form);
          }

          if (!form) return;

          // connect a new form
          this.connectForm();
        });
      }

      // link widget with outside group
      // group will inherit widget's validation state
      this.linkContext('group', (group, oldGroup) => {
        if (oldGroup) {
          oldGroup.setMod('invalid', false);
          oldGroup.setMod('valid', false);
        }
      });
    }

    // Nested widget support
    // Bind public value setter to context
    // if value link is active...
    if (this.params.provideValue) {
      this.provideAction('input', (val) => {
        this.valueBubbled = true;

        if (this.toggleOption) {
          this.toggleOption(val);
        } else {
          this.setValue(val);
        }
      });
    }
  }

  disconnected() {
    if (this.params.input) {
      this.disconnectForm();
    }
  }

  connectForm(form = this.form) {
    const id = this.host.nuId;

    const value = form.value[id];

    form.registerField(id, this);

    if (value != null) {
      this.setByValue(value, true);
    } else {
      // wait for cascade of form to be initialized
      setTimeout(() => {
        const value = form.value[id];

        if (value != null) {
          this.setByValue(value, true);
        } else if (this.emitValue != null) {
          this.setFormValue();
        }
      });
    }
  }

  setByValue(val, silent) {
    this.setValue(val, silent);
  }

  disconnectForm(form = this.oldForm, dontDelete) {
    const id = this.host.nuId;

    this.setFormValue(null, form);

    if (form) {
      form.unregisterField(id);
    }

    if (!dontDelete) {
      delete this.form;
    }
  }

  changed(some, value) {
    for (let prop of PROPS_LIST) {
      if (prop === some) {
        this.fromAttr(some, value);
      }
    }
  }

  fromAttr(name, value) {
    const defaults = this.props[name];
    const prop = toCamelCase(name);

    if (typeof defaults === 'function') {
      const val = defaults.call(this, value);

      if (val != null) {
        this[prop] = val;
      }
    } else if (value != null || name in this) {
      this[prop] = value;
    } else if (defaults != null) {
      this[prop] = defaults;
    }
  }

  /**
   * Emit custom event.
   * @param {String} name
   * @param {*} detail
   * @param {Object} options
   */
  emit(name, detail = null, options = {}) {
    if (name === 'input') {
      detail = this.getTypedValue(detail);

      if (this.params.input) {
        this.setFormValue(detail);
      }
    }

    if (name !== 'log') {
      log('emit', { element: this, name, detail, options });
    }

    const event = new CustomEvent(name, {
      detail,
      bubbles: false,
      ...options,
    });

    event.nuTarget = this.host;

    this.host.dispatchEvent(event);
  }

  getTypedValue(value) {
    const notNull = value != null;

    switch (this.type) {
      case 'int':
        if (value instanceof Date) {
          value = value.getTime();
        } else {
          value = notNull ? parseInt(value, 10) : null;
        }

        break;
      case 'number':
      case 'num':
      case 'float':
        value = notNull ? parseFloat(value) : null;

        const precision = parseInt(this.precision);

        if (value != null && precision === precision) {
          value = parseFloat(value.toFixed(precision));
        }

        break;
      case 'bool':
        value = notNull;

        break;
      case 'date':
        if (!isValidDate(value)) {
          value = null;
        } else {
          value = new Date(value);
        }

        break;
      case 'daterange':
        if (!Array.isArray(value)) {
          value = null;
        } else {
          value = [new Date(value[0]), new Date(value[1])];
        }

        break;
      case 'array':
        try {
          value = JSON.parse(value);
        } catch (e) {
        }

        if (!Array.isArray(value)) {
          value = null;
        }

        break;
      case 'object':
        try {
          value = JSON.parse(value);
        } catch (e) {
        }

        if (typeof value !== 'object' && !Array.isArray(value)) {
          value = null;
        }

        break;
    }

    return value;
  }

  set role(role) {
    this.host.setAttribute('role', role);
  }

  get role() {
    return this.host.getAttribute('role');
  }

  control() {
    this.use('control')
      .then(Control => Control.apply(null, this.getTypedValue(this.emitValue)));
  }

  doAction(action, value) {
    if (!action) {
      action = this.host.getAttribute('action');
    }

    if (action) {
      const actionCallback = this.parentContext[`action:${action}`];

      //getContextOwner(this.host, `action:${action}`)
      log('trigger action', this.host, action, value, actionCallback);

      if (actionCallback) {
        value = value != null ? value : this.getTypedValue(this.emitValue);

        actionCallback(value);

        return true;
      }
    }

    return false;
  }

  doActions(value) {
    if (this.shouldValueBeLinked && this.hasValue) {
      this.doAction('input', value);
    }

    const baseAction = this.host.getAttribute('action');

    if (baseAction) {
      this.doAction(baseAction, value);
    }
  }

  transferAttr(name, ref, defaultValue) {
    if (!ref || this.ref === this.host) return;

    let value = this.host.getAttribute(name);

    value = value != null ? value : defaultValue;

    if (value != null) {
      ref.setAttribute(name, value);
    } else {
      ref.removeAttribute(name);
    }

    return value;
  }

  setValue(value, silent) {
    this.log('set value', value, silent);

    if (isEqual(this.value, value)) return;

    this.value = value;

    if (this.params.provideValue) {
      this.setValueToContext();
    }

    if (!silent) {
      this.emit('input', value);
      this.doActions(value);

      if (this.host.id) {
        this.emit('nu-change', this.host.nuId, { bubbles: true });
      }
    }

    if (!silent || this.trigger) {
      this.control();
    }
  }

  setFormValue(detail = this.getTypedValue(this.emitValue), form = this.form) {
    const { host } = this;
    const id = host.nuId;

    if (id && form) {
      form.setFieldValue(id, detail);
    }
  }

  get emitValue() {
    return this.value;
  }

  setLocale(val) {
    const context = this.context;

    this.locale = val ? val : (context[LOCALE_VAR] || 'en');
  }

  setValidity(bool) {
    this.setMod('invalid', !bool);
    this.setMod('valid', bool);
    this.validity = bool;

    if (this.group) {
      this.group.setMod('invalid', !bool);
      this.group.setMod('valid', bool);
    }

    const fieldEl = this.host.closest('[nu-field]');

    if (fieldEl) {
      fieldEl.nuSetMod('invalid', !bool);
      fieldEl.nuSetMod('valid', bool);
    }
  }

  linkHostValue() {
    const { host } = this;

    const set = this.fromHostValue.bind(this);
    const get = this.toHostValue.bind(this);

    if (host._value != null) {
      set(host.value);

      delete host._value;
    }

    if (host.nuSetValue) {
      const setValue = host.nuSetValue;

      host.nuSetValue = (val) => {
        setValue.call(host, val);
        set(val, true);
      };

      if (this.params.primary) {
        host.nuGetValue = get;
      }
    } else {
      host.nuSetValue = (val) => set(val, true);
      host.nuGetValue = get;
    }
  }

  /**
   * Declare action in context so children can invoke it if needed.
   * @param name {String} - name of action.
   * @param cb {Function} - action logic.
   */
  provideAction(name, cb) {
    this.log('provideAction()', name);

    const key = `action:${name}`;
    const context = this.context;

    // allow multiple bindings
    if (context.hasOwnProperty(key) && typeof context[key] === 'function') {
      const prevCb = context[key];
      const currentCb = cb;

      cb = (val) => {
        prevCb(val);
        currentCb(val);
      };
    }

    cb.nuOwner = this;

    context[`action:${name}`] = cb;
  }

  linkContextValue() {
    if (this.contextValueLinked) return;

    this.contextValueLinked = true;

    this.linkContext('value', (value) => {
      if (value === undefined || !this.shouldValueBeLinked) return;

      this.fromContextValue(value);
    }, 'parentValue');
  }

  fromContextValue(value) {
    this.log('link context value', value);
    this.setValue(value, true);
  }

  fromHostValue(value) {
    this.setValue(value, true);
  }

  toHostValue() {
    return this.value;
  }

  setValueToContext() {
    this.setContext('value', this.value);
    this.setContext('typedValue', this.getTypedValue(this.emitValue));
  }

  forceLinkValue() {
    delete this.props['link-value'];

    this.linkValue = true;
  }

  get shouldValueBeLinked() {
    return this.params.linkValue && this.linkValue;
  }

  get hasValue() {
    return this.value != null;
  }

  /**
   * Log anything to nu-debug element.
   * @param args
   */
  log(...args) {
    if (!devMode) return;

    this.emit('log', args);
  }
}

const GENERATORS$1 = NuEl.prototype.nuGenerators;

var props = {
  define(name, cb) {
    registerProp(name, cb);

    if (!GENERATORS$1[name]) {
      GENERATORS$1[name] = '';
    }
  },
};

const GENERATORS = NuEl.prototype.nuGenerators;

var generators = {
  set(name, cb) {
    GENERATORS[name] = cb;

    log('new style generator is defined');
  },
  define(name, cb) {
    if (GENERATORS[name]) {
      warn$1('style is already defined', name);

      return;
    }

    GENERATORS[name] = cb;

    log('new style generator is defined');
  },
};

import('./focus-visible-20848edc.js').then(() => {
  // do nothing
});

initSticky(); // enable sticky detection

function assign(element, options, replace) {
  return assign$1(element, options, elements, replace);
}

const color = {
  extractColor,
  findContrastLightness,
  rgbToHsl,
  hslToRgb,
  hplToRgb,
  getContrastRatio,
};

const themes = {
  generate: generateTheme,
  convertToProps: themeToProps,
};

const helpers = {
  resetScroll,
  stylesString,
};

const BODY = document.body;

if (window.Nude) {
  throw error('Several instances of NUDE Framework is loaded. Initialization aborted');
}

setTimeout(() => {
  applyTheme(BODY, BASE_THEME, 'main');
});

const themeStyles = themeAttr('main');

insertRuleSet('theme:base', generateCSS('body', [...themeStyles, {
  '--diff-color': 'var(--bg-color)',
}], false));

const Nude = {
  initialized: false,
  tags: {},
  isTouch,
  version: "1.1.3",
  scheme,
  contrast,
  reduceMotion,
  behaviors,
  Behavior,
  props,
  generators,
  CONTEXT,
  routing: Routing,
  icons: Icons,
  svg: Svg,
  elements,
  deepQueryAll,
  deepQuery,
  requestIdleCallback,
  helpers,
  styles,
  isEqual,
  define,
  assign,
  units,
  hue,
  themes,
  color,
  dev: devMode,
  env: "development" ,
  // css,
};

Object.keys(THEME_MAP).forEach(theme => {
  CONTEXT[`theme:${theme}`] = THEME_MAP[theme];
});

function defineElement(el) {
  const tag = el.nuTag;

  if (isDefined(tag)) {
    if (devMode) {
      warn$1('already defined: ', JSON.stringify(tag));
    }

    return;
  }

  // For hidden elements generate styles immediately
  if (el.nuAllStyles.display === 'none') {
    el.nuInit();
  }

  customElements.define(tag, el);
}

Nude.init = () => {
  if (Nude.initialized) {
    log('already initialized');

    return;
  }

  initContext();

  const rootEls = document.querySelectorAll('nu-root');

  rootEls.forEach(el => {
    el.nuParent = el.parentNode;

    el.parentNode.removeChild(el);

    el.style.visibility = 'hidden';
  });

  // init all nude elements
  Object.values(elements)
    .forEach(defineElement);

  // show all nu-root elements back
  rootEls.forEach(el => {
    el.nuParent && el.nuParent.appendChild(el);
  });

  // setTimeout is used to give some time for themes to initialize.
  setTimeout(() => {
    rootEls.forEach(el => {
      el.style.visibility = '';
    });

    requestAnimationFrame(() => {
      window.dispatchEvent(numlReadyEvent);
    });
  }, 50);

  Nude.initialized = true;
};

Nude.getElementById = function (id) {
  return document.querySelector(`[nu-id="${id}"]`);
};

Nude.getElementsById = function (id) {
  return document.querySelectorAll(`[nu-id="${id}"]`);
};

window.Nude = Nude;

const nudeReadyEvent = new CustomEvent('nudeReady', { cancelable: true });
const numlReadyEvent = new CustomEvent('numlReady');

if (behaviorOption !== 'auto') {
  Object.keys(elements)
    .forEach(name => {
      const Element = elements[name];

      assign(Element.nuTag, {
        behaviors: {},
      }, true);
    });

  if (behaviorOption === 'no') {
    behaviors.clearAll();
  }
}

if (window.dispatchEvent(nudeReadyEvent) && !preventInit) {
  Nude.init();
}

export { styles as $, ALIAS_ATTR as A, Behavior as B, Icons as C, svgElement as D, error as E, extractModule as F, toCamelCase as G, hideEffect as H, ICONS_PROVIDER as I, isTouch as J, setTransitionTimeout as K, isValidDate as L, Nude as M, NUMBER_TYPE as N, NuAbstract as O, NuAction as P, elements as Q, ROOT as R, Svg as S, scheme as T, contrast as U, reduceMotion as V, WidgetBehavior as W, CONTEXT as X, behaviors as Y, requestIdleCallback as Z, helpers as _, scrollParentToChild as a, define as a0, assign as a1, units as a2, hue as a3, themes as a4, color as a5, FLEX_GAP_SUPPORTED as a6, STATES_MAP as a7, CUSTOM_UNITS as a8, ROOT_CONTEXT as a9, BOOL_TYPE as b, deepQuery as c, deepQueryAll as d, isFocusable as e, fixPosition as f, asyncDebounce as g, h$1 as h, isEqual as i, Routing as j, generateId as k, log as l, query as m, removeInnerRef as n, setInnerRef as o, setAriaRef as p, queryById as q, resetScroll as r, setAttr as s, devMode as t, isNoValue as u, getFloatFromAttr as v, warn$1 as w, getTwoFloatsFromAttr as x, fixture as y, parseAllValues as z };
