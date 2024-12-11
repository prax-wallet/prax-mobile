import * as React from 'react';

import { PenumbraSdkModuleViewProps } from './PenumbraSdkModule.types';

export default function PenumbraSdkModuleView(props: PenumbraSdkModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
