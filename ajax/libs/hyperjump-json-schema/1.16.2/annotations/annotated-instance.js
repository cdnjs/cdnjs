import * as Instance from "../lib/instance.js";
import { getKeywordId } from "../lib/keywords.js";


const defaultDialectId = "https://json-schema.org/validation";

export const annotation = (node, keyword, dialect = defaultDialectId) => {
  const keywordUri = getKeywordId(keyword, dialect);
  return node.annotations[keywordUri] ?? [];
};

export const annotatedWith = function* (instance, keyword, dialectId = defaultDialectId) {
  for (const node of Instance.allNodes(instance)) {
    if (annotation(node, keyword, dialectId).length > 0) {
      yield node;
    }
  }
};

export * from "../lib/instance.js";
