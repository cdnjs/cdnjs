import { invariant } from "../utils/utils";
import getDefaultModelSchema from "./getDefaultModelSchema";
import setDefaultModelSchema from "./setDefaultModelSchema";
/**
 * Creates a model schema that (de)serializes an object created by a constructor function (class).
 * The created model schema is associated by the targeted type as default model schema, see setDefaultModelSchema.
 * Its factory method is `() => new clazz()` (unless overriden, see third arg).
 *
 * @example
 * function Todo(title, done) {
 *     this.title = title
 *     this.done = done
 * }
 *
 * createModelSchema(Todo, {
 *     title: true,
 *     done: true,
 * })
 *
 * const json = serialize(new Todo('Test', false))
 * const todo = deserialize(Todo, json)
 *
 * @param clazz class or constructor function
 * @param props property mapping
 * @param factory optional custom factory. Receives context as first arg
 * @returns model schema
 */
export default function createModelSchema(clazz, props, factory) {
    invariant(clazz !== Object, "one cannot simply put define a model schema for Object");
    invariant(typeof clazz === "function", "expected constructor function");
    var model = {
        targetClass: clazz,
        factory: factory ||
            function () {
                return new clazz();
            },
        props: props,
    };
    // find super model
    if (clazz.prototype.constructor !== Object) {
        var s = getDefaultModelSchema(clazz.prototype.constructor);
        if (s && s.targetClass !== clazz)
            model.extends = s;
    }
    setDefaultModelSchema(clazz, model);
    return model;
}
var x = Object;
//# sourceMappingURL=createModelSchema.js.map