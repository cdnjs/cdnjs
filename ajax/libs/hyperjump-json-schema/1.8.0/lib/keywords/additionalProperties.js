import { concat, join, empty, map, filter, every, pipe } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { getKeywordName, Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/additionalProperties";

const compile = async (schema, ast, parentSchema) => {
  const propertiesKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/properties");
  const propertiesSchema = await Browser.step(propertiesKeyword, parentSchema);
  const propertyPatterns = Browser.typeOf(propertiesSchema) === "object"
    ? map((propertyName) => "^" + regexEscape(propertyName) + "$", Browser.keys(propertiesSchema))
    : empty();

  const patternPropertiesKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/patternProperties");
  const patternProperties = await Browser.step(patternPropertiesKeyword, parentSchema);
  const patternPropertyPatterns = Browser.typeOf(patternProperties) === "object"
    ? Browser.keys(patternProperties)
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
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  return pipe(
    Instance.entries(instance),
    filter(([propertyName]) => !isDefinedProperty.test(propertyName)),
    every(([, property]) => Validation.interpret(additionalProperties, property, ast, dynamicAnchors, quiet))
  );
};

const collectEvaluatedProperties = ([isDefinedProperty, additionalProperties], instance, ast, dynamicAnchors) => {
  if (Instance.typeOf(instance) !== "object") {
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
