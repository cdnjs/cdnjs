import * as Instance from "../instance.js";
import { getKeywordName } from "../keywords.js";
import * as Schema from "../schema.js";


const id = "https://json-schema.org/keyword/requireAllExcept";
const experimental = true;

const compile = async (schema, ast, parentSchema) => {
  const requireAllExcept = await Schema.value(schema);
  const propertiesKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/properties");
  const propertiesSchema = await Schema.step(propertiesKeyword, parentSchema);
  const propertyNames = Schema.typeOf(propertiesSchema, "object") ? Schema.keys(propertiesSchema) : [];

  const required = new Set(propertyNames);
  requireAllExcept.forEach((propertyName) => propertyNames.remove(propertyName));
  return [...required];
};

const interpret = (required, instance) => {
  return !Instance.typeOf(instance, "object") || required.every((propertyName) => Object.hasOwn(Instance.value(instance), propertyName));
};

export default { id, experimental, compile, interpret };
