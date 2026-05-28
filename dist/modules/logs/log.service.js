"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = void 0;
const log_repository_js_1 = require("./log.repository.js");
class LogService {
    list() {
        return log_repository_js_1.logRepository.list();
    }
    getById(id) {
        return log_repository_js_1.logRepository.findById(id);
    }
    create(payload) {
        return log_repository_js_1.logRepository.create(payload);
    }
    update(id, payload) {
        return log_repository_js_1.logRepository.update(id, payload);
    }
    remove(id) {
        return log_repository_js_1.logRepository.remove(id);
    }
}
exports.logService = new LogService();
