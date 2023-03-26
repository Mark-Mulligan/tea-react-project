// Types
import { SelectOption } from '../customTypes/ui';

export const yearSelectOptions = () => {
  const currentYear = 2023;
  const yearOptions: string[] = [];

  for (let i = 1900; i <= currentYear; i++) {
    yearOptions.push(i.toString());
  }

  return yearOptions;
};
