import { concat, join, empty, map, pipe } from "@hyperjump/pact";
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

const interpret = ([isDefinedProperty, additionalProperties], instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (isDefinedProperty.test(propertyName)) {
      continue;
    }

    if (!Validation.interpret(additionalProperties, property, context)) {
      isValid = false;
    }

    context.evaluatedProperties?.add(propertyName);
  }

  return isValid;
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };
