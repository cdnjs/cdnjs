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

  // Because order matters, we re-evaluate this schema skipping this keyword
  // just to collect all the evalauted properties.
  if (context.rootSchema === schemaUrl) {
    return true;
  }
  const evaluatedPropertiesPlugin = new EvaluatedPropertiesPlugin(schemaUrl);
  Validation.interpret(schemaUrl, instance, {
    ...context,
    plugins: [...context.ast.plugins, evaluatedPropertiesPlugin]
  });
  const evaluatedProperties = evaluatedPropertiesPlugin.evaluatedProperties;

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (evaluatedProperties.has(propertyName)) {
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

class EvaluatedPropertiesPlugin {
  constructor(rootSchema) {
    this.rootSchema = rootSchema;
  }

  beforeSchema(_url, _instance, context) {
    context.evaluatedProperties ??= new Set();
    context.schemaEvaluatedProperties ??= new Set();
  }

  beforeKeyword(_node, _instance, context) {
    context.rootSchema = this.rootSchema;
    context.evaluatedProperties = new Set();
  }

  afterKeyword(_node, _instance, context, valid, schemaContext) {
    if (valid) {
      for (const property of context.evaluatedProperties) {
        schemaContext.schemaEvaluatedProperties.add(property);
      }
    }
  }

  afterSchema(_url, _instance, context, valid) {
    if (valid) {
      for (const property of context.schemaEvaluatedProperties) {
        context.evaluatedProperties.add(property);
      }
    }

    this.evaluatedProperties = context.evaluatedProperties;
  }
}

export default { id, compile, interpret, simpleApplicator };
