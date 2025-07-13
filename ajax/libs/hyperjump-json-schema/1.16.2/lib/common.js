import { resolveIri, parseIriReference, parseAbsoluteIri } from "@hyperjump/uri";
import * as JsonPointer from "@hyperjump/json-pointer";


export const jsonTypeOf = (value) => {
  const jsType = typeof value;

  switch (jsType) {
    case "number":
    case "string":
    case "boolean":
    case "undefined":
      return jsType;
    case "object":
      if (Array.isArray(value)) {
        return "array";
      } else if (value === null) {
        return "null";
      } else if (Object.getPrototypeOf(value) === Object.prototype) {
        return "object";
      }
    default: {
      const type = jsType === "object" ? Object.getPrototypeOf(value).constructor.name || "anonymous" : jsType;
      throw Error(`Not a JSON compatible type: ${type}`);
    }
  }
};

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

export const toRelativeIri = (from, to) => {
  const fromUri = parseAbsoluteIri(from);
  const toUri = parseAbsoluteIri(to);

  if (toUri.scheme !== fromUri.scheme) {
    return to;
  }

  if (toUri.authority !== fromUri.authority) {
    return to;
  }

  if (from === to) {
    return "";
  }

  const fromSegments = fromUri.path.split("/");
  const toSegments = toUri.path.split("/");

  let position = 0;
  while (fromSegments[position] === toSegments[position] && position < fromSegments.length - 1 && position < toSegments.length - 1) {
    position++;
  }

  const segments = [];
  for (let index = position + 1; index < fromSegments.length; index++) {
    segments.push("..");
  }

  for (let index = position; index < toSegments.length; index++) {
    segments.push(toSegments[index]);
  }

  return segments.join("/");
};

const defaultReplacer = (_key, value) => value;
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
