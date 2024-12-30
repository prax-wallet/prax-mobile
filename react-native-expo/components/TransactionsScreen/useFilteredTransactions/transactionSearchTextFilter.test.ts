import transactionFactory from '@/factories/transaction';
import transactionSearchTextFilter from './transactionSearchTextFilter';

describe('transactionMatchesSearchText()', () => {
  describe('`receive` transaction', () => {
    const transaction = transactionFactory.build({
      type: 'receive',
      senderUsername: 'henry',
      senderAddress: 'abc123',
      memo: 'This is the memo',
    });

    it('returns `true` when the sender username matches (case-insensitive)', () => {
      expect(transactionSearchTextFilter('HeN')(transaction)).toBe(true);
    });

    it('returns `true` when the sender address matches (case-insensitive)', () => {
      expect(transactionSearchTextFilter('ABC')(transaction)).toBe(true);
    });

    it('returns `true` when the memo matches (case-insensitive)', () => {
      expect(transactionSearchTextFilter('tHe MeMo')(transaction)).toBe(true);
    });

    it('returns `false` otherwise', () => {
      expect(transactionSearchTextFilter('invalid')(transaction)).toBe(false);
    });
  });

  describe('`send` transaction', () => {
    const transaction = transactionFactory.build({
      type: 'send',
      recipientUsername: 'henry',
      recipientAddress: 'abc123',
      memo: 'This is the memo',
    });

    it('returns `true` when the recipient username matches (case-insensitive)', () => {
      expect(transactionSearchTextFilter('HeN')(transaction)).toBe(true);
    });

    it('returns `true` when the recipient address matches (case-insensitive)', () => {
      expect(transactionSearchTextFilter('ABC')(transaction)).toBe(true);
    });

    it('returns `true` when the memo matches (case-insensitive)', () => {
      expect(transactionSearchTextFilter('tHe MeMo')(transaction)).toBe(true);
    });

    it('returns `false` otherwise', () => {
      expect(transactionSearchTextFilter('invalid')(transaction)).toBe(false);
    });
  });
});
