import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { PenumbraSdkModuleViewProps } from './PenumbraSdkModule.types';

const NativeView: React.ComponentType<PenumbraSdkModuleViewProps> =
  requireNativeViewManager('PenumbraSdkModule');

export default function PenumbraSdkModuleView(props: PenumbraSdkModuleViewProps) {
  return <NativeView {...props} />;
}
