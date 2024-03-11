import { append as pointerAppend, get as pointerGet } from "@hyperjump/json-pointer";
import { toAbsoluteIri } from "@hyperjump/uri";
import { jsonTypeOf, uriFragment } from "./common.js";
import { Reference } from "@hyperjump/browser/jref";


export const nil = { id: undefined, pointer: "", instance: undefined, value: undefined };
export const cons = (instance, id = undefined) => ({
  ...nil,
  id: id ? toAbsoluteIri(id) : "",
  instance,
  value: instance
});

export const get = (url, instance = nil) => {
  if (!url.startsWith("#")) {
    throw Error(`No JSON document found at '${url.split("#")[0]}'`);
  }

  const pointer = uriFragment(url);
  return {
    ...instance,
    pointer: pointer,
    value: pointerGet(pointer, instance.instance)
  };
};

export const uri = (doc) => `${doc.id || ""}#${encodeURI(doc.pointer)}`;
export const value = (doc) => doc.value instanceof Reference ? doc.value.toJSON() : doc.value;
export const has = (key, doc) => key in value(doc);
export const typeOf = (doc) => jsonTypeOf(value(doc));

export const step = (key, doc) => ({
  ...doc,
  pointer: pointerAppend(key, doc.pointer),
  value: value(doc)[key]
});

export const iter = function* (doc) {
  for (let index = 0; index < value(doc).length; index++) {
    yield step(index, doc);
  }
};

export const keys = function* (doc) {
  for (const key in value(doc)) {
    yield key;
  }
};

export const values = function* (doc) {
  for (const key in value(doc)) {
    yield step(key, doc);
  }
};

export const entries = function* (doc) {
  for (const key in value(doc)) {
    yield [key, step(key, doc)];
  }
};

export const length = (doc) => value(doc).length;
