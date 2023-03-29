// Test Function
import { formatDate } from '@/utils/movieIdPage';

describe('Movie Id page Tests', () => {
  test.each([
    { inputDate: '02 Jan 1991', expected: 'January 02, 1990' },
    { inputDate: '10 Feb 1950', expected: 'Feburary 10, 1950' },
    { inputDate: '25 Mar 2020', expected: 'March 25, 2020' },
    { inputDate: '11 Apr 1972', expected: 'April 11, 1972' },
    { inputDate: '05 May 1988', expected: 'May 05, 1988' },
    { inputDate: '22 Jun 1999', expected: 'June 22, 1999' },
    { inputDate: '25 Jul 1960', expected: 'July 25, 1960' },
    { inputDate: '01 Aug 2010', expected: 'August 01, 2010' },
    { inputDate: '01 Sep 2022', expected: 'September 01, 2022' },
    { inputDate: '31 Oct 2017', expected: 'October 31, 2017' },
    { inputDate: '06 Nov 1960', expected: 'November 06, 1960' },
    { inputDate: '25 Dec 1990', expected: 'December 25, 1990' },
  ])('formatDate($inputDate) should return $expected', ({ inputDate, expected }) => {
    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toBe(expected);
  });
});
