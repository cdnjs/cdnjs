import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";
import { toAbsoluteUri } from "../common.js";


const id = "https://json-schema.org/keyword/dynamicRef";

const compile = async (schema, ast) => {
  const reference = Browser.value(schema);
  const self = await Browser.get(schema.document.baseUri, schema);
  await Validation.compile(self, ast);

  return reference;
};

const interpret = (fragment, instance, context) => {
  if (!(fragment in context.dynamicAnchors)) {
    throw Error(`No dynamic anchor found for "${fragment}"`);
  }
  return Validation.interpret(context.dynamicAnchors[fragment], instance, context);
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
