import getJwtExpDate from '.';
import { tokenMock } from './mocks';

describe('getJwtExpDate', () => {
  it('should get expiration date from JWT', () => {
    const result = 1651831441000;
    const input = getJwtExpDate(tokenMock);

    expect(input).toBe(result);
  });

  it('should return the 0 if incorrect JWT was passed', () => {
    const result = 0;
    const input = getJwtExpDate('abc');

    expect(input).toBe(result);
  });

  it('should return 0 if an empty string was passed instead of JWT', () => {
    const result = 0;
    const input = getJwtExpDate('');

    expect(input).toBe(result);
  });

  it("should return 0 if 'null' was passed instead of JWT", () => {
    const result = 0;
    const input = getJwtExpDate(null);

    expect(input).toBe(result);
  });
});
