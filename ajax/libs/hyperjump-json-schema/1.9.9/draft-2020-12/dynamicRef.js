import * as Browser from "@hyperjump/browser";
import { Validation, canonicalUri } from "../lib/experimental.js";
import { uriFragment } from "../lib/common.js";


const id = "https://json-schema.org/keyword/draft-2020-12/dynamicRef";

const compile = async (dynamicRef, ast) => {
  const fragment = uriFragment(Browser.value(dynamicRef));
  const referencedSchema = await Browser.get(Browser.value(dynamicRef), dynamicRef);
  await Validation.compile(referencedSchema, ast);
  return [referencedSchema.document.baseUri, fragment, canonicalUri(referencedSchema)];
};

const evaluate = (strategy, [id, fragment, ref], instance, ast, dynamicAnchors, quiet) => {
  if (fragment in ast.metaData[id].dynamicAnchors) {
    dynamicAnchors = { ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors };
    return strategy(dynamicAnchors[fragment], instance, ast, dynamicAnchors, quiet);
  } else {
    return strategy(ref, instance, ast, dynamicAnchors, quiet);
  }
};

const interpret = (...args) => evaluate(Validation.interpret, ...args);
const collectEvaluatedProperties = (...args) => evaluate(Validation.collectEvaluatedProperties, ...args);
const collectEvaluatedItems = (...args) => evaluate(Validation.collectEvaluatedItems, ...args);

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
