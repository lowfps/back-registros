"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolcontroller_1 = __importDefault(require("../controllers/rolcontroller"));
class DocumentosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', rolcontroller_1.default.getDocumentos);
        this.router.post('/create', rolcontroller_1.default.createDocumentos);
        this.router.delete('/:codRol', rolcontroller_1.default.deleteDocumentos);
        this.router.put('/update/:codRol', rolcontroller_1.default.updateDocumentos);
    }
}
const rolRoutes = new DocumentosRoutes();
exports.default = rolRoutes.router;
