import { TextInput as DripsyTextInput, Sx, useSx, View } from 'dripsy';
import { ComponentProps, ReactNode } from 'react';
import { KeyboardTypeOptions } from 'react-native';

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
  placeholder?: string;
  /**
   * When the clear button should appear on the right side of the text input.
   */
  clearButtonMode?: ComponentProps<typeof DripsyTextInput>['clearButtonMode'];
  /** The type of keyboard to display for this text input. */
  keyboardType?: KeyboardTypeOptions;
}

/**
 * Wraps React Native's `<TextInput />`, while adding Prax styles.
 */
export default function TextInput({
  value,
  onChangeText,
  startAdornment,
  placeholder,
  clearButtonMode,
  keyboardType,
}: TextInputProps) {
  const placeholderTextColor = useSx()({ color: 'neutralLight' }).color;

  return (
    <View sx={sx.root}>
      {startAdornment}

      <DripsyTextInput
        sx={sx.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        clearButtonMode={clearButtonMode}
        keyboardType={keyboardType}
      />
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
