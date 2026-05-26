const blockedTokens = new Map<string, number>();

const removeExpiredTokens = () => {
  const now = Date.now();
  for (const [token, expiresAt] of blockedTokens.entries()) {
    if (expiresAt <= now) blockedTokens.delete(token);
  }
};

export const blockToken = (token: string, expiresAt: number) => {
  removeExpiredTokens();
  blockedTokens.set(token, expiresAt);
};

export const isTokenBlocked = (token: string) => {
  removeExpiredTokens();
  return blockedTokens.has(token);
};
