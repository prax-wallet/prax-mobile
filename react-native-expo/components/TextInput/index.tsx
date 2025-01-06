import { TextInput as DripsyTextInput, Sx, View } from 'dripsy';

export interface TextInputProps {
  value?: string;
  onChangeText?: (value: string) => void;
}

/**
 * Wraps React Native's `<TextInput />`, while adding Prax styles.
 */
export default function TextInput({ value, onChangeText }: TextInputProps) {
  return (
    <View sx={sx.root}>
      <DripsyTextInput value={value} onChangeText={onChangeText} />
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
  },
} satisfies Record<string, Sx>;
