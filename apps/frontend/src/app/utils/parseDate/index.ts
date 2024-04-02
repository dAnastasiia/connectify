import { DateTime } from 'luxon';
import { DEFAULT_DATE_FORMAT } from '../constants';

/**
 * Parses a UTC datetime string and returns the local time in the specified format.
 *
 * @param date - The UTC datetime string to parse.
 * @param format - The format for the local time (optional).
 * @returns The local time in the specified format.
 */

export default (date: string, format?: string) => {
  const localDateTime = DateTime.fromISO(date, { zone: 'utc' });
  return localDateTime.isValid
    ? localDateTime.toLocal().toFormat(format || DEFAULT_DATE_FORMAT)
    : '';
};
