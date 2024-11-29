import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './MyModule.types';

type MyModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class MyModule extends NativeModule<MyModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(MyModule);
