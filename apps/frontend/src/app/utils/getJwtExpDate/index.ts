/**
 * Get the expiration time of a JWT token in milliseconds.
 *
 * @param token - The JWT token to check.
 * @returns The expiration time in milliseconds, or 0 if the token is invalid or missing.
 */

const DATE_EXPIRATION_INDEX = 1;
const MULTIPLY_MILLISECONDS_FACTOR = 1000;

export default function (token: string | null) {
  let result = 0;

  if (!token) return result;

  const tokenParts = token.split('.');
  const isTokenValid = tokenParts.length === 3;

  if (!isTokenValid) return result;

  const tokenPayload = JSON.parse(
    atob(token.split('.')[DATE_EXPIRATION_INDEX as number])
  );
  const expirationTime = tokenPayload.exp;
  result = expirationTime * MULTIPLY_MILLISECONDS_FACTOR;

  return result;
}
