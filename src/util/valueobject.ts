interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }
  private shallowEqual(a: any, b: any): boolean {
    if (a === b) {
      return true;
    }
    if (a === null || b === null) {
      return false;
    }
    if (a.constructor !== b.constructor) {
      return false;
    }
    for (let key in a) {
      if (!a.hasOwnProperty(key)) {
        continue;
      }
      if (!b.hasOwnProperty(key)) {
        return false;
      }
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return this.shallowEqual(this.props, vo.props);
  }
}
