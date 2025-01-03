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
  /**
   * If false, disables auto-correct.
   * The default value is true.
   */
  autoCorrect?: boolean | undefined;
  /**
   * Can tell TextInput to automatically capitalize certain characters.
   *      characters: all characters,
   *      words: first letter of each word
   *      sentences: first letter of each sentence (default)
   *      none: don't auto capitalize anything
   *
   * https://reactnative.dev/docs/textinput#autocapitalize
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  /**
   * Callback that is called when the text input's submit button is pressed.
   */
  onSubmitEditing?: ComponentProps<typeof DripsyTextInput>['onSubmitEditing'];
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
  autoCorrect = true,
  autoCapitalize = 'sentences',
  onSubmitEditing,
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
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
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
    fontSize: 'textBase',
  },
} satisfies Record<string, Sx>;
