import { Validation, canonicalUri } from "../experimental.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/unevaluatedProperties";

const compile = async (schema, ast, parentSchema) => {
  return [canonicalUri(parentSchema), await Validation.compile(schema, ast)];
};

const interpret = ([schemaUrl, unevaluatedProperties], instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  if (context.rootSchema === schemaUrl) {
    return true;
  }

  // Because order matters, we re-evaluate this schema skipping this keyword
  // just to collect all the evalauted properties.
  const keywordContext = {
    ...context,
    plugins: [...context.ast.plugins, unevaluatedPlugin],
    rootSchema: schemaUrl
  };
  if (!Validation.interpret(schemaUrl, instance, keywordContext)) {
    return true;
  }

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (keywordContext.evaluatedProperties.has(propertyName)) {
      continue;
    }

    if (!Validation.interpret(unevaluatedProperties, property, context)) {
      isValid = false;
    }

    context.evaluatedProperties?.add(propertyName);
  }

  return isValid;
};

const simpleApplicator = true;

const unevaluatedPlugin = {
  beforeSchema(_url, _instance, context) {
    context.evaluatedProperties ??= new Set();
    context.schemaEvaluatedProperties ??= new Set();
  },
  beforeKeyword(_node, _instance, context, schemaContext) {
    context.rootSchema = schemaContext.rootSchema;
    context.evaluatedProperties = new Set();
  },
  afterKeyword(_node, _instance, context, valid, schemaContext) {
    if (valid) {
      for (const property of context.evaluatedProperties) {
        schemaContext.schemaEvaluatedProperties.add(property);
      }
    }
  },
  afterSchema(_url, _instance, context, valid) {
    if (valid) {
      for (const property of context.schemaEvaluatedProperties) {
        context.evaluatedProperties.add(property);
      }
    }
  }
};

export default { id, compile, interpret, simpleApplicator };
