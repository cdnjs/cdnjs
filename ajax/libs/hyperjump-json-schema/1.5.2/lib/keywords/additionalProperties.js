import { concat, join, empty, map, filter, every, pipe, tap } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";
import { getKeywordName } from "../keywords.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/additionalProperties";

const compile = async (schema, ast, parentSchema) => {
  const propertiesKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/properties");
  const propertiesSchema = await Schema.step(propertiesKeyword, parentSchema);
  const propertyPatterns = Schema.typeOf(propertiesSchema, "object")
    ? map((propertyName) => "^" + regexEscape(propertyName) + "$", Schema.keys(propertiesSchema))
    : empty();

  const patternPropertiesKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/patternProperties");
  const patternProperties = await Schema.step(patternPropertiesKeyword, parentSchema);
  const patternPropertyPatterns = Schema.typeOf(patternProperties, "object")
    ? Schema.keys(patternProperties)
    : empty();

  const pattern = pipe(
    concat(propertyPatterns, patternPropertyPatterns),
    join("|")
  ) || "(?!)";

  return [new RegExp(pattern, "u"), await Validation.compile(schema, ast)];
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
