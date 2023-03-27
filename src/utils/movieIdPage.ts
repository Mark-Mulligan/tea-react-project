interface MonthsHash {
  Jan: 'January';
  Feb: 'Feburary';
  Mar: 'March';
  Apr: 'Apr';
  May: 'May';
  Jun: 'June';
  Jul: 'July';
  Aug: 'August';
  Sep: 'September';
  Oct: 'October';
  Nov: 'November';
  Dec: 'December';
}

const monthConverter = (monthAbreviation: keyof MonthsHash) => {
  const monthsHash: MonthsHash = {
    Jan: 'January',
    Feb: 'Feburary',
    Mar: 'March',
    Apr: 'Apr',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };

  const result = monthsHash[monthAbreviation];

  if (result) {
    return result;
  }

  return monthAbreviation;
};

// example date - 20 Sep 2015
export const formatDate = (inputDate: string) => {
  if (inputDate.length > 0) {
    const [day, month, year] = inputDate.split(' ');
    const convertedMonth = monthConverter(month as keyof MonthsHash);

    return `${convertedMonth} ${day}, ${year}`;
  }
};
