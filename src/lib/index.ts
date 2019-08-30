export * from './hooks';

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

export function deepGet(obj: any, property: string, defaultValue?: any): any {
  if (!obj) return defaultValue;

  if (/\./g.test(property)) {
    const properties = property.split('.');
    return deepGet(obj[properties[0]], properties.slice(1).join('.'), defaultValue);
  } else {
    return [ undefined, null ].indexOf(obj[property]) === -1 ? obj[property] : defaultValue;
  }
}

export function deepSet(obj: any, property: string, value: any): any {
  if (/\./g.test(property)) {
    const properties = property.split('.');
    if (!obj[properties[0]]) {
      obj[properties[0]] = {};
    }
    deepSet(obj[properties[0]], properties.slice(1).join('.'), value);
  } else {
    obj[property] = value;
  }
}

export function d(value: any): any {
  if (typeof value === 'function') {
    return function (...args: any[]): any {
      const res = value(...args);
      console.log(args, res);
      return res;
    };
  } else {
    console.log(value);
    return value;
  }
}
