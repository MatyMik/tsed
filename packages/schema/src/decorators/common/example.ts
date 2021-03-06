import {DecoratorParameters, DecoratorTypes, getDecoratorType, isObject, UnsupportedDecoratorType} from "@tsed/core";
import {JsonEntityStore} from "../../domain/JsonEntityStore";
import {JsonEntityFn} from "./jsonEntityFn";

/**
 * Add a example metadata on the decorated element.
 *
 * @decorator
 * @swagger
 * @schema
 * @input
 * @methodDecorator
 * @classDecorator
 */
export function Example(examples: any): Function;
export function Example(name: string, description: string): Function;
export function Example(name: string | any, description?: string) {
  let example: any;

  if (description) {
    example = {[name]: description};
  } else {
    example = name;
    if (typeof name === "string") {
      example = [].concat(example);
    }
  }

  return JsonEntityFn((store: JsonEntityStore, args: DecoratorParameters) => {
    switch (getDecoratorType(args, true)) {
      case DecoratorTypes.CLASS:
      case DecoratorTypes.PROP:
        store.schema.examples(example);
        break;

      default:
        throw new UnsupportedDecoratorType(Example, args);
    }
  });
}
