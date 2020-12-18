import { BaseModel } from './models';

export abstract class AbstractFactory<T extends BaseModel> {
  protected _type: string;

  constructor(type: string) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  abstract getNewInstance(initialConfig?: unknown): T;
}
