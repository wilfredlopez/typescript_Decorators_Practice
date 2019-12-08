import { Logger, ClassSay, WIthTemplate } from "./decorators/classDecorators";
import {
  PropertyDeco,
  FunctionDeco,
  ParameterDeco,
  AutoBind
} from "./decorators/multiUseDecorators";
import {
  registredValidators,
  Required,
  PositiveNumber
} from "./decorators/validation";

@Logger() //Its called like this if is a factory
@ClassSay //it is called like this if not a factory
@WIthTemplate("<h2>Person Object</h2>", "personEl") //factory decorator that accepts parameters
export class Person {
  //with public in the constructor it creates the local variable like this.name
  constructor(public name: string) {
    console.log("Creating Person");
  }
}

//instantiatiing the class
const pp = new Person("Wilfred");

class Product {
  @PropertyDeco
  _price: number;
  constructor(public title: string, price: number) {
    this._price = price;
  }

  @FunctionDeco
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Price most be creater than 0");
    }
  }

  @PropertyDeco
  getPriceWithTax(@ParameterDeco() tax: number) {
    return this.price * (1 + tax);
  }
}

const p = new Product("Iphone", 900);

class Printer {
  constructor(public text: string) {}

  @AutoBind()
  showMessage() {
    console.log(this.text);
  }
}

const printer = new Printer("IM SO GOOD");

const button = document.querySelector("#clickMe") as HTMLButtonElement;

if (button) {
  //this wouldnt work because the this is not bind to the printer so text will be undefined without the decorator
  button.addEventListener("click", printer.showMessage);
}

class Course {
  @Required()
  title: string;

  @Required()
  @PositiveNumber()
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

export function valildateCourse(obj: any) {
  const objValidatorsConfig = registredValidators[obj.constructor.name];

  if (!objValidatorsConfig) {
    return true;
  }

  let isValid = true;

  for (const prop in objValidatorsConfig) {
    for (const validator of objValidatorsConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

const FormEl = document.querySelector("#courseForm") as HTMLFormElement;

FormEl.addEventListener("submit", e => {
  e.preventDefault();
  const titleEl = document.querySelector("#title") as HTMLInputElement;
  const priceEl = document.querySelector("#price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const myCourse = new Course(title, price);

  if (!valildateCourse(myCourse)) {
    alert("Invalid Course");
    return;
  } else {
    priceEl.value = "";
    titleEl.value = "";
    console.log(myCourse);
  }
});
