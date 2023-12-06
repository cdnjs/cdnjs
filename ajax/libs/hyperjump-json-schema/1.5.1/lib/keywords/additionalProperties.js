import { filter, every, pipe } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";
import { getKeywordName } from "../keywords.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/additionalProperties";

const compile = async (schema, ast, parentSchema) => {
  const patterns = [];

  const propertiesKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/properties");
  const propertiesSchema = await Schema.step(propertiesKeyword, parentSchema);
  if (Schema.typeOf(propertiesSchema, "object")) {
    for (const name of Schema.keys(propertiesSchema)) {
      patterns.push(regexEscape(name));
    }
  }

  const patternPropertiesKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/patternProperties");
  const patternProperties = await Schema.step(patternPropertiesKeyword, parentSchema);
  if (Schema.typeOf(patternProperties, "object")) {
    patterns.push(...Schema.keys(patternProperties));
  }

  return [
    new RegExp(patterns.length > 0 ? patterns.join("|") : "(?!)", "u"),
    await Validation.compile(schema, ast)
  ];
};

const regexEscape = (string) => string
  .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
  .replace(/-/g, "\\x2d");

const interpret = ([isDefinedProperty, additionalProperties], instance, ast, dynamicAnchors, quiet) => {
  if (!Instance.typeOf(instance, "object")) {
    return true;
  }

  return pipe(
    Instance.entries(instance),
    filter(([propertyName]) => !isDefinedProperty.test(propertyName)),
    every(([, property]) => Validation.interpret(additionalProperties, property, ast, dynamicAnchors, quiet))
  );
};

const collectEvaluatedProperties = ([isDefinedProperty, additionalProperties], instance, ast, dynamicAnchors) => {
  if (!Instance.typeOf(instance, "object")) {
    return true;
  }

  const evaluatedPropertyNames = new Set();
  for (const [propertyName, property] of Instance.entries(instance)) {
    if (!isDefinedProperty.test(propertyName)) {
      if (!Validation.interpret(additionalProperties, property, ast, dynamicAnchors, true)) {
        return false;
      }

      evaluatedPropertyNames.add(propertyName);
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, collectEvaluatedProperties };
