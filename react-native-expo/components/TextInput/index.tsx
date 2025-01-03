import { TextInput as DripsyTextInput, Sx, View } from 'dripsy';
import { ReactNode } from 'react';

export interface TextInputProps {
  value?: string;
  onChangeText?: (value: string) => void;
  /**
   * Markup to render to the left of the input field. For example, if you're
   * using `TextInput` for a username field, you may wish to pass `'@'` into the
   * `startAdornment` prop to show an `@` symbol to the left of the username
   * field.
   */
  startAdornment?: ReactNode;
}

/**
 * Wraps React Native's `<TextInput />`, while adding Prax styles.
 */
export default function TextInput({ value, onChangeText, startAdornment }: TextInputProps) {
  return (
    <View sx={sx.root}>
      {startAdornment}

      <DripsyTextInput sx={sx.textInput} value={value} onChangeText={onChangeText} />
    </View>
  );
}

const sx = {
  root: {
    borderColor: 'actionNeutralFocusOutline',
    borderWidth: 1,
    borderRadius: 'lg',

    px: '$4',
    py: '$2',

    flexDirection: 'row',
    alignItems: 'center',
    gap: '$2',
  },

  textInput: {
    appearance: 'none',
    flexGrow: 1,
  },
} satisfies Record<string, Sx>;
