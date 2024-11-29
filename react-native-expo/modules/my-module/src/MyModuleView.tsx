import { requireNativeView } from 'expo';
import * as React from 'react';

import { MyModuleViewProps } from './MyModule.types';

const NativeView: React.ComponentType<MyModuleViewProps> =
  requireNativeView('MyModule');

export default function MyModuleView(props: MyModuleViewProps) {
  return <NativeView {...props} />;
}
