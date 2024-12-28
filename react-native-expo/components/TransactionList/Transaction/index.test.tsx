import { render } from '@testing-library/react-native';
import Transaction from '.';
import PraxDripsyProvider from '@/components/PraxDripsyProvider';

const MOCK_PENUMBRA_ADDRESS =
  'penumbra147mfall0zr6am5r45qkwht7xqqrdsp50czde7empv7yq2nk3z8yyfh9k9520ddgswkmzar22vhz9dwtuem7uxw0qytfpv7lk3q9dp8ccaw2fn5c838rfackazmgf3ahh09cxmz';

describe('<Transaction />', () => {
  describe('when there is a memo', () => {
    it('gets rendered', () => {
      const { queryByText } = render(
        <Transaction
          transaction={{
            id: 'abc123',
            type: 'receive',
            senderAddress: MOCK_PENUMBRA_ADDRESS,
            memo: 'This is the memo',
          }}
        />,
        { wrapper: PraxDripsyProvider },
      );

      expect(queryByText('This is the memo')).not.toBeNull();
    });
  });

  describe('`receive` transaction', () => {
    describe('when the transaction has no `senderUsername`', () => {
      it("renders the sender's address", () => {
        const { queryByText } = render(
          <Transaction
            transaction={{ id: 'abc123', type: 'receive', senderAddress: MOCK_PENUMBRA_ADDRESS }}
          />,
          { wrapper: PraxDripsyProvider },
        );

        expect(queryByText(MOCK_PENUMBRA_ADDRESS)).not.toBeNull();
      });
    });

    describe('when the transaction has a `senderUsername`', () => {
      it("renders the sender's username prefixed with `@`", () => {
        const { queryByText } = render(
          <Transaction
            transaction={{
              id: 'abc123',
              type: 'receive',
              senderAddress: MOCK_PENUMBRA_ADDRESS,
              senderUsername: 'henry',
            }}
          />,
          { wrapper: PraxDripsyProvider },
        );

        expect(queryByText('@henry')).not.toBeNull();
      });
    });
  });
});
