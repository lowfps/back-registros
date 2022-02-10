"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controllers/usercontroller"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usercontroller_1.default.getUsers);
        this.router.post('/crear', usercontroller_1.default.createUser);
        this.router.delete('/:codUser', usercontroller_1.default.deleteUser);
        this.router.put('/update/:codUser', usercontroller_1.default.updateUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
