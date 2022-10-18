import { Clazz, ClazzOrModelSchema, DiscriminatorSpec } from "../serializr";
/**
 * Sometimes, when working with schema hierarchies, we may want to deserialize an object to
 * a specific sub-schema. The `subSchema` decorator is used to handle such scenario.
 * What schema is picked among those available is decided using a "discriminator". The
 * discriminator can be a string (which is added to the serialized object) or a object
 * containing callbacks allowing for more complex behaviour.
 *
 *
 * @example
 * ```ts
 *   class Todo {
 *      @serializable
 *       id: string;
 *
 *       @serializable
 *       text: string;
 *   }
 *
 *   @subSchema("picture")
 *   class PictureTodo extends Todo {
 *       @serializable
 *       pictureUrl: string;
 *   }
 *
 *   const ser = serialize(Object.assign(new PictureTodo(), {
 *       id: "pic1",
 *       text: "Lorem Ipsum",
 *       pictureUrl:"foobar",
 *   }));
 *   // ser now holds an object like the following result
 *   // {
 *   //    id: "pic1",
 *   //    _type: "picture"
 *   //    text: "Lorem Ipsum",
 *   //    pictureUrl:"foobar",
 *   // }
 *   const deser = deserialize(Todo, ser);
 *   console.log(deser instanceof PictureTodo); // true
 * ```
 *
 * @example
 * Using the `parent` argument it's possible to specify the subschema parent instead
 * of relying on auto-detention.
 * ```ts
 *   class Todo {
 *      @serializable
 *       id: string;
 *
 *       @serializable
 *       text: string;
 *   }
 *
 *   @subSchema("picture")
 *   class PictureTodo extends Todo {
 *       @serializable
 *       pictureUrl: string;
 *   }
 *
 *   @subSchema("betterPicture", Todo)
 *   class BetterPictureTodo extends PictureTodo {
 *       @serializable
 *       altText: string;
 *   }
 *
 *
 *   const ser = serialize(Object.assign(new BetterPictureTodo(), {
 *       id: "pic1",
 *       text: "Lorem Ipsum",
 *       pictureUrl:"foobar",
 *       altText: "Alt text",
 *   }));
 *   // ser now holds an object like the following result
 *   // {
 *   //    id: "pic1",
 *   //    _type: "betterPicture"
 *   //    text: "Lorem Ipsum",
 *   //    pictureUrl:"foobar",
 *   //    altText: "Alt text",
 *   // }
 *   const deser = deserialize(Todo, ser);
 *   console.log(deser instanceof BetterPictureTodo); // true
 *   console.log(deser instanceof PictureTodo); // true
 *
 *   const ser2 = serialize(Object.assign(new PictureTodo(), {
 *       id: "pic2",
 *       text: "Lorem Ipsum",
 *       pictureUrl:"foobar",
 *   }));
 *   // ser2 now holds an object like the following result
 *   // {
 *   //    id: "pic2",
 *   //    _type: "picture"
 *   //    text: "Lorem Ipsum",
 *   //    pictureUrl:"foobar",
 *   // }
 *   const deser2 = deserialize(Todo, ser2);
 *   console.log(deser2 instanceof BetterPictureTodo); // false
 *   console.log(deser2 instanceof PictureTodo); // true
 * ```
 *
 * @param discriminator An object providing the discriminator logic or a string/number
 * that will be stored into the `_type` attribute.
 * @param parent When there are multiple levels of hierarchy involved you may provide this
 * argument to indicate the main schema used for deserialization. When not give the parent
 * schema is inferred as the direct parent (the class/schema that is extended).
 *
 * @returns
 */
export default function subSchema(discriminator: DiscriminatorSpec | string | number, parent?: ClazzOrModelSchema<any>): (clazz: Clazz<any>) => Clazz<any>;
