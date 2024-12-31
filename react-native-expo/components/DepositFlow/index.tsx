import { DepositFlowStep, setStep } from '@/store/depositFlow';
import ActionSheet from '../ActionSheet';
import DepositMethod from './DepositMethod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Address from './Address';
import Help from './Help';

export interface DepositFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositFlow({ isOpen, onClose }: DepositFlowProps) {
  const dispatch = useAppDispatch();
  const step = useAppSelector(state => state.depositFlow.step);

  const handleClose = () => {
    onClose();
    dispatch(setStep(DepositFlowStep.DepositMethod));
  };

  return (
    <ActionSheet isOpen={isOpen} onClose={handleClose}>
      {step === DepositFlowStep.DepositMethod && <DepositMethod />}
      {step === DepositFlowStep.Address && <Address />}
      {step === DepositFlowStep.Help && <Help />}
    </ActionSheet>
  );
}
