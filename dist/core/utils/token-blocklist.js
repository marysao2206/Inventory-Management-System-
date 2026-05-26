"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlocked = exports.blockToken = void 0;
const blockedTokens = new Map();
const removeExpiredTokens = () => {
    const now = Date.now();
    for (const [token, expiresAt] of blockedTokens.entries()) {
        if (expiresAt <= now)
            blockedTokens.delete(token);
    }
};
const blockToken = (token, expiresAt) => {
    removeExpiredTokens();
    blockedTokens.set(token, expiresAt);
};
exports.blockToken = blockToken;
const isTokenBlocked = (token) => {
    removeExpiredTokens();
    return blockedTokens.has(token);
};
exports.isTokenBlocked = isTokenBlocked;
