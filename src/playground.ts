import * as React from "react";
import { LogIt } from "./decorators/classDecorators";
import { Time } from "./decorators/multiUseDecorators";
import { Component } from "./decorators/reactDecorator";

export type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;

@LogIt("Duro")
@Component<{ me: string }>()
class Duro {
  text: string = "Duro";

  render() {
    return null;
  }

  @Time("sayMe Took")
  sayMe(name: string) {
    setTimeout(() => {
      console.log(name);
    }, 2000);
  }
}

const duro = new Duro();

duro.sayMe(duro.text);
