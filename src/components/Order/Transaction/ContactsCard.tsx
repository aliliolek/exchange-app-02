import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import React from 'react';

export const ContactsCard = () => {
  const { transaction, setTransaction } = useTransactionContext();
  const { email, phoneNumber, telegram } = transaction.contacts || {};

  return (
    <Card className="md:py-4 w-full">
      <CardHeader className="pb-0 pt-2 flex-row gap-2 items-center">
        <Chip variant="bordered" color="primary">
          Contacts
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible md:py-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className=" text-sm">
            Email: <span className="font-semibold">{email}</span>
          </p>
          <p className="text-sm">
            Phone: <span className="font-semibold">{phoneNumber}</span>
          </p>
          <p className="text-sm">
            Telegram: <span className="font-semibold">{telegram}</span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
