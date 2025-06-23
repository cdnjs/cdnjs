import { Validation } from "../experimental.js";
import * as Instance from "../instance.js";


export class DetailedOutputPlugin {
  beforeSchema(_url, _instance, context) {
    context.errors ??= [];
  }

  beforeKeyword(_node, _instance, context) {
    context.errors = [];
  }

  afterKeyword(node, instance, context, valid, schemaContext) {
    if (!valid) {
      const [keywordId, schemaUri] = node;
      const outputUnit = {
        keyword: keywordId,
        absoluteKeywordLocation: schemaUri,
        instanceLocation: Instance.uri(instance)
      };

      schemaContext.errors.push(outputUnit);
      if (context.errors.length > 0) {
        outputUnit.errors = context.errors;
      }
    }
  }

  afterSchema(url, instance, context, valid) {
    if (typeof context.ast[url] === "boolean" && !valid) {
      context.errors.push({
        keyword: Validation.id,
        absoluteKeywordLocation: url,
        instanceLocation: Instance.uri(instance)
      });
    }

    this.errors = context.errors;
  }
}
