import { Validation, canonicalUri } from "../experimental.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/unevaluatedProperties";

const compile = async (schema, ast, parentSchema) => {
  return [canonicalUri(parentSchema), await Validation.compile(schema, ast)];
};

const interpret = ([schemaUrl, unevaluatedProperties], instance, ast, dynamicAnchors, quiet) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  const evaluatedPropertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors, true);
  if (evaluatedPropertyNames === false) {
    return true;
  }

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (!evaluatedPropertyNames.has(propertyName) && !Validation.interpret(unevaluatedProperties, property, ast, dynamicAnchors, quiet)) {
      isValid = false;
    }
  }

  return isValid;
};

const collectEvaluatedProperties = ([schemaUrl, unevaluatedProperties], instance, ast, dynamicAnchors) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  const evaluatedPropertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors, true);

  if (!evaluatedPropertyNames) {
    return false;
  }

  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (!evaluatedPropertyNames.has(propertyName)) {
      if (!Validation.interpret(unevaluatedProperties, property, ast, dynamicAnchors, true)) {
        return false;
      }

      evaluatedPropertyNames.add(propertyName);
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, collectEvaluatedProperties };
