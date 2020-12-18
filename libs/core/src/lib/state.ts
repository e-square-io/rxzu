import { BehaviorSubject, MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BaseEntity } from './base.entity';
import { ID, isArray, mapToEntries, EntityMap, Entries, HashMap } from './utils';

export class ValueState<T> {
  protected readonly stream$: BehaviorSubject<T>;

  readonly value$: Observable<T>;

  constructor(value?: T, operator?: OperatorFunction<any, T>) {
    this.stream$ = new BehaviorSubject(value);
    this.value$ = operator ? this.stream$.pipe(operator) : this.stream$.asObservable();
  }

  get value(): T {
    return this.stream$.getValue();
  }

  set(value: T): ValueState<T> {
    this.stream$.next(value);
    return this;
  }

  emit(): void {
    this.stream$.next(this.value);
  }

  select(): Observable<T>;
  select(project: (value: T) => T): Observable<T>;
  select<R>(project: (value: T) => R): Observable<R>;
  select<R>(project?: ((value: T) => T) | ((value: T) => R)): Observable<T | R> {
    const mapFn = project || ((v) => v);
    return this.value$.pipe(
      map((value) => mapFn(value)),
      distinctUntilChanged()
    );
  }
}

export function createValueState<T>(value: T, operator?: OperatorFunction<any, T>): ValueState<T> {
  return new ValueState<T>(value, operator);
}

export class EntityState<T extends BaseEntity> extends ValueState<EntityMap<T>> {
  protected stream$: BehaviorSubject<EntityMap<T>>;

  value$: Observable<EntityMap<T>>;

  constructor(value?: EntityMap<T>, entityPipe?: MonoTypeOperatorFunction<EntityMap<T>>) {
    super(value, entityPipe);
  }

  destroy() {
    this.clear();
    this.stream$ = null;
    this.value$ = null;
  }

  clear(destroy = true) {
    if (destroy) {
      this.forEach((entity) => entity.destroy());
    }

    this.value.clear();
    return this;
  }

  get(id: ID): T {
    return this.value.get(id);
  }

  has(id: ID): boolean {
    return this.value.has(id);
  }

  add(entity: T): EntityState<T> {
    this.value.set(entity.id, entity);
    return this;
  }

  addMany(entities: T[]): EntityState<T> {
    for (const entity of entities) {
      this.add(entity);
    }
    return this;
  }

  remove(id: ID, destroy = true): EntityState<T> {
    if (destroy) {
      this.value.get(id)?.destroy();
    }

    this.value.delete(id);
    return this;
  }

  array(): T[] {
    return Array.from(this.value.values());
  }

  array$(): Observable<T[]> {
    return this.select((value) => Array.from(value.values()));
  }

  forEach(cb: (value: T, key: string, map: EntityMap<T>) => void): void {
    this.value.forEach(cb);
  }

  map<R>(cb: (value: T, index: number, array: T[]) => R): R[] {
    return this.array().map(cb);
  }
}

export function createEntityState<T extends BaseEntity>(
  value: HashMap<T> | Entries<T> = [],
  entityPipe: MonoTypeOperatorFunction<Map<ID, T>>
): EntityState<T> {
  if (isArray(value)) {
    return new EntityState(new Map(value), entityPipe);
  } else {
    return new EntityState(new Map(mapToEntries(value)), entityPipe);
  }
}
