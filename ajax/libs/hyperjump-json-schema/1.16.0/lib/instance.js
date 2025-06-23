import * as JsonPointer from "@hyperjump/json-pointer";
import { reduce } from "@hyperjump/pact";
import { toAbsoluteIri } from "@hyperjump/uri";
import { Reference } from "@hyperjump/browser/jref";
import { toAbsoluteUri, uriFragment } from "./common.js";


export const fromJs = (value, uri = "", pointer = "", parent = undefined) => {
  const jsType = typeof value;

  switch (jsType) {
    case "number":
    case "string":
    case "boolean":
      return cons(uri, pointer, value, jsType, [], parent);
    case "object":
      if (value === null) {
        return cons(uri, pointer, value, "null", [], parent);
      } else if (Array.isArray(value)) {
        const arrayNode = cons(uri, pointer, value, "array", [], parent);
        arrayNode.children = value.map((item, index) => {
          return fromJs(item, uri, JsonPointer.append(index, pointer), arrayNode);
        });
        return arrayNode;
      } else if (Object.getPrototypeOf(value) === Object.prototype) {
        const objectNode = cons(uri, pointer, value, "object", [], parent);
        objectNode.children = Object.entries(value).map((entry) => {
          const propertyPointer = JsonPointer.append(entry[0], pointer);
          const propertyNode = cons(uri, propertyPointer, undefined, "property", [], objectNode);
          propertyNode.children[0] = fromJs(entry[0], uri, "*" + propertyPointer, propertyNode);
          propertyNode.children[1] = fromJs(entry[1], uri, propertyPointer, propertyNode);
          return propertyNode;
        });
        return objectNode;
      } else if (value instanceof Reference) {
        return fromJs(value.toJSON(), uri, pointer, parent);
      }
    default: {
      const type = jsType === "object" ? Object.getPrototypeOf(value).constructor.name || "anonymous" : jsType;
      throw Error(`Not a JSON compatible type: ${type}`);
    }
  }
};

export const cons = (baseUri, pointer, value, type, children, parent) => {
  const node = {
    baseUri: baseUri ? toAbsoluteIri(baseUri) : "",
    pointer: pointer,
    value: value,
    type: type,
    children: children,
    parent: parent,
    annotations: {}
  };
  node.root = parent?.root ?? node;

  return node;
};

export const get = (uri, instance) => {
  const schemaId = toAbsoluteUri(uri);
  if (schemaId !== instance.baseUri && schemaId !== "") {
    throw Error(`Reference '${uri}' is not local to '${instance.baseUri}'`);
  }

  let isPropertyNamePointer = false;
  let pointer = uriFragment(uri);
  if (pointer.startsWith("*")) {
    pointer = pointer.slice(1);
    isPropertyNamePointer = true;
  }

  const result = reduce((node, segment) => {
    segment = segment === "-" && typeOf(node) === "array" ? length(node) : segment;
    return step(segment, node);
  }, instance.root, JsonPointer.pointerSegments(pointer));

  return isPropertyNamePointer ? result.parent.children[0] : result;
};

export const uri = (node) => `${node.baseUri}#${encodeURI(node.pointer)}`;
export const value = (node) => node.value;
export const typeOf = (node) => node.type;
export const has = (key, node) => key in node.value;

export const step = (key, node) => {
  switch (node.type) {
    case "object": {
      const property = node.children.find((propertyNode) => {
        return value(propertyNode.children[0]) === key;
      });
      return property?.children[1];
    }
    case "array": {
      const index = parseInt(key, 10);
      return node.children[index];
    }
    default:
      return;
  }
};

export const iter = function* (node) {
  if (node.type !== "array") {
    return;
  }

  yield* node.children;
};

export const keys = function* (node) {
  if (node.type !== "object") {
    return;
  }

  for (const property of node.children) {
    yield property.children[0];
  }
};

export const values = function* (node) {
  if (node.type !== "object") {
    return;
  }

  for (const property of node.children) {
    if (property.children[1]) {
      yield property.children[1];
    }
  }
};

export const entries = function* (node) {
  if (node.type !== "object") {
    return;
  }

  for (const property of node.children) {
    if (property.children.length === 2) {
      yield property.children;
    }
  }
};

export const length = (node) => {
  if (node.type !== "array") {
    return;
  }

  return node.children.length;
};

export const allNodes = function* (node) {
  yield node;

  switch (typeOf(node)) {
    case "object":
      for (const child of values(node)) {
        yield* allNodes(child);
      }
      break;
    case "array":
      for (const child of iter(node)) {
        yield* allNodes(child);
      }
      break;
  }
};
