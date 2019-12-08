//I COULDNT GET THIS TO WORK AS I WANTED

export function Component<P = {}>() {
  return function classDecorator<T extends { new (...args: any[]): {} }>(
    target: T
  ) {
    return class extends target implements React.Component {
      context: any;
      setState<K extends never>(
        state:
          | {}
          | ((
              prevState: Readonly<{}>,
              props: Readonly<{}>
            ) => {} | Pick<{}, K> | null)
          | Pick<{}, K>
          | null,
        callback?: (() => void) | undefined
      ): void {
        throw new Error("Method not implemented.");
      }
      forceUpdate(callback?: (() => void) | undefined): void {
        throw new Error("Method not implemented.");
      }
      render(): React.ReactNode {
        throw new Error("Method not implemented.");
      }
      props: Readonly<{}> & Readonly<{ children?: React.ReactNode }>;
      state: Readonly<{}>;
      refs: { [key: string]: React.ReactInstance };
      text = "override"; //overrides the text property

      //do something in the constructor
      constructor(...args: any[]) {
        super(args);
        this.state = {};
        this.props = {};
        this.refs = {};
        console.log(`A new Instance of this was constructed.`);
      }
    };
  };
}
