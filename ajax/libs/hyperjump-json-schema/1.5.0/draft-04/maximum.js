import * as Instance from "../lib/instance.js";
import * as Schema from "../lib/schema.js";
import { getKeywordName } from "../lib/keywords.js";


const id = "https://json-schema.org/keyword/draft-04/maximum";

const compile = async (schema, ast, parentSchema) => {
  const exclusiveMaximumKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/draft-04/exclusiveMaximum");
  const exclusiveMaximum = await Schema.step(exclusiveMaximumKeyword, parentSchema);
  const isExclusive = Schema.value(exclusiveMaximum);

  return [Schema.value(schema), isExclusive];
};

const interpret = ([maximum, isExclusive], instance) => {
  if (!Instance.typeOf(instance, "number")) {
    return true;
  }

  const value = Instance.value(instance);
  return isExclusive ? value < maximum : value <= maximum;
};

export default { id, compile, interpret };
