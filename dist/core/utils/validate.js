"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, _res, next) => {
    const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
    });
    req.body = parsed.body ?? req.body;
    req.params = parsed.params ?? req.params;
    req.query = parsed.query ?? req.query;
    next();
};
exports.validate = validate;
