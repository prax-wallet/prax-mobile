import { setStep } from '@/store/depositFlow';
import ActionSheet from '../ActionSheet';
import DepositMethod from './DepositMethod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Address from './Address';

export interface DepositFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositFlow({ isOpen, onClose }: DepositFlowProps) {
  const dispatch = useAppDispatch();
  const step = useAppSelector(state => state.depositFlow.step);

  const handleClose = () => {
    onClose();
    dispatch(setStep('depositMethod'));
  };

  return (
    <ActionSheet isOpen={isOpen} onClose={handleClose}>
      {step === 'depositMethod' && <DepositMethod />}
      {step === 'address' && <Address />}
    </ActionSheet>
  );
}
