import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class DocumentosController extends ManagerDB {

    public getDocumentos(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM recurso';
        return DocumentosController.executeQuery(query, req, res, 'SELECT');
    }

    public createDocumentos(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO recurso(cod_proceso, nombrepublico_recurso, nombreprivado_recurso, tamanno, tipo_recurso) VALUES($1, $2, $3, $4, $5)';
        const parameters = [req.body.cod_proceso, req.body.nombrepublico_recurso, req.body.nombreprivado_recurso, req.body.tamanno, req.body.tipo_recurso];
        return DocumentosController.executeQuery(query, parameters, res, 'INSERT');
    }

    public deleteDocumentos(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_documentos))) {
            const query: string = 'DELETE FROM documentos WHERE id_documentos = $1';
            const parameters = [Number(req.params.id_documentos)];
            return DocumentosController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public updateDocumentos(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_documentos))) {
            delete req.body.id_documentos;
            const query: string = 'UPDATE documentos SET namerol = $2 WHERE codrol = $1';
            const parameters = [Number(req.params.id_documentos), req.body.namerol];
            return DocumentosController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }
}

const documentosController = new DocumentosController();
export default documentosController;