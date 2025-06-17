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

const evaluate = (strategy, [id, fragment, ref], instance, context) => {
  if (fragment in context.ast.metaData[id].dynamicAnchors) {
    context.dynamicAnchors = { ...context.ast.metaData[id].dynamicAnchors, ...context.dynamicAnchors };
    return strategy(context.dynamicAnchors[fragment], instance, context);
  } else {
    return strategy(ref, instance, context);
  }
};

const interpret = (...args) => evaluate(Validation.interpret, ...args);
const collectEvaluatedProperties = (...args) => evaluate(Validation.collectEvaluatedProperties, ...args);
const collectEvaluatedItems = (...args) => evaluate(Validation.collectEvaluatedItems, ...args);

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
