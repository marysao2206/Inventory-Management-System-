const blockedTokens = new Map();
const removeExpiredTokens = () => {
    const now = Date.now();
    for (const [token, expiresAt] of blockedTokens.entries()) {
        if (expiresAt <= now)
            blockedTokens.delete(token);
    }
};
export const blockToken = (token, expiresAt) => {
    removeExpiredTokens();
    blockedTokens.set(token, expiresAt);
};
export const isTokenBlocked = (token) => {
    removeExpiredTokens();
    return blockedTokens.has(token);
};
