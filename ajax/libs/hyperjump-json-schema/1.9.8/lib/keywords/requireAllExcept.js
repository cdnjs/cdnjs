import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { getKeywordName } from "../experimental.js";


const id = "https://json-schema.org/keyword/requireAllExcept";

const compile = async (schema, _ast, parentSchema) => {
  const requireAllExcept = await Browser.value(schema);
  const propertiesKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/properties");
  const propertiesSchema = await Browser.step(propertiesKeyword, parentSchema);
  const propertyNames = Browser.typeOf(propertiesSchema) === "object" ? Browser.keys(propertiesSchema) : [];

  const required = new Set(propertyNames);
  requireAllExcept.forEach((propertyName) => propertyNames.remove(propertyName));
  return [...required];
};

const interpret = (required, instance) => {
  return Instance.typeOf(instance) !== "object" || required.every((propertyName) => Object.hasOwn(Instance.value(instance), propertyName));
};

export default { id, compile, interpret };
