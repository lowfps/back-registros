"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController extends managerdb_1.default {
    getUsers(req, res) {
        const query = 'SELECT * FROM usuario';
        return UserController.executeQuery(query, req, res, 'SELECT');
    }
    createUser(req, res) {
        //! delete req.body.token;
        const data = bcrypt.hashSync(req.body.clave_usuario, 10);
        const query = 'INSERT INTO usuario(cod_usuario, cod_rol, nombre_usuario, correo_usuario, clave_usuario) VALUES($1, $2, $3, $4, $5)';
        const parameters = [req.body.cod_usuario, req.body.cod_rol, req.body.nombre_usuario, req.body.correo_usuario, data];
        // return UserController.executeQuery(query, parameters, res, 'INSERT');
        return UserController.executeQuery(query, parameters, res, 'INSERT-USER');
    }
    deleteUser(req, res) {
        if (!isNaN(Number(req.params.cod_usuario))) {
            const query = 'DELETE FROM usuario WHERE cod_usuario = $1';
            const parameters = [Number(req.params.cod_usuario)];
            return UserController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateUser(req, res) {
        if (!isNaN(Number(req.params.cod_usuario))) {
            delete req.body.coduser;
            const query = 'UPDATE usuario SET codrol=$2, corre_usuario=$3, clave_usuario=$4 WHERE cod_usuario=$1';
            const parameters = [Number(req.params.cod_usuario), req.body.codrol, req.body.corre_usuario, req.body.clave_usuario];
            return UserController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    login() {
    }
}
const userController = new UserController();
exports.default = userController;
