import { useTransactionContext } from '@/hooks/useTransactionContext';
import { database } from '@/lib/firebase/firebase-config';
import { NewPaymentMethod } from '@/types/new';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react';

export default function ServiceDetailsCard() {
  const { transaction, setTransaction } = useTransactionContext();

  useEffect(() => {
    const serviceDetailsRef = ref(database, 'serviceDetailsTemp');

    onValue(serviceDetailsRef, (snapshot) => {
      const serviceDetails = snapshot.val();

      const fromCurrency = transaction.fromDetails.currency;
      const fromOption = transaction.fromDetails.option;

      const specificData = serviceDetails.bank[fromCurrency][fromOption];

      if (specificData) {
        const updatedServiceDetails = {
          methodType: transaction.fromDetails.methodType,
          currency: fromCurrency,
          option: fromOption,
          bank: specificData.bankName || '',
          accountNumber: specificData.accountNumber || '',
          fullName: specificData.fullName || '',
          city: specificData.city || '',
          walletAddress: specificData.walletAddress || '',
        };

        setTransaction((prevTransaction) => ({
          ...prevTransaction,
          serviceDetails: updatedServiceDetails,
        }));
      }
    });

    console.log('transaction', transaction);
  }, []);

  const filledValues: Partial<NewPaymentMethod> = {
    bank:
      transaction.serviceDetails?.bank &&
      transaction.serviceDetails?.bank.trim(),
    accountNumber:
      transaction.serviceDetails?.accountNumber &&
      transaction.serviceDetails?.accountNumber.trim(),
    fullName:
      transaction.serviceDetails?.fullName &&
      transaction.serviceDetails?.fullName.trim(),
    walletAddress:
      transaction.serviceDetails?.walletAddress &&
      transaction.serviceDetails?.walletAddress.trim(),
  };

  return (
    <Card className="md:py-4 w-full">
      <CardHeader className="pb-0 pt-2 flex-row gap-2 items-center">
        <Chip variant="bordered" color="warning">
          You should manually transfer here:
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible md:py-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {transaction.serviceDetails &&
            Object.entries(filledValues).map(
              ([key, value]) =>
                value && (
                  <p className="text-sm" key={key}>
                    {key}: <span className="font-semibold">{value}</span>
                  </p>
                )
            )}
        </div>
      </CardBody>
    </Card>
  );
}
