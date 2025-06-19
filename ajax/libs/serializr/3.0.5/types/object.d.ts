import { ClazzOrModelSchema, AdditionalPropArgs, PropSchema } from "../api/types";
/**
 * `object` indicates that this property contains an object that needs to be (de)serialized
 * using its own model schema.
 *
 * N.B. mind issues with circular dependencies when importing model schema's from other files! The module resolve algorithm might expose classes before `createModelSchema` is executed for the target class.
 *
 * @example
 * class SubTask {}
 * class Todo {}
 *
 * createModelSchema(SubTask, {
 *     title: true,
 * })
 * createModelSchema(Todo, {
 *     title: true,
 *     subTask: object(SubTask),
 * })
 *
 * const todo = deserialize(Todo, {
 *     title: 'Task',
 *     subTask: {
 *         title: 'Sub task',
 *     },
 * })
 *
 * @param modelSchema to be used to (de)serialize the object
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function object(modelSchema: ClazzOrModelSchema<any>, additionalArgs?: AdditionalPropArgs): PropSchema;
