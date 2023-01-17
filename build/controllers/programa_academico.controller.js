"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class ProAcaController extends managerdb_1.default {
    getProAca(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM programa';
        return ProAcaController.executeQuery(query, req, res, 'SELECT');
    }
    createProAca(req, res) {
        const query = 'INSERT INTO programa(cod_programa, nombre_programa, fechacreacion_programa) VALUES($1, $2, $3)';
        const parameters = [req.body.cod_programa, req.body.nombre_programa, req.body.fechacreacion_programa];
        return ProAcaController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteProAca(req, res) {
        if (!isNaN(Number(req.params.cod_programa))) {
            const query = 'DELETE FROM programa_academicos WHERE cod_programa = $1';
            const parameters = [Number(req.params.cod_programa)];
            return ProAcaController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const proAcaController = new ProAcaController();
exports.default = proAcaController;
