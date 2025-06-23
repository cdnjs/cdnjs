import { canonicalUri, Validation } from "../experimental.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/unevaluatedItems";

const compile = async (schema, ast, parentSchema) => {
  return [canonicalUri(parentSchema), await Validation.compile(schema, ast)];
};

const interpret = ([schemaUrl, unevaluatedItems], instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  // Because order matters, we re-evaluate this schema skipping this keyword
  // just to collect all the evalauted items.
  if (context.rootSchema === schemaUrl) {
    return true;
  }
  const evaluatedItemsPlugin = new EvaluatedItemsPlugin(schemaUrl);
  Validation.interpret(schemaUrl, instance, {
    ...context,
    plugins: [...context.ast.plugins, evaluatedItemsPlugin]
  });
  const evaluatedItems = evaluatedItemsPlugin.evaluatedItems;

  let isValid = true;
  let index = 0;
  for (const item of Instance.iter(instance)) {
    if (!evaluatedItems.has(index)) {
      if (!Validation.interpret(unevaluatedItems, item, context)) {
        isValid = false;
      }

      context.evaluatedItems?.add(index);
    }

    index++;
  }

  return isValid;
};

const simpleApplicator = true;

class EvaluatedItemsPlugin {
  constructor(rootSchema) {
    this.rootSchema = rootSchema;
  }

  beforeSchema(_url, _instance, context) {
    context.evaluatedItems ??= new Set();
    context.schemaEvaluatedItems ??= new Set();
  }

  beforeKeyword(_node, _instance, context) {
    context.rootSchema = this.rootSchema;
    context.evaluatedItems = new Set();
  }

  afterKeyword(_node, _instance, context, valid, schemaContext) {
    if (valid) {
      for (const index of context.evaluatedItems) {
        schemaContext.schemaEvaluatedItems.add(index);
      }
    }
  }

  afterSchema(_url, _instance, context, valid) {
    if (valid) {
      for (const index of context.schemaEvaluatedItems) {
        context.evaluatedItems.add(index);
      }
    }

    this.evaluatedItems = context.evaluatedItems;
  }
}

export default { id, compile, interpret, simpleApplicator };
