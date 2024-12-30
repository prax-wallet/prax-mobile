import { Sx, View } from 'dripsy';
import { ReactNode, useEffect, useRef } from 'react';
import RNASActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ActionSheetProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Renders an action sheet that slides up from the bottom of the screen for UI
 * flows that don't require an entire route/screen.
 *
 * Pass it `isOpen` and `onClose` to control its state with, e.g., Redux.
 *
 * ```tsx
 * <ActionSheet isOpen={isOpen} onClose={onClose}>
 *   <View>
 *     <Text>ActionSheet content here.</Text>
 *   </View>
 * </ActionSheet>
 * ```
 *
 * For now, `<ActionSheet />` is implemented as a simple wrapper around
 * `react-native-actions-sheet` that allows declarative control of the action
 * sheet via `isOpen` and `onClose` props, rather than needing a `ref` to
 * control the action sheet imperatively.
 *
 * Eventually, this will also apply Prax Wallet's proper styling to the action
 * sheet, at which point this comment should be deleted/updated.
 */
export default function ActionSheet({ children, isOpen, onClose }: ActionSheetProps) {
  const ref = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isOpen) ref.current?.show();
    else ref.current?.hide();
  }, [isOpen]);

  return (
    <RNASActionSheet ref={ref} onClose={onClose} gestureEnabled safeAreaInsets={insets}>
      <View sx={sx.root}>{children}</View>
    </RNASActionSheet>
  );
}

const sx = {
  root: {
    px: '$4',
  },
} satisfies Record<string, Sx>;
