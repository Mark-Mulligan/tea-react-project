import { NextRouter } from 'next/router';

export const createQueryObject = (router: NextRouter, key: string, value: string | number | string[]) => {
  if (router && router.query) {
    return { ...router.query, [key]: value };
  }

  return { key: value };
};
