//CLASS DECORATORS

//Class Decorator Factory
export function Logger() {
  return function(constructor: Function) {
    console.log("Logger here");
    console.log(constructor);
  };
}

//Factory decorator that accepts parameters
// function WIthTemplate(template: string, hookId: string) {
//   return function(constructor: Function) {
//     const hookEl = document.getElementById(hookId);
//     if (hookEl) {
//       hookEl.innerHTML = template;
//       const myNode: Node = document.createElement("h1");
//       myNode.textContent = constructor.name + " class";
//       hookEl.appendChild(myNode);
//     }
//   };
// }

//With this approach the execution of the log will be after the class is instantiated.
export function WIthTemplate(template: string, hookId: string) {
  return function<T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();
        console.log("renderin template because the class was instantiated");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          const myNode: Node = document.createElement("h1");
          myNode.textContent = originalConstructor.name + " class";
          hookEl.appendChild(myNode);
        }
      }
    };
  };
}

//Class Decorator (Not Factory)
export function ClassSay(constructor: Function) {
  console.log(constructor, "FROM CLASS SAY");
}

export function LogIt(texto: string) {
  return function classDecorator<T extends { new (...args: any[]): {} }>(
    target: T
  ) {
    return class extends target {
      text = "override"; //overrides the text property
      //do something in the constructor
      constructor(...args: any[]) {
        super(args);
        console.log(`A new Instance of ${texto} was constructed.`);
      }
    };
  };
}
