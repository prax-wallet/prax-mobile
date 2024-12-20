import { DripsyTheme } from '@/utils/dripsyTheme';
import { useSx } from 'dripsy';
import { LucideIcon } from 'lucide-react-native';
import { ComponentProps, FC } from 'react';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps {
  /**
   * The icon import from `lucide-react` to render.
   *
   * ```tsx
   * import { ChevronRight } from 'lucide-react-native';
   * <Icon IconComponent={ChevronRight} />
   * ```
   */
  IconComponent: LucideIcon | FC;
  /**
   * - `sm`: 16px square
   * - `md`: 24px square
   * - `lg`: 32px square
   */
  size: IconSize;
  color?: keyof DripsyTheme['colors'];
}

const PROPS_BY_SIZE: Record<IconSize, ComponentProps<LucideIcon>> = {
  sm: {
    size: 16,
    strokeWidth: 1,
  },
  md: {
    size: 24,
    strokeWidth: 1.5,
  },
  lg: {
    size: 32,
    strokeWidth: 2,
  },
};

/**
 * Renders the Lucide icon passed in via the `IconComponent` prop. Use this
 * component rather than rendering Lucide icon components directly, since this
 * component standardizes the stroke width and sizes throughout the Penumbra
 * ecosystem.
 *
 * ```tsx
 * <Icon
 *   IconComponent={ArrowRightLeft}
 *   size='sm'
 *   color={color => color.success.main}
 * />
 * ```
 */
export default function Icon({ IconComponent, size = 'sm', color }: IconProps) {
  const sx = useSx();
  color = color ? sx({ color }).color : 'currentColor';

  return <IconComponent absoluteStrokeWidth color={color} {...PROPS_BY_SIZE[size]} />;
}
