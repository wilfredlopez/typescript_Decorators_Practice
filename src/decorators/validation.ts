export interface ValidatorConfig {
  [property: string]: {
    [validateProps: string]: string[];
  };
}

export const registredValidators: ValidatorConfig = {};

export function Required() {
  return function(target: object, name: string | symbol) {
    registredValidators[target.constructor.name] = {
      ...registredValidators[target.constructor.name],
      [name]: ["required"]
    };
  };
}

export function PositiveNumber() {
  return function(target: object, name: string | symbol) {
    registredValidators[target.constructor.name] = {
      ...registredValidators[target.constructor.name],
      [name]: ["positive"]
    };
  };
}
