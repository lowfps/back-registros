"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class DocumentosController extends managerdb_1.default {
    getDocumentos(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM documentos';
        return DocumentosController.executeQuery(query, req, res, 'SELECT');
    }
    createDocumentos(req, res) {
        const query = 'INSERT INTO documentos(id_documentos, doc_maestro, documento1, documento2, documento3) VALUES($1, $2, $3, $4, $5)';
        const parameters = [req.body.id_documentos, req.body.doc_maestro, req.body.documento1, req.body.documento2, req.body.documento3];
        return DocumentosController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteDocumentos(req, res) {
        if (!isNaN(Number(req.params.id_documentos))) {
            const query = 'DELETE FROM documentos WHERE id_documentos = $1';
            const parameters = [Number(req.params.id_documentos)];
            return DocumentosController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateDocumentos(req, res) {
        if (!isNaN(Number(req.params.id_documentos))) {
            delete req.body.id_documentos;
            const query = 'UPDATE documentos SET namerol = $2 WHERE codrol = $1';
            const parameters = [Number(req.params.id_documentos), req.body.namerol];
            return DocumentosController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const documentosController = new DocumentosController();
exports.default = documentosController;
