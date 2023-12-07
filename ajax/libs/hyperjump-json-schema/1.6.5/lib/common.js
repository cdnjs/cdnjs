import { resolveIri, parseIriReference } from "@hyperjump/uri";
import * as JsonPointer from "@hyperjump/json-pointer";


const isObject = (value) => typeof value === "object" && !Array.isArray(value) && value !== null;
const isType = {
  null: (value) => value === null,
  boolean: (value) => typeof value === "boolean",
  object: isObject,
  array: (value) => Array.isArray(value),
  number: (value) => typeof value === "number",
  integer: (value) => Number.isInteger(value),
  string: (value) => typeof value === "string"
};
export const jsonTypeOf = (value, type) => isType[type](value);

export const resolveUri = (uri, baseUri) => {
  const resolved = resolveIri(uri, baseUri);
  if (resolved.startsWith("file:") && baseUri && !baseUri.startsWith("file:")) {
    throw Error(`Can't access file '${resolved}' resource from network context '${baseUri}'`);
  }
  return resolved;
};

export const toAbsoluteUri = (uri) => {
  const position = uri.indexOf("#");
  const end = position === -1 ? uri.length : position;
  return uri.slice(0, end);
};

export const uriFragment = (uri) => decodeURIComponent(parseIriReference(uri).fragment || "");

const CHAR_BACKWARD_SLASH = 47;

export const pathRelative = (from, to) => {
  if (from === to) {
    return "";
  }

  let toStart = 1;
  const fromLen = from.length - 1;
  const toLen = to.length - toStart;

  // Compare paths to find the longest common path from root
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i < length; i++) {
    const fromCode = from.charCodeAt(i + 1);
    if (fromCode !== to.charCodeAt(toStart + i)) {
      break;
    } else if (fromCode === CHAR_BACKWARD_SLASH) {
      lastCommonSep = i;
    }
  }

  if (toLen > length) {
    if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
      return to.slice(toStart + i + 1);
    }
    if (i === 0) {
      return to.slice(toStart + i);
    }
  }
  if (fromLen > length) {
    if (from.charCodeAt(i + 1) === CHAR_BACKWARD_SLASH) {
      lastCommonSep = i;
    } else if (length === 0) {
      lastCommonSep = 0;
    }
  }

  let out = "";
  // Generate the relative path based on the path difference between `to` and `from`
  for (i = lastCommonSep + 2; i <= from.length; ++i) {
    if (i === from.length || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
      out += out.length === 0 ? ".." : "/..";
    }
  }

  toStart += lastCommonSep;

  // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts
  if (out.length > 0) {
    return `${out}${to.slice(toStart, to.length)}`;
  }

  if (to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
    ++toStart;
  }

  return to.slice(toStart, to.length);
};

const defaultReplacer = (key, value) => value;
export const jsonStringify = (value, replacer = defaultReplacer, space = "") => {
  return stringifyValue(value, replacer, space, "", JsonPointer.nil, 1);
};

const stringifyValue = (value, replacer, space, key, pointer, depth) => {
  value = replacer(key, value, pointer);
  let result;
  if (Array.isArray(value)) {
    result = stringifyArray(value, replacer, space, pointer, depth);
  } else if (typeof value === "object" && value !== null) {
    result = stringifyObject(value, replacer, space, pointer, depth);
  } else {
    result = JSON.stringify(value);
  }

  return result;
};

const stringifyArray = (value, replacer, space, pointer, depth) => {
  if (value.length === 0) {
    return "[]";
  }

  const padding = space ? `\n${space.repeat(depth - 1)}` : "";

  let result = "[" + padding + space;
  for (let index = 0; index < value.length; index++) {
    const indexPointer = JsonPointer.append(index, pointer);
    const stringifiedValue = stringifyValue(value[index], replacer, space, String(index), indexPointer, depth + 1);
    result += stringifiedValue === undefined ? "null" : stringifiedValue;
    if (index + 1 < value.length) {
      result += `,${padding}${space}`;
    }
  }
  return result + padding + "]";
};

const stringifyObject = (value, replacer, space, pointer, depth) => {
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return "{}";
  }

  const padding = space ? `\n${space.repeat(depth - 1)}` : "";
  const colonSpacing = space ? " " : "";

  let result = "{" + padding + space;
  for (let index = 0; index < entries.length; index++) {
    const [key, value] = entries[index];
    const keyPointer = JsonPointer.append(key, pointer);
    const stringifiedValue = stringifyValue(value, replacer, space, key, keyPointer, depth + 1);
    if (stringifiedValue !== undefined) {
      result += JSON.stringify(key) + ":" + colonSpacing + stringifiedValue;
      if (entries[index + 1]) {
        result += `,${padding}${space}`;
      }
    }
  }
  return result + padding + "}";
};
