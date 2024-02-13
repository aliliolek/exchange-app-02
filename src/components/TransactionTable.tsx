import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from '@nextui-org/react';
import { TransactionDetails, TransactionFieldConfig } from '@/types';

interface TransactionTableProps {
    transaction: Partial<TransactionDetails>;
    fieldsConfig: TransactionFieldConfig[];
  }



const TransactionTable: React.FC<TransactionTableProps> = React.memo(({ transaction, fieldsConfig }) => {
  interface PartialTransactionDetails extends Partial<TransactionDetails> {
    [key: string]: any;
  };

  const renderValue = (transaction: PartialTransactionDetails, keyPath: string): string => {
    const keys = keyPath.split('.');
    let value: any = transaction;

    for (let key of keys) {
      value = value[key];
      if (value === undefined) return '';
    }
    return value.toString();
  };

  return (
    <Table hideHeader removeWrapper aria-label="transaction details table">
      <TableHeader>
        <TableColumn>Field</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {fieldsConfig.map(({ key, label }: { key: string, label: string }) => (
          <TableRow key={key}>
              <TableCell className="font-semibold" >
                {label}
              </TableCell>
              <TableCell  className="font-semibold" >
                {renderValue(transaction, key)}
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}, areEqual);

TransactionTable.displayName = 'TransactionTable';

function areEqual(prevProps: { transaction: { [x: string]: any; }; fieldsConfig: string | any[]; }, nextProps: { transaction: { [x: string]: any; }; fieldsConfig: any[]; }) {
  const isTransactionEqual = Object.keys(nextProps.transaction).every(key => 
    nextProps.transaction[key] === prevProps.transaction[key]
  );
  
  const isFieldsConfigEqual = nextProps.fieldsConfig.length === prevProps.fieldsConfig.length &&
    nextProps.fieldsConfig.every((field, index) => 
      field.key === prevProps.fieldsConfig[index].key &&
      field.label === prevProps.fieldsConfig[index].label
    );

  return isTransactionEqual && isFieldsConfigEqual;
}

export default TransactionTable;