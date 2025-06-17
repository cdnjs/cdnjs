import { FLAG } from "../index.js";
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

  const keywordContext = { ...context, errors: [], annotations: [], outputFormat: FLAG };
  const evaluatedPropertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, keywordContext, true);
  if (evaluatedPropertyNames === false) {
    return true;
  }

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (!evaluatedPropertyNames.has(propertyName) && !Validation.interpret(unevaluatedProperties, property, context)) {
      isValid = false;
    }
  }

  return isValid;
};

const simpleApplicator = true;

const collectEvaluatedProperties = ([schemaUrl, unevaluatedProperties], instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  const evaluatedPropertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, context, true);

  if (!evaluatedPropertyNames) {
    return false;
  }

  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (!evaluatedPropertyNames.has(propertyName)) {
      if (!Validation.interpret(unevaluatedProperties, property, context)) {
        return false;
      }

      evaluatedPropertyNames.add(propertyName);
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, simpleApplicator, collectEvaluatedProperties };
