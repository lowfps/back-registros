import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class ProcesoController extends ManagerDB {

    public getProceso(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM proceso';
        return ProcesoController.executeQuery(query, req, res, 'SELECT');
    }

    public createProceso(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO proceso(id_proceso, id_estado_proceso, id_recurso, fecha_inicio, fecha_fin, detalle_proceso) VALUES($1, $2, $3, $4, $5, $6)';
        const parameters = [req.body.id_proceso, req.body.id_estado_proceso, req.body.id_recurso, req.body.fecha_inicio, req.body.fecha_fin, req.body.detalle_proceso];
        return ProcesoController.executeQuery(query, parameters, res, 'INSERT');
    }

    public deleteProceso(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_proceso))) {
            const query: string = 'DELETE FROM proceso WHERE id_proceso = $1';
            const parameters = [Number(req.params.id_proceso)];
            return ProcesoController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    // public updateFuncionUsuario(req: Request, res: Response): Promise<any> {
    //     if (!isNaN(Number(req.params.codRol))) {
    //         delete req.body.codrol;
    //         const query: string = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
    //         const parameters = [Number(req.params.codRol), req.body.namerol];
    //         return ProcesoController.executeQuery(query, parameters, res, 'UPDATE');
    //     }
    //     return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    // }
}

const funcionUsuarioController = new ProcesoController();
export default funcionUsuarioController;