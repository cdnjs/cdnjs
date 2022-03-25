import { w as warn, t as devMode, u as isNoValue } from './index-e74c1c40.js';

const NUM_NOTATIONS = [
  'standard', 'scientific', 'engineering', 'compact',
];
const NUM_TYPES = [
  'default', 'currency', 'percent', 'unit',
];
const NUM_SIGN_OPTIONS = [
  'auto', 'always', 'never', 'exceptZero',
];
const NUM_UNITS = [
  // angle
  'degree',
  // area
  'acre', 'hectare',
  //concentration
  'percent',
  //digital
  'digital: bit', 'byte', 'kilobit', 'kilobyte', 'megabit', 'megabyte', 'gigabit', 'gigabyte', 'terabit', 'terabyte', 'petabyte',
  // duration
  'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year',
  // length
  'millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile', 'mile-scandinavian',
  // mass
  'gram', 'kilogram', 'ounce', 'pound', 'stone',
  // temperature
  'celsius', 'fahrenheit',
  // volume
  'liter', 'milliliter', 'gallon', 'fluid-ounce',
];

function getInList(val, list) {
  if (list.includes(val)) return val;
}

function numberFormat(value, locale, {
  type, code, sign, unit, notation, fallback, significant, integer, decimal, grouping,
} = {}) {
  fallback = fallback != null ? fallback : '–';

  if (!type || type === 'number') {
    if (code) {
      type = 'currency';
    } else if (unit) {
      type = 'unit';
    }
  }

  const notationAttr = String(notation || '').split(/\s+/);
  const unitAttr = String(unit || '').split(/\s+/);
  const fractionAttr = String(decimal || '').split(/\s+/);
  const codeAttr = String(code || '').split(/\s+/);
  const integerAttr = integer;
  const significantAttr = String(significant || '').split(/\s+/);
  const typeOption = getInList(String(type), NUM_TYPES);
  const notationOption = getInList(notationAttr[0], NUM_NOTATIONS);
  const unitOption = getInList(unitAttr[0], NUM_UNITS);
  const notationDisplay = notationAttr[1];
  const unitDisplay = unitAttr[1];
  const signAttr = String(sign || '').split(/\s+/);
  const signOption = getInList(signAttr[0], NUM_SIGN_OPTIONS);
  const isAccounting = signAttr.includes('accounting');

  value = Number(value);

  const options = {};

  if (grouping != null) {
    options.useGrouping = !isNoValue(grouping);
  }

  if (fractionAttr[0]) {
    if (fractionAttr[1]) {
      options.minimumFractionDigits = Number(fractionAttr[0]);
      options.maximumFractionDigits = Number(fractionAttr[1]);
    } else {
      options.minimumFractionDigits = options.maximumFractionDigits = Number(fractionAttr[0]);
    }
  }

  if (integerAttr) {
    options.minimumIntegerDigits = Number(integerAttr);
  }

  if (significantAttr[0]) {
    if (significantAttr[1]) {
      options.minimumSignificantDigits = Number(significantAttr[0]);
      options.maximumSignificantDigits = Number(significantAttr[1]);
    } else {
      options.minimumSignificantDigits = options.maximumSignificantDigits = significantAttr[0];
    }
  }

  if (sign) {
    options.signDisplay = signOption;
  }

  if (isAccounting) {
    options.currencySign = 'accounting';
  }

  if (codeAttr[0]) {
    options.currency = codeAttr[0];

    if (codeAttr[1] === 'narrow') {
      options.currencyDisplay = 'narrowSymbol';
    }
  }

  if (type) {
    options.style = typeOption;
  }

  if (unitDisplay) {
    options.unitDisplay = unitDisplay;
  }

  if (notation) {
    options.notation = notationOption;

    if (notation === 'compact' && notationDisplay) {
      options.notationDisplay = notationDisplay;
    }
  }

  if (unit) {
    options.unit = unitOption;
  }

  if (value !== value) {
    return fallback;
  }

  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch (e) {
    warn('number format error', e);

    return devMode ? 'Invalid' : fallback;
  }
}

export { numberFormat as n };
