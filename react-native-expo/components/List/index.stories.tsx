import { Meta, StoryObj } from '@storybook/react';

import List from '.';
import ListItem from '../ListItem';
import AssetIcon from '../AssetIcon';

const meta: Meta<typeof List> = {
  component: List,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof List> = {
  args: {
    title: 'Assets',
    children: (
      <>
        <ListItem primaryText='ETH' secondaryText='Ethereum' avatar={<AssetIcon />} />
        <ListItem primaryText='ATOM' secondaryText='Cosmos' avatar={<AssetIcon />} />
        <ListItem primaryText='UM' secondaryText='Penumbra' avatar={<AssetIcon />} />
        <ListItem primaryText='USDC' secondaryText='USD Coin' avatar={<AssetIcon />} />
      </>
    ),
  },
};
