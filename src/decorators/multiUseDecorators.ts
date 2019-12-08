//FUNCTION DECORATORS

//Property Decorator
export function PropertyDeco(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator", target, propertyName);
}

//function Decorator
// function FunctionDeco(
//   target: Object,
//   propertyKey: string | symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log("Function Decorator", target, propertyKey, descriptor);
// }

//with this i can also return a new descriptor
export function FunctionDeco(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("Function Decorator", target, propertyKey, descriptor);
  return { ...descriptor, enumerable: false, configurable: false };
}

//cant retun on this one
export function ParameterDeco() {
  return function(target: any, name: string | Symbol, position: number) {
    console.log("Parameter Decorator", target, name, position);
  };
}

//another Function Decorator
export function AutoBind() {
  return function(
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjustDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjustDescriptor;
  };
}

export const Time = (label: string) => {
  return function<T>(
    target: T,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const fn: Function = descriptor.value;
    console.log(propertyKey, "was called");
    descriptor.value = (...args: PropertyDescriptor[]) => {
      console.time(label);
      const result = fn.bind(target, ...args)();
      console.timeEnd(label);
      return result;
    };
  };
};
