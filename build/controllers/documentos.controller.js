"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
class DocumentosController extends managerdb_1.default {
    getDocumentos(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM recurso';
        return DocumentosController.executeQuery(query, req, res, 'SELECT');
    }
    createDocumentos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file } = req.files;
                const nameFile = yield uploadFile(req.files);
                console.log(nameFile);
                let typeFile = '';
                switch (nameFile.extension) {
                    case 'docx':
                        typeFile = 1;
                        break;
                    case 'pdf':
                        typeFile = 2;
                        break;
                    case 'xlsx':
                        // Excel
                        typeFile = 3;
                    default:
                        break;
                }
                const query = 'INSERT INTO recurso(cod_proceso, nombrepublico_recurso, nombreprivado_recurso, tamanno, tipo_recurso) VALUES($1, $2, $3, $4, $5)';
                const parameters = [req.body.cod_proceso, req.body.nombrepublico_recurso, nameFile.nameTmp, file.size, typeFile];
                return DocumentosController.executeQuery(query, parameters, res, 'INSERT');
            }
            catch (msg) {
                return res.status(400).json({ msg });
            }
        });
    }
    deleteDocumentos(req, res) {
        if (!isNaN(Number(req.params.id_documentos))) {
            const query = 'DELETE FROM recurso WHERE cod_recurso = $1';
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
const uploadFile = (files, folder = '') => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameCut = file.name.split('.');
        const extension = nameCut[nameCut.length - 1];
        // Check Extension File
        const allowExtension = ['pdf', 'docx', 'xlsx'];
        if (!allowExtension.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, extensiones validas: ${allowExtension}`);
        }
        const nameTmp = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname + '/uploads', folder, nameTmp);
        file.mv(uploadPath, function (err) {
            if (err) {
                return reject(err);
            }
            let data = {
                nameTmp,
                extension,
                uploadPath
            };
            resolve(data);
        });
    });
});
const documentosController = new DocumentosController();
exports.default = documentosController;
