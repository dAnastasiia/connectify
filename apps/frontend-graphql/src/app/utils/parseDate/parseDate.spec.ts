import { DateTime } from 'luxon';
import parseDate from '.';
import { DEFAULT_DATE_FORMAT } from '../constants';

describe('parseDate', () => {
  it('should convert UTC datetime to local time with the default format', () => {
    const date = '2023-10-07T12:34:56';

    const result = DateTime.fromISO(date, { zone: 'utc' })
      .toLocal()
      .toFormat(DEFAULT_DATE_FORMAT);
    const input = parseDate(date);

    expect(input).toBe(result);
  });

  it('should convert UTC datetime to local time with a custom format', () => {
    const date = '2023-10-07T12:34:56';
    const format = 'yyyy-MM-dd';

    const result = '2023-10-07';
    const input = parseDate(date, format);

    expect(input).toBe(result);
  });

  it('should return an empty string for incorrect date', () => {
    const date = '';
    const result = '';

    expect(parseDate(date)).toBe(result);
  });

  it('should return an empty string for incorrect date', () => {
    const date = 'abc';
    const result = '';

    expect(parseDate(date)).toBe(result);
  });
});
