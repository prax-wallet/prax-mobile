import * as React from 'react';

import { MyModuleViewProps } from './MyModule.types';

export default function MyModuleView(props: MyModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
