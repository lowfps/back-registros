"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class Programa extends managerdb_1.default {
    getPrograma(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM programa';
        return Programa.executeQuery(query, req, res, 'SELECT');
    }
    createPrograma(req, res) {
        const query = 'INSERT INTO programa(cod_programa, nombre_programa, fechacreacion_programa) VALUES($1, $2, $3)';
        const parameters = [req.body.cod_programa, req.body.nombre_programa, req.body.fechacreacion_programa];
        return Programa.executeQuery(query, parameters, res, 'INSERT');
    }
    deletePrograma(req, res) {
        if (!isNaN(Number(req.params.cod_programa))) {
            const query = 'DELETE FROM programa WHERE cod_programa = $1';
            const parameters = [Number(req.params.cod_programa)];
            return Programa.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const programaController = new Programa();
exports.default = programaController;
