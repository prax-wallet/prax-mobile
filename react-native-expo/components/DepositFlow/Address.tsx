import Button from '../Button';
import * as Clipboard from 'expo-clipboard';
import { Pressable, Sx, Text, View } from 'dripsy';
import { useState } from 'react';
import Icon from '../Icon';
import { Info } from 'lucide-react-native';

const MOCK_PENUMBRA_ADDRESS =
  'penumbra147mfall0zr6am5r45qkwht7xqqrdsp50czde7empv7yq2nk3z8yyfh9k9520ddgswkmzar22vhz9dwtuem7uxw0qytfpv7lk3q9dp8ccaw2fn5c838rfackazmgf3ahh09cxmz';

const BUTTON_PROPS_DEFAULT = {
  children: 'Copy IBC address',
  disabled: false,
};

const BUTTON_PROPS_COPIED = {
  children: 'Copied!',
  disabled: true,
};

export default function Address() {
  const [buttonProps, setButtonProps] = useState(BUTTON_PROPS_DEFAULT);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(MOCK_PENUMBRA_ADDRESS);

    setButtonProps(BUTTON_PROPS_COPIED);
    setTimeout(() => setButtonProps(BUTTON_PROPS_DEFAULT), 2_000);
  };

  return (
    <View sx={sx.root}>
      <Text variant='large'>Shielded IBC deposit</Text>
      <Text variant='small'>
        This address rotates for each deposit to ensure privacy in Penumbra's shielded pool.
      </Text>

      <View sx={sx.addressWrapper}>
        <Text variant='small'>{MOCK_PENUMBRA_ADDRESS}</Text>
      </View>

      <Pressable sx={sx.helpButton}>
        <Text variant='small'>What is a shielded IBC deposit?</Text>
        <Icon IconComponent={Info} size='sm' />
      </Pressable>

      <Button actionType='accent' onPress={copyToClipboard} {...buttonProps} />
    </View>
  );
}

const sx = {
  addressWrapper: {
    borderRadius: 'lg',
    borderColor: 'actionNeutralFocusOutline',
    borderWidth: 1,

    px: '$4',
    py: '$2',
  },

  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$2',
  },

  root: {
    flexDirection: 'column',
    gap: '$4',
  },
} satisfies Record<string, Sx>;
