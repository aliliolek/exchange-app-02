import { getXataClient } from '@/xata';

const xata = getXataClient();

export const getMethods = async () => {
  const data = await xata.db.methods.getMany();
  return data;
};

export const getCurrencies = async () => {
  const data = await xata.db.currencies.getMany();

  return data;
};
