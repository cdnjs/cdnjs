import * as JsonPointer from "@hyperjump/json-pointer";
import * as Instance from "../lib/instance.js";
import { getKeywordId } from "../lib/keywords.js";


const defaultDialectId = "https://json-schema.org/validation";

export const setAnnotation = (node, keywordUri, schemaLocation, value) => {
  if (!(keywordUri in node.annotations)) {
    node.annotations[keywordUri] = {};
  }
  node.annotations[keywordUri][schemaLocation] = value;
};

export const annotation = (node, keyword, dialect = defaultDialectId) => {
  const keywordUri = getKeywordId(keyword, dialect);

  let currentNode = node.root;
  const errors = Object.keys(node.root.errors);
  for (let segment of JsonPointer.pointerSegments(node.pointer)) {
    segment = segment === "-" && Instance.typeOf(currentNode) === "array" ? Instance.length(currentNode) : segment;
    currentNode = Instance.step(segment, currentNode);
    errors.push(...Object.keys(currentNode.errors));
  }

  const annotations = [];
  for (const schemaLocation in node.annotations[keywordUri]) {
    if (!errors.some((error) => schemaLocation.startsWith(error))) {
      annotations.unshift(node.annotations[keywordUri][schemaLocation]);
    }
  }

  return annotations;
};

export const annotatedWith = (instance, keyword, dialectId = defaultDialectId) => {
  const nodes = [];

  for (const node of Instance.allNodes(instance)) {
    if (annotation(node, keyword, dialectId).length > 0) {
      nodes.push(node);
    }
  }

  return nodes;
};

export * from "../lib/instance.js";
