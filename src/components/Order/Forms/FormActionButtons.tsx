import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { Button, Checkbox } from '@nextui-org/react';
import React from 'react';

interface FormActionButtonsProps {
  formId?: string;
}

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  formId = '',
}) => {
  const { isLoadingFrom, setIsLoadingFrom, isLoadingTo, setIsLoadingTo } =
    useFormContext();
  const { transaction, setTransaction } = useTransactionContext();

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-5">
      {transaction.step === 0 && (
        <Checkbox
          isSelected={transaction.termsAndConditions}
          onValueChange={() =>
            setTransaction((prev) => ({
              ...prev,
              termsAndConditions: !prev.termsAndConditions,
            }))
          }
          radius="full"
        >
          <span className="text-xs">I agree to the Terms and Conditions</span>
        </Checkbox>
      )}
      <div className="flex flex-row gap-2">
        <Button
          variant="light"
          onClick={() => {
            setTransaction((prev) => ({
              ...prev,
              step: prev.step - 1,
            }));
          }}
        >
          <ArrowLeftCircleIcon />
        </Button>
        <Button
          color="primary"
          className="w-20 max-w-md"
          type="submit"
          form={formId}
          isDisabled={
            isLoadingFrom ||
            isLoadingTo ||
            transaction.fromAmount === 0 ||
            transaction.toAmount === 0 ||
            !transaction.termsAndConditions
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
