import {
  decoratorTypeOf,
  DecoratorTypes,
  descriptorOf,
  Entity,
  EntityOptions,
  isClass,
  isCollection,
  isPromise,
  Store,
  Type
} from "@tsed/core";
import {JsonOperation} from "./JsonOperation";
import {JsonParameter} from "./JsonParameter";
import {JsonSchema} from "./JsonSchema";

export interface JsonEntityStoreOptions extends EntityOptions {
  [key: string]: any;
}

const getSchema = (type: any) => {
  if (isCollection(type) || !isClass(type)) {
    return JsonSchema.from({
      type
    });
  }

  return JsonEntityStore.from(type).schema;
};

export class JsonEntityStore extends Entity implements JsonEntityStoreOptions {
  static entities = new Map<DecoratorTypes, Type<JsonEntityStore>>();
  readonly store: Store;
  readonly isStore = true;
  /**
   * List of children JsonEntityStore (properties or methods or params)
   */
  readonly children: Map<string | number, JsonEntityStore> = new Map();
  /**
   * Path used to generate open spec.
   */
  public path: string = "/";
  /**
   * Ref to JsonSchema
   */
  protected _schema: JsonSchema;
  /**
   * Ref to JsonOperation when the decorated object is a method.
   */
  protected _operation: JsonOperation;
  /**
   * Ref to JsonParameter when the decorated object is a parameter.
   */
  protected _parameter: JsonParameter;

  [key: string]: any;

  constructor(options: JsonEntityStoreOptions) {
    super(options);
    this.store = options.store;

    /* istanbul ignore next */
    if (options.children) {
      this.children = options.children;
    }

    this.build();
  }

  /**
   * Return the JsonSchema
   */
  get schema(): JsonSchema {
    return this._schema;
  }

  /**
   * Return the JsonOperation
   */
  get operation(): JsonOperation | undefined {
    return this._operation;
  }

  /**
   * Return the JsonParameter
   */
  get parameter(): JsonParameter | undefined {
    return this._parameter;
  }

  get nestedGenerics(): Type<any>[][] {
    switch (this.decoratorType) {
      case DecoratorTypes.PARAM:
        return this.parameter!.nestedGenerics;
      default:
        return this.schema.nestedGenerics;
    }
  }

  set nestedGenerics(nestedGenerics: Type<any>[][]) {
    switch (this.decoratorType) {
      case DecoratorTypes.PARAM:
        this.parameter!.nestedGenerics = nestedGenerics;
        break;
      default:
        this.schema.nestedGenerics = nestedGenerics;
        break;
    }
  }

  /**
   *
   * @returns {Type<any>}
   */
  get type(): Type<any> | any {
    return this._type;
  }

  /**
   * Get original type without transformation
   * @param value
   */
  set type(value: Type<any> | any) {
    this._type = value;
    this.build();
  }

  /**
   * Return the itemSchema computed type. if the type is a function used for recursive model, the function will be called to
   * get the right type.
   */
  get computedType() {
    return this.itemSchema.getComputedType();
  }

  get itemSchema(): JsonSchema {
    return this.isCollection ? this.schema.itemSchema() : this.schema;
  }

  get parentSchema(): JsonSchema {
    return this.parent.schema;
  }

  get parent(): JsonEntityStore {
    const {target, propertyKey, decoratorType} = this;

    switch (decoratorType) {
      case DecoratorTypes.PARAM:
        return JsonEntityStore.fromMethod(target, propertyKey as string);
      case DecoratorTypes.METHOD:
      case DecoratorTypes.PROP:
        return JsonEntityStore.from(target);
    }

    return this;
  }

  /**
   *
   * @param args
   */
  static from<T extends JsonEntityStore = JsonEntityStore>(...args: any[]) {
    const store = Store.from(...args);

    if (!store.has(JsonEntityStore)) {
      const entityStore = JsonEntityStore.entities.get(decoratorTypeOf(args)) || JsonEntityStore;

      const jsonSchemaStore = new (entityStore as any)({
        store,
        target: args[0],
        propertyKey: args[1],
        index: typeof args[2] === "number" ? args[2] : undefined,
        descriptor: typeof args[2] === "object" ? args[2] : undefined
      });

      store.set(JsonEntityStore, jsonSchemaStore);
    }

    return store.get<T>(JsonEntityStore)!;
  }

  static fromMethod(target: any, propertyKey: string | symbol) {
    return this.from(target, propertyKey, descriptorOf(target, propertyKey));
  }

  protected build() {
    if (!this._type) {
      let type: any;

      switch (this.decoratorType) {
        case DecoratorTypes.PARAM:
          type = Store.getParamTypes(this.target, this.propertyKey)[this.index!];
          break;
        case DecoratorTypes.CLASS:
          type = this.target;
          break;
        case DecoratorTypes.PROP:
          type = Store.getType(this.target, this.propertyKey);
          break;
        case DecoratorTypes.METHOD:
          type = Store.getReturnType(this.target, this.propertyKey);
          type = isPromise(type) ? undefined : type;
          break;
      }

      if (isCollection(type)) {
        this.collectionType = type;
      } else {
        this._type = type;
      }
    }

    this._type = this._type || Object;

    switch (this.decoratorType) {
      default:
        this._schema = JsonSchema.from();
        break;

      case DecoratorTypes.CLASS:
        this._schema = JsonSchema.from({
          type: this.type
        });
        break;
      case DecoratorTypes.METHOD:
        this._operation = this.createOperation();
        break;
      case DecoratorTypes.PARAM:
        this._parameter = this.createParameter();
        break;
      case DecoratorTypes.PROP:
        this._schema = this.createProperty();
        break;
    }
  }

  protected createProperty(): any {
    const parentStore = this.parent;

    const properties = parentStore.schema.get("properties");
    let schema: JsonSchema = properties[this.propertyName];

    if (!schema) {
      parentStore.children.set(this.propertyName, this);

      schema = JsonSchema.from({
        type: this.collectionType || this.type
      });

      if (this.collectionType) {
        schema.itemSchema(this.type);
      }
    }

    parentStore.schema.addProperties(this.propertyName, schema);

    return schema;
  }

  protected createOperation(): JsonOperation {
    const parentStore = this.parent;

    // response schema of the method
    let operation = this.operation;

    if (!operation) {
      operation = new JsonOperation();
      parentStore.children.set(this.propertyName, this);
    }

    if (isCollection(this._type)) {
      this.collectionType = this._type;
      delete this._type;
    }

    this._schema = JsonSchema.from({
      type: this.collectionType || this.type
    });

    if (this.collectionType) {
      this._schema.itemSchema(this.type);
    }

    parentStore.schema.addProperties(this.propertyName, this.schema);

    return operation;
  }

  protected createParameter(): JsonParameter {
    const parentStore = this.parent;
    let parameter = this.parameter;

    if (!parameter) {
      parameter = new JsonParameter();
      parentStore.children.set(this.index!, this);

      this._schema = getSchema(this.collectionType || this.type);

      parameter.schema(this._schema);

      if (this.collectionType) {
        this._schema.itemSchema(getSchema(this.type));
      }

      parentStore.operation?.addParameter(this.index as number, parameter);
    }

    return parameter;
  }
}
