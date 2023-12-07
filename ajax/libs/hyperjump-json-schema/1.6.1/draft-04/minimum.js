import * as Instance from "../lib/instance.js";
import * as Schema from "../lib/schema.js";
import { getKeywordName } from "../lib/keywords.js";


const id = "https://json-schema.org/keyword/draft-04/minimum";

const compile = async (schema, ast, parentSchema) => {
  const exclusiveMinimumKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/draft-04/exclusiveMinimum");
  const exclusiveMinimum = await Schema.step(exclusiveMinimumKeyword, parentSchema);
  const isExclusive = Schema.value(exclusiveMinimum);

  return [Schema.value(schema), isExclusive];
};

const interpret = ([minimum, isExclusive], instance) => {
  if (!Instance.typeOf(instance, "number")) {
    return true;
  }

  const value = Instance.value(instance);
  return isExclusive ? value > minimum : value >= minimum;
};

export default { id, compile, interpret };
