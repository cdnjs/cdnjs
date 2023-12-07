import { append as pointerAppend, get as pointerGet } from "@hyperjump/json-pointer";
import { toAbsoluteIri } from "@hyperjump/uri";
import curry from "just-curry-it";
import { jsonTypeOf } from "./common.js";
import * as Reference from "./reference.js";


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

  const pointer = url.substr(1);
  return {
    ...instance,
    pointer: pointer,
    value: pointerGet(pointer, instance.instance)
  };
};

export const uri = (doc) => `${doc.id || ""}#${encodeURI(doc.pointer)}`;
export const value = (doc) => Reference.isReference(doc.value) ? Reference.value(doc.value) : doc.value;
export const has = (key, doc) => key in value(doc);
export const typeOf = curry((doc, type) => jsonTypeOf(value(doc), type));

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
