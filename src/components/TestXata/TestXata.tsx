import { getCurrencies, getMethods } from '@/app/lib/db.server';

export const TestXata = async () => {
  const paymentMethods = await getMethods();
  const currencies = await getCurrencies();

  return (
    <div>
      <h2>Payment Methods</h2>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.id}>{method.type}</li>
        ))}
      </ul>
      <br />
      <ul>
        {currencies.map((currency) => (
          <li key={currency.id}>{currency.code}</li>
        ))}
      </ul>
    </div>
  );
};
