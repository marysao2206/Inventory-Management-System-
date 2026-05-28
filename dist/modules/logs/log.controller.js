"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logController = void 0;
const log_service_js_1 = require("./log.service.js");
const parseId = (id) => {
    if (typeof id !== 'string')
        return Number.NaN;
    return Number.parseInt(id, 10);
};
class LogController {
    constructor() {
        this.list = (_req, res) => {
            res.status(200).json(log_service_js_1.logService.list());
        };
        this.getById = (req, res) => {
            const entry = log_service_js_1.logService.getById(parseId(req.params.id));
            if (!entry) {
                res.status(404).json({ message: 'Log entry not found' });
                return;
            }
            res.status(200).json(entry);
        };
        this.create = (req, res) => {
            res.status(201).json(log_service_js_1.logService.create(req.body));
        };
        this.update = (req, res) => {
            const updated = log_service_js_1.logService.update(parseId(req.params.id), req.body);
            if (!updated) {
                res.status(404).json({ message: 'Log entry not found' });
                return;
            }
            res.status(200).json(updated);
        };
        this.remove = (req, res) => {
            const removed = log_service_js_1.logService.remove(parseId(req.params.id));
            if (!removed) {
                res.status(404).json({ message: 'Log entry not found' });
                return;
            }
            res.status(204).send();
        };
    }
}
exports.logController = new LogController();
