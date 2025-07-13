import * as Browser from "@hyperjump/browser";
import { Validation, canonicalUri } from "../lib/experimental.js";
import { toAbsoluteUri, uriFragment } from "../lib/common.js";


const id = "https://json-schema.org/keyword/draft-2020-12/dynamicRef";

const compile = async (dynamicRef, ast) => {
  const fragment = uriFragment(Browser.value(dynamicRef));
  const referencedSchema = await Browser.get(Browser.value(dynamicRef), dynamicRef);
  await Validation.compile(referencedSchema, ast);
  return [referencedSchema.document.baseUri, fragment, canonicalUri(referencedSchema)];
};

const interpret = ([id, fragment, ref], instance, context) => {
  if (fragment in context.ast.metaData[id].dynamicAnchors) {
    context.dynamicAnchors = { ...context.ast.metaData[id].dynamicAnchors, ...context.dynamicAnchors };
    return Validation.interpret(context.dynamicAnchors[fragment], instance, context);
  } else {
    return Validation.interpret(ref, instance, context);
  }
};

const simpleApplicator = true;

const plugin = {
  beforeSchema(url, _instance, context) {
    context.dynamicAnchors = {
      ...context.ast.metaData[toAbsoluteUri(url)].dynamicAnchors,
      ...context.dynamicAnchors
    };
  },
  beforeKeyword(_url, _instance, context, schemaContext) {
    context.dynamicAnchors = schemaContext.dynamicAnchors;
  }
};

export default { id, compile, interpret, simpleApplicator, plugin };
