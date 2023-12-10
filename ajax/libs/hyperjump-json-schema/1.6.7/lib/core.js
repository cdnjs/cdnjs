import curry from "just-curry-it";
import { subscribe, unsubscribe } from "./pubsub.js";
import {
  setMetaSchemaOutputFormat,
  getShouldValidateSchema,
  isExperimentalKeywordEnabled,
  setExperimentalKeywordEnabled,
  getMetaSchemaOutputFormat
} from "./configuration.js";
import * as Instance from "./instance.js";
import { InvalidSchemaError } from "./invalid-schema-error.js";
import * as Schema from "./schema.js";
import Validation from "./keywords/validation.js";


export const FLAG = "FLAG", BASIC = "BASIC", DETAILED = "DETAILED", VERBOSE = "VERBOSE";
setMetaSchemaOutputFormat(FLAG);

export const validate = async (url, value = undefined, outputFormat = undefined) => {
  const compiled = await compile(url);
  const interpretAst = (value, outputFormat) => interpret(compiled, Instance.cons(value), outputFormat);

  return value === undefined ? interpretAst : interpretAst(value, outputFormat);
};

export const compile = async (url) => {
  const schema = await Schema.get(url);
  const ast = { metaData: {} };
  const schemaUri = await Validation.compile(schema, ast);
  return { ast, schemaUri };
};

export const interpret = curry(({ ast, schemaUri }, value, outputFormat = FLAG) => {
  if (![FLAG, BASIC, DETAILED, VERBOSE].includes(outputFormat)) {
    throw Error(`The '${outputFormat}' error format is not supported`);
  }

  const output = [];
  const subscriptionToken = subscribe("result", outputHandler(outputFormat, output));
  try {
    Validation.interpret(schemaUri, value, ast, {});
  } finally {
    unsubscribe("result", subscriptionToken);
  }

  return output[0];
});

const outputHandler = (outputFormat, output) => {
  const resultStack = [];

  return (message, keywordResult) => {
    if (message === "result") {
      const { keyword, absoluteKeywordLocation, instanceLocation, valid } = keywordResult;
      const result = { keyword, absoluteKeywordLocation, instanceLocation, valid, errors: [] };
      resultStack.push(result);
    } else if (message === "result.start") {
      resultStack.push(message);
    } else if (message === "result.end") {
      const result = resultStack.pop();
      while (resultStack[resultStack.length - 1] !== "result.start") {
        const topResult = resultStack.pop();

        const errors = [topResult];
        if (outputFormat === BASIC) {
          errors.push(...topResult.errors);
          delete topResult.errors;
        }

        if (outputFormat === VERBOSE || (outputFormat !== FLAG && !topResult.valid)) {
          result.errors.unshift(...errors);
        }
      }
      resultStack[resultStack.length - 1] = result;

      output[0] = result;
    }
  };
};

const metaValidators = {};
subscribe("validate.metaValidate", async (message, schema) => {
  if (getShouldValidateSchema() && !schema.validated) {
    Schema.markValidated(schema.id);

    // Compile
    if (!(schema.dialectId in metaValidators)) {
      // Dynamic references are experimental, but are necessary for meta-validation
      const dyanmicRefKeywordId = "https://json-schema.org/keyword/dynamicRef";
      const isDynamicRefEnabled = isExperimentalKeywordEnabled(dyanmicRefKeywordId);
      setExperimentalKeywordEnabled(dyanmicRefKeywordId, true);

      // itemPattern is experimental, but is necessary for meta-validation
      const itemPatternKeywordId = "https://json-schema.org/keyword/itemPattern";
      const isItemPatternEnabled = isExperimentalKeywordEnabled(itemPatternKeywordId);
      setExperimentalKeywordEnabled(itemPatternKeywordId, true);

      const compiledSchema = await compile(schema.dialectId);
      metaValidators[schema.dialectId] = interpret(compiledSchema);

      setExperimentalKeywordEnabled(itemPatternKeywordId, isItemPatternEnabled);
      setExperimentalKeywordEnabled(dyanmicRefKeywordId, isDynamicRefEnabled);
    }

    // Interpret
    const schemaInstance = Instance.cons(schema.schema, schema.id);
    const metaResults = metaValidators[schema.dialectId](schemaInstance, getMetaSchemaOutputFormat());
    if (!metaResults.valid) {
      throw new InvalidSchemaError(metaResults);
    }
  }
});

export const addSchema = (schema, url = undefined, defaultSchemaVersion = undefined) => {
  const id = Schema.add(schema, url, defaultSchemaVersion);
  delete metaValidators[id];
};
