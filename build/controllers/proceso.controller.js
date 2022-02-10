"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class ProcesoController extends managerdb_1.default {
    getProceso(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM proceso';
        return ProcesoController.executeQuery(query, req, res, 'SELECT');
    }
    createProceso(req, res) {
        const query = 'INSERT INTO proceso(id_proceso, id_estado_proceso, id_recurso, fecha_inicio, fecha_fin, detalle_proceso) VALUES($1, $2, $3, $4, $5, $6)';
        const parameters = [req.body.id_proceso, req.body.id_estado_proceso, req.body.id_recurso, req.body.fecha_inicio, req.body.fecha_fin, req.body.detalle_proceso];
        return ProcesoController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteProceso(req, res) {
        if (!isNaN(Number(req.params.id_proceso))) {
            const query = 'DELETE FROM proceso WHERE id_proceso = $1';
            const parameters = [Number(req.params.id_proceso)];
            return ProcesoController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const funcionUsuarioController = new ProcesoController();
exports.default = funcionUsuarioController;
