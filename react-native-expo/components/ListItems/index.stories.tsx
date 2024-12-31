import { Meta, StoryObj } from '@storybook/react';

import ListItems from '.';
import ListItem from '../ListItem';
import AssetIcon from '../AssetIcon';

const meta: Meta<typeof ListItems> = {
  component: ListItems,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof ListItems> = {
  args: {
    children: (
      <>
        <ListItem
          avatar={<AssetIcon />}
          primaryText='ListItem one'
          secondaryText='Secondary text'
        />

        <ListItem
          avatar={<AssetIcon />}
          primaryText='ListItem one'
          secondaryText='Secondary text'
        />
      </>
    ),
  },
};
